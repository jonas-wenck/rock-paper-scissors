import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const allowedOrigin = configService.get<string>('CORS_ALLOWED_ORIGIN');

  app.enableCors({
    origin: allowedOrigin, // Allow Angular client
    methods: 'POST,OPTIONS', // Allow HTTP methods
    allowedHeaders: 'Content-Type, X-API-KEY', // Permitted request headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
