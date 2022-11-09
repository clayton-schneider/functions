import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

const errorHandler = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const mailMiddleware = (context) =>
  mailchannelsPlugin({
    personalizations: [
      {
        to: [{ name: "ACME Support", email: "hello@example.com" }],
      },
    ],
    from: { name: "Enquiry", email: "no-reply@example.com" },
    respondWith: () =>
      new Response(null, {
        status: 302,
        headers: { Location: "/thank-you" },
      }),
  });
