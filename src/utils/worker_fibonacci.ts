import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FibonnaciHandler } from './mathematics/fibonnaci';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const fibonacciService = app.get(FibonnaciHandler);

  fibonacciService.executeFibonaciWorker();
}

run();
