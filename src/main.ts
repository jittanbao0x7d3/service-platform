import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';

declare const module: any


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"]
  })

  const config = new DocumentBuilder()
    .setTitle("Vườn khoai môn")
    .setDescription("củ khoai môn api")
    .setVersion("1.0")
    .addTag("khoai môn")
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)


  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
