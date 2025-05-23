import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  const config = new DocumentBuilder()
  .setTitle('Api Filmes e Series')
  .setDescription('A presente API tem como objetivo simular cadastro', )
  .setVersion('1.0')
  .addTag('Usuario')
  .addTag('Filmes')
  // .addTag('serie')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  useContainer(app.select(AppModule), {fallbackOnErrors: true})
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
