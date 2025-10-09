const BASE_URL = "https://dragonball-api.com/api";

export default async function getCharacters(
  page: number = 1,
  limit: number = 10
): Promise<Response> {
  const endpointUrl = `/characters?page=${page}&limit=${limit}`;
  return fetch(BASE_URL + endpointUrl);
}
