import assert from 'node:assert/strict';
import test from 'node:test';
import { DomainError, InventoryStore } from '../src/domain/inventory.ts';
import { StockTool } from '../src/ai/stock-tool.ts';

test('stock tool validates identity scope', () => {
  const tool = new StockTool(new InventoryStore());
  const caller = { userId: 'user-a', allowedProductIds: [101] };
  assert.equal(tool.execute({ productItemId: 101 }, caller).available, 5);
  assert.throws(() => tool.execute({ productItemId: 102 }, caller), (e: unknown) =>
    e instanceof DomainError && e.code === 'FORBIDDEN');
});

test('stock tool rejects malformed arguments', () => {
  const tool = new StockTool(new InventoryStore());
  assert.throws(() => tool.execute({ productItemId: '101' }, { userId: 'a', allowedProductIds: [101] }), (e: unknown) =>
    e instanceof DomainError && e.code === 'INVALID_ARGS');
});
