/// <reference types="node" />

type GlobalWithEnv = typeof globalThis & {
  process?: { env: Record<string, string | undefined> };
};

const env = (globalThis as GlobalWithEnv).process?.env ?? {};

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5000",
  "http://localhost:5173",
  "http://localhost:3000"
];

const parseListEnv = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
};

export const appConfig = {
  allowedOrigins: (() => {
    const fromEnv = parseListEnv(env.ALLOWED_ORIGINS);
    return fromEnv.length > 0 ? fromEnv : DEFAULT_ALLOWED_ORIGINS;
  })(),
  defaultRegion: env.FUNCTION_REGION ?? "us-central1",
  ordersCollection: env.ORDERS_COLLECTION ?? "orders",
  payments: {
    currency: env.CHAPA_CURRENCY ?? "ETB",
    chapa: {
      baseUrl: env.CHAPA_BASE_URL ?? "https://api.chapa.co",
      secretKey: env.CHAPA_SECRET_KEY ?? "",
      callbackUrl: env.CHAPA_CALLBACK_URL,
      returnUrl: env.CHAPA_RETURN_URL
    }
  }
};
