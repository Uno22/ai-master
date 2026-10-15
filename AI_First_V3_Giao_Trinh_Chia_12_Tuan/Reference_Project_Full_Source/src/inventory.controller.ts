import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { DomainError, InventoryStore } from './domain/inventory.ts';

function withHttpErrors<T>(fn: () => T): T {
  try { return fn(); }
  catch (error) {
    if (error instanceof DomainError) throw new HttpException({ code: error.code, message: error.message }, error.statusCode);
    throw error;
  }
}

@Controller('inventory')
export class InventoryController {
  private readonly inventory: InventoryStore;
  constructor(inventory: InventoryStore) { this.inventory = inventory; }

  @Get(':id')
  availability(@Param('id') id: string) {
    return withHttpErrors(() => this.inventory.availability(Number(id)));
  }

  @Post('reservations')
  reserve(@Body() body: Record<string, unknown>) {
    return withHttpErrors(() => this.inventory.reserve(
      body.productItemId as number,
      body.quantity as number,
      body.idempotencyKey as string,
    ));
  }
}
