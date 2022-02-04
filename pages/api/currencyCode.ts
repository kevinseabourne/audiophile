import http from "./httpService";

export async function getCurrencyCode(ip: string) {
  const response = http.get(`http://ip-api.com/json/${ip}?fields=currency`);
  return response;
}
