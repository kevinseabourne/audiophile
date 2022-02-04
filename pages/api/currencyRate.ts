import http from "./httpService";

export async function getCurrencyRate(from: string, to: string) {
  const response = http.get(
    `https://apilayer.net/api/live?access_key=${process.env.NEXT_PUBLIC_CURRENCY_LAYER_API_KEY}&currencies=${from}&source=${to}&format=1
     `
  );
  return response;
}
