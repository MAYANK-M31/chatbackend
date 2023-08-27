import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: true, // Set this to your desired origin or leave it as 'true' to allow all
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
