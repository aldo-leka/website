import test from 'node:test';
import assert from 'node:assert/strict';
import { chartPoints, count, dailyCounts, dateRange, emptyStats, publicSource, ranked } from '../lib/site-stats.ts';

test('UTC windows and all-time include the right days across a leap year', () => {
  const now = new Date('2024-03-02T01:00:00+02:00');
  assert.deepEqual(dateRange(7, now), { start: '2024-02-23', end: '2024-03-01' });
  assert.deepEqual(dateRange('all', now, '2024-02-01'), { start: '2024-02-01', end: '2024-03-02' });
});
test('unconfigured and failed counts are unknown, not zero', () => {
  for (const status of ['not-configured', 'unavailable']) {
    const stats = emptyStats('all', status);
    assert.equal(stats.visits, null);
    assert.equal(stats.totalVisits, null);
    assert.deepEqual(stats.days, []);
  }
});
test('referrer normalization never exposes URLs, queries or arbitrary input', () => {
  assert.equal(publicSource('https://www.google.com/search?q=private'), 'Google');
  assert.equal(publicSource('https://m.linkedin.com/in/private-person'), 'LinkedIn');
  for (const raw of ['https://google.com.attacker.test/private', 'https://google.com@attacker.test/', 'https://private.example/invite?secret=abc', '<script>alert(1)</script>']) {
    assert.equal(publicSource(raw), 'Other sources');
  }
  assert.equal(publicSource(''), 'Direct / unknown');
  assert.equal(publicSource('Direct / unknown'), 'Direct / unknown');
});
test('small countries are grouped and totals survive top-five ranking', () => {
  const result = ranked([{ id: 'NL', name: 'private text', count: 8 }, { id: 'US', count: 6 }, { id: 'AL', count: 1 }, { id: 'XX', name: 'fake place', count: 2 }], 'countries');
  assert.deepEqual(result.rows, [{ label: 'Netherlands', count: 8 }, { label: 'United States', count: 6 }, { label: 'Other / unknown', count: 3 }]);
  assert.equal(result.countryCount, 3);
  const many = ranked(['NL','US','GB','DE','FR','AL','IT'].map((id, i) => ({ id, count: 10 + i })), 'countries');
  assert.equal(many.rows.length, 6);
  assert.equal(many.rows.reduce((n, r) => n + r.count, 0), 91);
  assert.ok(many.rows.every((r, i, rows) => !i || rows[i-1].count >= r.count));
});
test('source groups merge before threshold and raw labels are removed', () => {
  assert.deepEqual(ranked([{ name: 'Google', count: 3 }, { name: 'https://google.com/private', count: 3 }, { name: 'secret-link', count: 1 }], 'sources').rows,
    [{ label: 'Google', count: 6 }, { label: 'Other sources', count: 1 }]);
});
test('daily series fills missing days and excludes the next UTC day', () => {
  const days = dailyCounts([{ day: '2024-02-28', daily: 2 }, { day: '2024-03-01', daily: 50 }], '2024-02-28', '2024-03-01');
  assert.deepEqual(days, [{ date: '2024-02-28', count: 2 }, { date: '2024-02-29', count: 0 }]);
  assert.throws(() => dailyCounts(null, '2024-01-01', '2024-01-02'));
  for (const invalid of [-1, NaN, Infinity, 1.5, '1', null]) assert.throws(() => count(invalid));
});
test('long all-time charts group by month without losing visits', () => {
  const days = dailyCounts([], '2024-01-01', '2024-08-01').map((day, i) => ({ ...day, count: i % 5 }));
  const points = chartPoints(days);
  assert.equal(points.length, 7);
  assert.equal(points[0].date, '2024-01-01');
  assert.equal(points.reduce((n, p) => n + p.count, 0), days.reduce((n, p) => n + p.count, 0));
});
