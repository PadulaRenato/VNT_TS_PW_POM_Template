import { APIRequestContext, APIResponse } from "@playwright/test";

export class SwapiClient {
  private readonly baseUrl: string = "https://swapi.dev/api";

  constructor(private request: APIRequestContext) {}

  async getPeople(id: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/people/${id}/`);
  }

  async getPlanet(id: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/planets/${id}/`);
  }

  async getStarship(id: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/starships/${id}/`);
  }
}
