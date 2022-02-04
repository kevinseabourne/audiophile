import http from "./httpService";

export async function getIpLocation() {
  const response = http.get(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API_KEY}&fields=currency,country_code2`
  );
  return response;
}
