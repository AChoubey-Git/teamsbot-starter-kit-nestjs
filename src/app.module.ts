import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AdaptiveCardModule } from './adaptive-card/adaptive-card.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    AdaptiveCardModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
