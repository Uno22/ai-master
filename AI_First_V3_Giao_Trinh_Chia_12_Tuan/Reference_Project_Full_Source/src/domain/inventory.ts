export type Reservation = {
  idempotencyKey: string;
  productItemId: number;
  quantity: number;
  status: 'reserved' | 'released';
};

export class DomainError extends Error {
  readonly statusCode: 400 | 403 | 404 | 409;
  readonly code: string;
  constructor(statusCode: 400 | 403 | 404 | 409, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'DomainError';
  }
}

type Product = { id: number; quantity: number; reservedQuantity: number };

/** Single-process demo only. This is NOT a database concurrency implementation. */
export class InventoryStore {
  private readonly products = new Map<number, Product>();
  private readonly reservations = new Map<string, Reservation>();

  constructor(seed: { id: number; quantity: number }[] = [{ id: 101, quantity: 5 }]) {
    for (const item of seed) {
      if (!Number.isSafeInteger(item.id) || item.id <= 0 ||
          !Number.isSafeInteger(item.quantity) || item.quantity < 0) {
        throw new Error('Invalid seed data');
      }
      if (this.products.has(item.id)) throw new Error('Duplicate product id');
      this.products.set(item.id, { id: item.id, quantity: item.quantity, reservedQuantity: 0 });
    }
  }

  availability(productItemId: number) {
    if (!Number.isSafeInteger(productItemId) || productItemId <= 0) {
      throw new DomainError(400, 'INVALID_PRODUCT_ID', 'productItemId must be a positive integer');
    }
    const product = this.products.get(productItemId);
    if (!product) throw new DomainError(404, 'NOT_FOUND', 'Product item not found');
    return {
      productItemId: product.id,
      quantity: product.quantity,
      reservedQuantity: product.reservedQuantity,
      available: product.quantity - product.reservedQuantity,
    };
  }

  reserve(productItemId: number, quantity: number, idempotencyKey: string): Reservation {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      throw new DomainError(400, 'INVALID_QUANTITY', 'quantity must be a positive integer');
    }
    if (typeof idempotencyKey !== 'string' || idempotencyKey.length < 3 || idempotencyKey.length > 128) {
      throw new DomainError(400, 'INVALID_KEY', 'idempotencyKey length must be 3..128');
    }
    const stock = this.availability(productItemId);
    const previous = this.reservations.get(idempotencyKey);
    if (previous) {
      if (previous.productItemId !== productItemId || previous.quantity !== quantity) {
        throw new DomainError(409, 'IDEMPOTENCY_CONFLICT', 'Idempotency key reused with different payload');
      }
      return { ...previous };
    }
    if (stock.available < quantity) {
      throw new DomainError(409, 'INSUFFICIENT_STOCK', 'Insufficient available stock');
    }
    const product = this.products.get(productItemId)!;
    product.reservedQuantity += quantity;
    const reservation: Reservation = { idempotencyKey, productItemId, quantity, status: 'reserved' };
    this.reservations.set(idempotencyKey, reservation);
    return { ...reservation };
  }

  release(idempotencyKey: string): Reservation {
    const reservation = this.reservations.get(idempotencyKey);
    if (!reservation) throw new DomainError(404, 'RESERVATION_NOT_FOUND', 'Reservation not found');
    if (reservation.status === 'released') return { ...reservation };
    const product = this.products.get(reservation.productItemId)!;
    product.reservedQuantity -= reservation.quantity;
    reservation.status = 'released';
    return { ...reservation };
  }
}
