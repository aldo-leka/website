import test from 'node:test';
import assert from 'node:assert/strict';
import { chartPoints, count, dailyCounts, dateRange, emptyStats, publicSource, ranked } from '../lib/site-stats.ts';

test('UTC windows and all-time include the right days across a leap year', () => {
  const now = new Date('2024-03-02T01:00:00+02:00');
  assert.deepEqual(dateRange(7, now), { start: '2024-02-24', end: '2024-03-02' });
  assert.deepEqual(dateRange('all', now, '2024-02-01'), { start: '2024-02-01', end: '2024-03-02' });
});
test('fixed windows include today and retain their exact length across month and year boundaries', () => {
  const cases = [
    { now: '2024-03-01T23:59:59Z', today: '2024-03-01', end: '2024-03-02', starts: ['2024-02-24', '2024-02-01', '2023-12-03'] },
    { now: '2024-12-31T23:30:00-02:00', today: '2025-01-01', end: '2025-01-02', starts: ['2024-12-26', '2024-12-03', '2024-10-04'] },
  ];
  for (const { now, today, end, starts } of cases) {
    for (const [index, period] of [7, 30, 90].entries()) {
      const range = dateRange(period, new Date(now));
      assert.deepEqual(range, { start: starts[index], end });
      const days = dailyCounts([], range.start, range.end);
      assert.equal(days.length, period);
      assert.equal(days.at(-1).date, today);
    }
  }
});
test('visits recorded on the first tracking day appear in every period', () => {
  const now = new Date('2026-10-02T12:00:00Z');
  const raw = [{ day: '2026-10-02', daily: 2 }, { day: '2026-10-03', daily: 99 }];
  for (const period of [7, 30, 90, 'all']) {
    const range = dateRange(period, now, '2026-10-02');
    const days = dailyCounts(raw, range.start, range.end);
    assert.equal(days.at(-1).date, '2026-10-02');
    assert.equal(days.at(-1).count, 2);
    assert.equal(days.reduce((sum, day) => sum + day.count, 0), 2);
  }
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
test('encoded provider referrers retain known labels without exposing private URLs', () => {
  assert.equal(publicSource('Direct%20/%20unknown'), 'Direct / unknown');
  assert.equal(publicSource('https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dprivate'), 'Google');
  for (const raw of ['https%3A%2F%2Fprivate.example%2Finvite%3Fsecret%3Dabc', 'https%3A%2F%2Fgoogle.com%40attacker.test%2F', '%E0%A4%A']) {
    assert.equal(publicSource(raw), 'Other sources');
  }
});
test('countries are named even with one or two visits and only unknown codes are grouped', () => {
  const result = ranked([{ id: 'NL', name: 'private text', count: 2 }, { id: 'AL', count: 1 }, { id: 'XX', name: 'fake place', count: 2 }, { id: 'ZZ', count: 1 }], 'countries');
  assert.deepEqual(result.rows, [{ label: 'Unknown country', count: 3 }, { label: 'Netherlands', count: 2 }, { label: 'Albania', count: 1 }]);
  assert.equal(result.countryCount, 2);
});
test('all named countries remain ranked without a top-five cutoff', () => {
  const many = ranked(['NL','US','GB','DE','FR','AL','IT'].map((id, i) => ({ id, count: 10 + i })), 'countries');
  assert.deepEqual(many.rows, [
    { label: 'Italy', count: 16 }, { label: 'Albania', count: 15 },
    { label: 'France', count: 14 }, { label: 'Germany', count: 13 },
    { label: 'United Kingdom', count: 12 }, { label: 'United States', count: 11 },
    { label: 'Netherlands', count: 10 },
  ]);
  assert.equal(many.countryCount, 7);
  assert.equal(many.rows.reduce((n, r) => n + r.count, 0), 91);
});
test('source groups merge and raw labels are removed', () => {
  assert.deepEqual(ranked([{ name: 'Google', count: 3 }, { name: 'https://google.com/private', count: 3 }, { name: 'secret-link', count: 1 }], 'sources').rows,
    [{ label: 'Google', count: 6 }, { label: 'Other sources', count: 1 }]);
});
test('known sources with fewer than five visits retain their names', () => {
  assert.deepEqual(ranked([{ name: 'Google', count: 3 }, { name: 'Bing', count: 1 }, { name: 'secret-link', count: 1 }], 'sources').rows,
    [{ label: 'Google', count: 3 }, { label: 'Bing', count: 1 }, { label: 'Other sources', count: 1 }]);
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
