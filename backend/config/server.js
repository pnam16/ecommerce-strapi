module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "c28df8d21f2b2ffda41e983edc175289"),
    },
  },
  email: {
    provider: "Strapi",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "phuongnamhn2000@gmail.com",
      defaultReplyTo: "phuongnamhn2000@gmail.com",
      testAddress: "phuongnamhn2000@gmail.com",
    },
  },
});
