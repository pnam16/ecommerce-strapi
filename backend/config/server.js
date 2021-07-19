module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'c28df8d21f2b2ffda41e983edc175254'),
    },
  },
  email: {
    provider: 'Strapi',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'juliasedefdjian@strapi.io',
      defaultReplyTo: 'juliasedefdjian@strapi.io',
      testAddress: 'juliasedefdjian@strapi.io',
    },
  },
});
