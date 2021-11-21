import {IDocument,IListParams,IListResponse} from './types';
import { client } from './client';


export interface IMarkParams{
  articleId: string;
  value: boolean;
};

export interface IArticleDocument extends IDocument{
  title: string;
  displayTitle ?: string;
  shortText?: string;
  fullText?: string;
  pubDate?: Date;
  retrieveDate: Date;
  tags ?: string[];
  link ?: string;
  attachmentLink ?: string;
  sourceDomain : string;
};

export type IArticleListResponse = IListResponse<IArticleDocument>;

export interface IArticleListParams extends IListParams{
 tagNames ?: string | string[];
}

const list = (params:IArticleListParams)=>{
  return client.get<IArticleListResponse>('/articles',{params});
};

const markRead = (data:IMarkParams) => {
  return client.post('/articles/mark-read',data);
};

const markReadLater = (data:IMarkParams) => {
  return client.post('/articles/read-later',data);
};

const markImportant = (data:IMarkParams) => {
  return client.post('/articles/mark-important',data);
};

const markDeleted = (data:IMarkParams) => {
  return client.post('/articles/mark-deleted',data);
};

const articleService = {
  list,
  markRead,
  markReadLater,
  markImportant,
  markDeleted,
};

export default articleService;

