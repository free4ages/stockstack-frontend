import {IDocument,IListParams,IListResponse} from './types';
import { client } from './client';
export interface IArticleDocument extends IDocument{
  title: string;
  shortText?: string;
  fullText?: string;
  pubDate?: Date;
  retrieveDate: Date;
  tags ?: string[];
  link ?: string;
  attachmentLink ?: string;
  sourceDomain : string;
};

const list = (params:IListParams)=>{
  return client.get<IListResponse<IArticleDocument>>('/articles',{params});
};

export default {
  list
}
