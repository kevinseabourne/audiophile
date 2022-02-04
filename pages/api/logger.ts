import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

function log(error: Error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
