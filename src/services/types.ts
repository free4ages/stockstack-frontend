import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ObjectId = string;

type APIPromise<T> = Promise<AxiosResponse<T>>;
export type TGetResource<Output> = (
  id: string,
  params?: { populate: boolean }
) => APIPromise<Output>;
export type TCreateResource<Input, Output> = (
  resource: Input,
  config?: AxiosRequestConfig
) => APIPromise<Output>;
export type TDeleteResource = (id: string) => APIPromise<any>;
export type TListResource<Input, Output> = (
  params: Input
) => APIPromise<Output>;
export type TUpdateResource<Resource> = (
  resource: Resource
) => APIPromise<Resource>;

export interface IListParams {
  page?: number;
  sortBy?: string;
  limit?: number;
  populate?: boolean;
  q?: string;
  all?: boolean;
  paginate?: boolean;
}

export interface IListResponse<T> {
  results: T[];
  page?: number;
  limit?: number;
  totalPages?: number;
  totalResults?: number
}

export interface IDocument {
  id: ObjectId;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface PopulatedDocument {
  _id: string;
  name: string;
}

export interface PopulatedUserDocument {
  name: string;
  email: string;
}

export interface MetaTags {
  content: string;
  name?: string;
  property?: string;
}
export interface PageSeo {
  titleTag?: string;
  metaDescription?: string;
  metaTags?: MetaTags[];
}

export interface ArrayBody {
  title?: string;
  content?: string;
}
export interface PageTemplate {
  seoData?: PageSeo;
  body?: string | ArrayBody[];
  title?: string;
}

