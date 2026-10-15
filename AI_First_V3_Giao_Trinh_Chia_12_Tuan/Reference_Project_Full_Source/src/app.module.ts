import { Module } from '@nestjs/common';
import { InventoryStore } from './domain/inventory.ts';
import { AiGateway, MockAiAdapter } from './ai/gateway.ts';
import { StockTool } from './ai/stock-tool.ts';
import { InventoryController } from './inventory.controller.ts';
import { AiController } from './ai.controller.ts';

@Module({
  controllers: [InventoryController, AiController],
  providers: [
    { provide: InventoryStore, useFactory: () => new InventoryStore([{ id: 101, quantity: 5 }]) },
    { provide: AiGateway, useFactory: () => new AiGateway([
      new MockAiAdapter('openai'), new MockAiAdapter('anthropic'), new MockAiAdapter('gemini'),
    ]) },
    { provide: StockTool, inject: [InventoryStore], useFactory: (inventory: InventoryStore) => new StockTool(inventory) },
  ],
})
export class AppModule {}
