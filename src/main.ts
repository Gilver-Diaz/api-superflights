import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { AllExceptionFilrer } from './common/filter/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.intercepto';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // esto es un filter para forma global :
  app.useGlobalFilters(new AllExceptionFilrer());
  // esto seria para interceptar petiones que estan fuera del tiempo de 2 min
  app.useGlobalInterceptors(new TimeOutInterceptor());
  // esta es para validar los datos:
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
