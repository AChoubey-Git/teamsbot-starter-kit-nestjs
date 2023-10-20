import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
  AdaptiveCardInvokeValue,
  AdaptiveCardInvokeResponse,
} from 'botbuilder';
import rawWelcomeCard from './welcome.json';
import rawLearnCard from './learn.json';
import { AdaptiveCards } from '@microsoft/adaptivecards-tools';
import { Injectable } from '@nestjs/common';

export interface DataInterface {
  likeCount: number;
}
@Injectable()
export class AdaptiveCardService extends TeamsActivityHandler {
  likeCountObj: { likeCount: number };
  constructor() {
    super();
    this.likeCountObj = { likeCount: 0 };
    this.onMessage(async (context, next) => {
      console.log('Running with Message Activity.');

      let txt = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(
        context.activity,
      );
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, '').trim();
      }

      // Trigger command by IM text
      switch (txt) {
        case 'welcome': {
          const card =
            AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card)],
          });
          break;
        }
        case 'learn': {
          this.likeCountObj.likeCount = 0;
          const card = AdaptiveCards.declare<DataInterface>(
            rawLearnCard,
          ).render(this.likeCountObj);
          await context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card)],
          });
          break;
        }
        /**
         * case "yourCommand": {
         *   await context.sendActivity(`Add your response here!`);
         *   break;
         * }
         */
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card =
            AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card)],
          });
          break;
        }
      }
      await next();
    });
  }
}
