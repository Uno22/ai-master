import { DomainError, InventoryStore } from '../domain/inventory.ts';

export type Caller = { userId: string; allowedProductIds: readonly number[] };

/** Toy tool executor to demonstrate server-side validation and authorization. */
export class StockTool {
  private readonly inventory: InventoryStore;
  constructor(inventory: InventoryStore) { this.inventory = inventory; }

  execute(args: unknown, caller: Caller) {
    if (!args || typeof args !== 'object' || Array.isArray(args)) {
      throw new DomainError(400, 'INVALID_ARGS', 'Tool arguments must be an object');
    }
    const productItemId = (args as Record<string, unknown>).productItemId;
    if (!Number.isSafeInteger(productItemId) || Number(productItemId) <= 0) {
      throw new DomainError(400, 'INVALID_ARGS', 'productItemId must be a positive integer');
    }
    if (!caller.allowedProductIds.includes(productItemId as number)) {
      throw new DomainError(403, 'FORBIDDEN', 'Product not accessible');
    }
    return this.inventory.availability(productItemId as number);
  }
}
