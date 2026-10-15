// Exercise the built Next.js handlers without opening a TCP port or a database.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { Pool } = require('pg');
// The routes import pg asynchronously, so the built modules resolve after loading.
const { GET } = (await require('../.next/server/app/api/site-stats/route.js')).routeModule.userland;
const { POST } = (await require('../.next/server/app/api/collect/route.js')).routeModule.userland;
const request = days => new Request(`http://localhost/api/site-stats?days=${days}`);
const websiteId = '00000000-0000-4000-8000-000000000001';
const today = new Date().toISOString().slice(0,10);
const collect = (body, headers = {}) => new Request('https://aldoleka.com/api/collect', { method: 'POST',
  headers: { 'content-type': 'application/json', 'sec-fetch-site': 'same-origin', origin: 'https://aldoleka.com',
    'user-agent': 'Mozilla/5.0 test', 'cf-connecting-ip': '203.0.113.7', 'cf-ipcountry': 'NL', ...headers },
  body: JSON.stringify(body) });

test('invalid periods are rejected before database access', async () => {
  assert.equal((await GET(request('99999'))).status, 400);
});
test('unconfigured analytics return null counts and forward nothing', async () => {
  delete process.env.UMAMI_STATS_DATABASE_URL;
  const data = await (await GET(request(7))).json();
  assert.equal(data.status, 'not-configured');
  assert.equal(data.totalVisits, null);
  globalThis.fetch = async () => { throw new Error('must not forward'); };
  assert.equal((await POST(collect({ path: '/' }))).status, 204);
});
test('today’s two visits, country and source survive every queried range', async () => {
  process.env.UMAMI_URL = 'http://umami:3000';
  process.env.UMAMI_WEBSITE_ID = websiteId;
  process.env.UMAMI_STATS_DATABASE_URL = 'postgresql://reader:local-test-password-never-live@localhost:1/umami';
  process.env.WEBSITE_ANALYTICS_START_DATE = today;
  process.env.WEBSITE_ANALYTICS_ENABLED = 'true';
  const calls = [];
  Pool.prototype.query = async function (text, values) {
    const name = /site-stats:(\w+)/.exec(text)[1]; calls.push(name);
    assert.equal(values[0], websiteId);
    assert.match(values[1], /^\d{4}-\d{2}-\d{2}T00:00:00Z$/);
    assert.match(text, /event_type = 1/);
    if (name === 'total') return { rows: [{ visits: 2 }] };
    if (name === 'daily') return { rows: [{ day: today, daily: 2 }] };
    if (name === 'countries') return { rows: [{ id: 'NL', count: 2 }] };
    return { rows: [{ name: null, count: 1 }, { name: 'google.com', count: 1 }] };
  };
  const data = await (await GET(request('all'))).json();
  assert.equal(data.status, 'ready');
  assert.equal(data.totalVisits, 2);
  assert.deepEqual(data.sources, [{ label: 'Direct', count: 1 }, { label: 'Google', count: 1 }]);
  assert.deepEqual(data.countries, [{ label: 'Netherlands', count: 2 }]);
  assert.deepEqual(calls.sort(), ['countries', 'daily', 'sources', 'total']);
  assert.ok(!JSON.stringify(data).includes('local-test-password'));
  const recent = await (await GET(request(30))).json();
  assert.equal(recent.status, 'ready');
  assert.equal(recent.visits, 2);
  assert.equal(recent.totalVisits, 2);
  assert.equal(recent.start, today); // Untracked days before the start are not shown as zeros.
  assert.equal(recent.days.length, 1);
  assert.equal(recent.days.at(-1).count, 2);
  assert.deepEqual(recent.countries, data.countries);
});
test('a new website with no rows produces verified zeros', async () => {
  Pool.prototype.query = async text => ({ rows: text.includes('site-stats:total') ? [{ visits: 0 }] : [] });
  const data = await (await GET(request(90))).json();
  assert.equal(data.status, 'ready');
  assert.equal(data.visits, 0);
  assert.equal(data.days.length, 1);
  assert.deepEqual(data.days, [{ date: today, count: 0 }]);
});
test('database errors do not leak details or substitute zero', async t => {
  const now = Date.now();
  t.mock.method(Date, 'now', () => now + 300_001); // Expire the prior successful cache.
  Pool.prototype.query = async () => { throw new Error('private database detail'); };
  const response = await GET(request(90));
  const data = await response.json();
  assert.equal(data.status, 'unavailable');
  assert.equal(data.visits, null);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.ok(!JSON.stringify(data).includes('private'));
});
test('collect forwards a sanitized public page view to Umami', async () => {
  const sent = [];
  globalThis.fetch = async (url, options) => { sent.push({ url: String(url), options }); return new Response('{}'); };
  const response = await POST(collect({ path: '/jobalbum', source: 'Google', screen: '390x844', language: 'nl-NL',
    referrer: 'https://private.example/secret?q=1', extra: 'ignored' }));
  assert.equal(response.status, 204);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, 'http://umami:3000/api/send');
  assert.equal(sent[0].options.headers['cf-connecting-ip'], '203.0.113.7');
  assert.equal(sent[0].options.headers['cf-ipcountry'], 'NL');
  assert.equal(sent[0].options.headers['User-Agent'], 'Mozilla/5.0 test');
  const { type, payload } = JSON.parse(sent[0].options.body);
  assert.equal(type, 'event');
  assert.deepEqual(payload, { website: websiteId, hostname: 'aldoleka.com', url: '/jobalbum',
    title: 'JobAlbum: Timestamp Camera', screen: '390x844', language: 'nl-NL', referrer: 'https://google.com/' });
  assert.ok(!sent[0].options.body.includes('private.example'));
});
test('collect drops privacy signals, other sites and unknown paths', async () => {
  const sent = [];
  globalThis.fetch = async () => { sent.push(1); return new Response('{}'); };
  assert.equal((await POST(collect({ path: '/' }, { 'sec-gpc': '1' }))).status, 204);
  assert.equal((await POST(collect({ path: '/' }, { dnt: '1' }))).status, 204);
  assert.equal((await POST(collect({ path: '/' }, { 'sec-fetch-site': 'cross-site' }))).status, 204);
  assert.equal((await POST(collect({ path: '/' }, { origin: 'https://evil.example' }))).status, 204);
  assert.equal((await POST(collect({ path: '/admin?token=1' }))).status, 400);
  assert.equal((await POST(collect({ path: '/', screen: '<script>', language: 'x'.repeat(80), source: 'Somewhere' }))).status, 204);
  assert.equal(sent.length, 1);
  process.env.WEBSITE_ANALYTICS_ENABLED = 'false';
  assert.equal((await POST(collect({ path: '/' }))).status, 204);
  assert.equal(sent.length, 1);
});
