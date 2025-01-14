import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common"
import { MoviesService } from "./movies.service"
import { Movie } from "../models/movie.schema"
import { HttpService } from "@nestjs/axios"
import { PeopleService } from "../people/people.service"
import { People } from "../models/people.schema"

type Collection = "movies" | "people"
type Route =
  | "HOME_PAGE"
  | "PROFILE_PAGE"
  | "SEARCH_PAGE"
  | "CAST_PAGE"
  | "MOVIE_PAGE"
  | "GENRE_PAGE"
  | "NONE"

@Controller("movies")
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly peopleService: PeopleService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<Movie[]> {
    return this.moviesService.findAll(page, limit)
  }

  @Get("search")
  async search(
    @Query("query") query: string,
    @Query("type") type: string, // llm or normal search
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<{
    collection: Collection
    movies?: Movie[]
    navigateTo: Route
    people?: People[]
  }> {
    // const navigateTo = await this.navigateTo(query)
    const collection = await this.getCollection(query)
    const navigateTo = "HOME_PAGE"

    if (type === "llm") {
      const moviesOrPeoples = await this.findWithLlm(query, collection, limit)

      return {
        collection,
        navigateTo,
        people:
          collection === "people"
            ? await this.peopleService.findMany(moviesOrPeoples, page, limit)
            : [],
        movies:
          collection === "movies"
            ? await this.moviesService.findMany(moviesOrPeoples, page, limit)
            : []
      }
    }

    return {
      collection,
      navigateTo,
      movies:
        collection === "people"
          ? await this.moviesService.search(query, page, limit)
          : [],
      people:
        collection === "movies"
          ? await this.peopleService.search(query, page, limit)
          : []
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.findOne(id)
  }

  @Post("find-many")
  async findMany(@Body() body: { path: string[] }) {
    return this.moviesService.findManyWithCustomInput(body.path)
  }

  async getCollection(prompt: string) {
    const response = await this.httpService.axiosRef.post(
      "http://127.0.0.1:8000/prompt",
      {
        prompt
      }
    )

    return response.data.collection as Collection
  }

  async navigateTo(prompt: string) {
    try {
      const response = await this.httpService.axiosRef.post(
        "https://awd-llm.azurewebsites.net/navigate/",
        {},
        {
          params: {
            query: prompt,
            llm_api_key: process.env.LLM_API_KEY
          }
        }
      )

      return response.data.data.route as Route
    } catch (e: any) {
      console.log("NAVIGATE TO ERROR", e)
    }
  }

  async findWithLlm(query: string, collection: string, limit: number) {
    const response = await this.httpService.axiosRef.get(
      "https://awd-llm.azurewebsites.net/retriever",
      {
        params: {
          query,
          collection_name: collection,
          amount: limit,
          llm_api_key: process.env.LLM_API_KEY
        }
      }
    )

    return response.data.data.result ?? []
  }
}
