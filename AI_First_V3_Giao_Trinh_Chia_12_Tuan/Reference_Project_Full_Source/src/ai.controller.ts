import { BadRequestException, Body, Controller, HttpException, Post } from '@nestjs/common';
import { AiGateway, ProviderName } from './ai/gateway.ts';
import { StockTool } from './ai/stock-tool.ts';
import { DomainError } from './domain/inventory.ts';

@Controller('ai')
export class AiController {
  constructor(
    private readonly gateway: AiGateway,
    private readonly stockTool: StockTool,
  ) {}

  @Post('generate')
  async generate(@Body() body: Record<string, unknown>) {
    if (typeof body.prompt !== 'string') throw new BadRequestException('prompt must be string');
    try {
      return await this.gateway.generate(body.provider as ProviderName, body.prompt);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Post('tools/stock')
  tool(@Body() body: Record<string, unknown>) {
    try {
      // Fixed demo caller: not real authentication or authorization.
      const caller = { userId: 'demo', allowedProductIds: [101] };
      return this.stockTool.execute({ productItemId: body.productItemId }, caller);
    } catch (error) {
      if (error instanceof DomainError) throw new HttpException({ code: error.code }, error.statusCode);
      throw error;
    }
  }
}
