// Exercise the built Next.js handlers without opening a TCP port.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { GET } = require('../.next/server/app/api/site-stats/route.js').routeModule.userland;
const { GET: configGET } = require('../.next/server/app/api/analytics-config/route.js').routeModule.userland;
const request = days => new Request(`http://localhost/api/site-stats?days=${days}`);

test('invalid periods are rejected before provider access', async () => {
  assert.equal((await GET(request('99999'))).status, 400);
});
test('unconfigured API returns null counts and no tracking endpoint', async () => {
  delete process.env.GOATCOUNTER_API_KEY;
  const data = await (await GET(request(7))).json();
  assert.equal(data.status, 'not-configured');
  assert.equal(data.totalVisits, null);
  assert.deepEqual(await configGET().json(), {endpoint:null});
});
test('today\u2019s two visits and country name survive every queried range', async () => {
  process.env.GOATCOUNTER_SITE = 'test-site';
  process.env.GOATCOUNTER_API_KEY = 'local-test-key-never-live';
  process.env.GOATCOUNTER_START_DATE = new Date().toISOString().slice(0,10);
  process.env.WEBSITE_ANALYTICS_ENABLED = 'true';
  const calls=[];
  globalThis.fetch = async (input, options) => {
    const url = new URL(input); calls.push(url);
    assert.equal(url.origin, 'https://test-site.goatcounter.com');
    assert.equal(options.headers.Authorization, 'Bearer local-test-key-never-live');
    assert.match(url.searchParams.get('end'), /T23:00:00.000Z$/);
    assert.ok(url.searchParams.get('include_paths').split(',').includes('/stats'));
    assert.equal(url.searchParams.get('end').slice(0,10), process.env.GOATCOUNTER_START_DATE);
    if (url.pathname.endsWith('/total')) return Response.json({total:2,total_events:0,stats:[{day:process.env.GOATCOUNTER_START_DATE,daily:2}]});
    if (url.pathname.endsWith('/locations')) return Response.json({stats:[{id:'NL',name:'private-label',count:2}],more:false});
    return Response.json({stats:[{name:'Direct%20/%20unknown',count:2}],more:false});
  };
  const data=await (await GET(request('all'))).json();
  assert.equal(data.status,'ready');
  assert.equal(data.totalVisits,2);
  assert.deepEqual(data.sources,[{label:'Direct / unknown',count:2}]);
  assert.deepEqual(data.countries,[{label:'Netherlands',count:2}]);
  assert.equal(calls.length,3);
  assert.ok(!JSON.stringify(data).includes('private'));
  assert.ok(!JSON.stringify(data).includes('local-test-key'));
  const config=await configGET().json();
  assert.deepEqual(config,{endpoint:'https://test-site.goatcounter.com/count'});
  const recent=await (await GET(request(30))).json();
  assert.equal(recent.status,'ready');
  assert.equal(recent.visits,2);
  assert.equal(recent.totalVisits,2);
  assert.equal(recent.days.length,30);
  assert.equal(recent.days.at(-1).count,2);
  assert.deepEqual(recent.countries,data.countries);
});
test('new provider accounts with null arrays produce verified zeros', async () => {
  globalThis.fetch = async input => Response.json(String(input).includes('/total?') ? {total:0,total_events:0,stats:null} : {stats:null,more:false});
  const data=await (await GET(request(90))).json();
  assert.equal(data.status,'ready');
  assert.equal(data.visits,0);
  assert.equal(data.days.length,90);
});
test('provider errors do not leak credentials or substitute zero', async t => {
  const now=Date.now();
  t.mock.method(Date,'now',()=>now+300_001); // Expire the prior successful cache.
  globalThis.fetch = async () => {throw new Error('private provider detail')};
  const response=await GET(request(90));
  const data=await response.json();
  assert.equal(data.status,'unavailable');
  assert.equal(data.visits,null);
  assert.equal(response.headers.get('cache-control'),'no-store');
  assert.ok(!JSON.stringify(data).includes('private'));
});
