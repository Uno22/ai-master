import assert from 'node:assert/strict';
import test from 'node:test';
import { DomainError, InventoryStore } from '../src/domain/inventory.ts';

test('inventory reservation reduces available stock', () => {
  const store = new InventoryStore([{ id: 101, quantity: 5 }]);
  const result = store.reserve(101, 3, 'request-1');
  assert.equal(result.status, 'reserved');
  assert.equal(store.availability(101).available, 2);
});

test('duplicate same payload is idempotent', () => {
  const store = new InventoryStore([{ id: 101, quantity: 5 }]);
  const first = store.reserve(101, 3, 'request-1');
  const second = store.reserve(101, 3, 'request-1');
  assert.deepEqual(first, second);
  assert.equal(store.availability(101).reservedQuantity, 3);
});

test('key reused with different payload returns conflict', () => {
  const store = new InventoryStore();
  store.reserve(101, 2, 'request-1');
  assert.throws(() => store.reserve(101, 3, 'request-1'), (e: unknown) =>
    e instanceof DomainError && e.statusCode === 409 && e.code === 'IDEMPOTENCY_CONFLICT');
});

test('insufficient stock returns 409 and leaves stock unchanged', () => {
  const store = new InventoryStore([{ id: 101, quantity: 1 }]);
  assert.throws(() => store.reserve(101, 2, 'request-2'), (e: unknown) =>
    e instanceof DomainError && e.statusCode === 409);
  assert.equal(store.availability(101).reservedQuantity, 0);
});

test('release is idempotent and restores available stock', () => {
  const store = new InventoryStore();
  store.reserve(101, 2, 'request-3');
  store.release('request-3');
  store.release('request-3');
  assert.equal(store.availability(101).available, 5);
});

test('invalid quantity returns 400; missing product returns 404', () => {
  const store = new InventoryStore();
  assert.throws(() => store.reserve(101, 0, 'request-4'), (e: unknown) => e instanceof DomainError && e.statusCode === 400);
  assert.throws(() => store.availability(999), (e: unknown) => e instanceof DomainError && e.statusCode === 404);
});
