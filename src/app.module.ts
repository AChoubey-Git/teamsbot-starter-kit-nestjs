import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AdaptiveCardModule } from './adaptive-card/adaptive-card.module';
import configuration from './configuration';
import { LoggerModule } from 'nestjs-rollbar';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        accessToken: configService.get('rollbar.token'),
        environment: configService.get('rollbar.environment'),
        captureUncaught: true,
        captureUnhandledRejections: true,
        ignoreDuplicateErrors: false,
      }),
      inject: [ConfigService],
    }),
    AdaptiveCardModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
