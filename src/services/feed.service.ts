import {IDocument,IListParams,IListResponse} from './types';
import { client } from './client';
export interface IMarkParams{
  userFeedId: string;
  value: boolean;
};

export interface IFeedListParams extends IListParams{
 readLater ?: boolean;
 recommended ?: boolean;
 isRead ?: boolean;
 important ?: boolean;
 deleted ?: boolean;
 tagNames ?: string | string[];
}

export interface IFeedDocument extends IDocument{
  title: string;
  shortText?: string;
  article: string;
  fullText?: string;
  pubDate?: Date;
  retrieveDate: Date;
  tags ?: string[];
  link ?: string;
  attachmentLink ?: string;
  sourceDomain : string;
  readLater?: boolean;
  notesCount?: number;
  important?: boolean;
  isRead?: boolean;
};

const list = (params:IFeedListParams)=>{
  return client.get<IListResponse<IFeedDocument>>('/user-feeds',{params});
};

const markRead = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-read',data);
};

const markReadLater = (data:IMarkParams) => {
  return client.post('/user-feeds/read-later',data);
};

const markImportant = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-important',data);
};

const markDeleted = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-deleted',data);
};

export default {
  list,
  markRead,
  markReadLater,
  markImportant,
  markDeleted
};

