export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.APP_ENV || 'development',
  api: {
    url: process.env.API_URL || 'http://localhost:3000',
  },
  msteams: {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
    microsoftAppTenantId: process.env.MICROSOFT_APP_TENANTID
  },
});
