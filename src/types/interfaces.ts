export interface ResponseError {
  message: string
  statusCode: number
}
export interface ResponseLogin {
  data: Data
}

export interface Data {
  payload: Payload
  user: User
}

export interface Payload {
  refresh_token: string
  token: string
  type: string
}

export interface User {
  email: string
  firstName: string
  lastName: string
}

export interface ResponseJWTError {
  error: string
  message: string
  statusCode: number
}

export interface ResponseUserMe {
  data: Data
}

export interface UseInfo {
  createdAt: Date
  email: string
  firstName: string
  id: number
  lastName: string
  password: null
  username: string
}

export interface ResponseMovies {
  imageBaseUrl: string
  data: Movie[]
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: OriginalLanguage
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export enum OriginalLanguage {
  En = 'en',
  Ja = 'ja',
  No = 'no',
  Tl = 'tl'
}

export interface ResponseActors {
  imageBaseUrl: string
  data: Actor[]
}

export interface Actor {
  adult: boolean
  gender: number
  id: number
  known_for_department: KnownForDepartment
  name: string
  original_name: string
  popularity: number
  profile_path: null | string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export enum KnownForDepartment {
  Acting = 'Acting',
  Crew = 'Crew'
}
