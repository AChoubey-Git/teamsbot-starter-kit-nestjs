import { Controller, Post, Res, Req } from '@nestjs/common';
import { AdaptiveCardService } from './adaptive-card.service';
import {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  createBotFrameworkAuthenticationFromConfiguration,
} from 'botbuilder';
import { Request, Response } from 'botbuilder';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AdaptiveCardController {
  botAdapter: CloudAdapter;
  constructor(
    private readonly adaptiveCardService: AdaptiveCardService,
    private _configService: ConfigService,
  ) {
    const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
      MicrosoftAppId: this._configService.get('msteams.appId'),
      MicrosoftAppPassword: this._configService.get('msteams.appPassword'),
      MicrosoftAppTenantId: this._configService.get('msteams.microsoftAppTenantId')
    });
    const botFrameworkAuthentication =
      createBotFrameworkAuthenticationFromConfiguration(
        null,
        credentialsFactory,
      );
    this.botAdapter = new CloudAdapter(botFrameworkAuthentication)
    this.botAdapter.onTurnError = async (context, error) => {
      console.error(error);
      console.error(`\n [onTurnError] unhandled error: ${error}`);

      // Send a trace activity, which will be displayed in Bot Framework Emulator
      await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError',
      );
    };
  }

  @Post('api/messages')
  async messages(@Req() req: Request, @Res() res: Response) {
    await this.botAdapter.process(req, res, async (context) => {
       this.adaptiveCardService.run(context);
    });
  }
}
