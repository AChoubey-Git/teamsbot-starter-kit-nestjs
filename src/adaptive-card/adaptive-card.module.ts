import { Module } from '@nestjs/common';
import { AdaptiveCardService } from './adaptive-card.service';
import { AdaptiveCardController } from './adaptive-card.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
  ],
  controllers: [AdaptiveCardController],
  providers: [AdaptiveCardService]
})
export class AdaptiveCardModule {}
