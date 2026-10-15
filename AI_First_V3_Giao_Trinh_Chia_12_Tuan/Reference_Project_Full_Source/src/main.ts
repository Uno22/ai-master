import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Bind locally only: this sample intentionally has no real authentication.
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '127.0.0.1');
  console.log(`Local demo listening at http://127.0.0.1:${port}`);
}
bootstrap().catch((error) => {
  console.error('Startup failure:', error instanceof Error ? error.message : 'unknown error');
  process.exitCode = 1;
});
