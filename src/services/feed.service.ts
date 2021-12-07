import {IDocument,IListParams,IListResponse} from './types';
import { client } from './client';
export interface IMarkParams{
  userFeedId?: string;
  userFeedIds?: string[];
  value: boolean;
};

export interface IMarkPinParams{
  userFeedId?: string;
  addTagNames?: string[];
  removeTagNames?: string[];
};

export interface IArticleInfo{
  _id: string;
  article: string;
  readLater ?: boolean;
  notesCount ?: number;
  important ?: boolean;
  isRead ?: boolean;
  deleted ?: boolean;
}


export interface IFeedListParams extends IListParams{
 readLater ?: boolean;
 q ?: string;
 recommended ?: boolean;
 isRead ?: boolean;
 important ?: boolean;
 deleted ?: boolean;
 tagNames ?: string | string[];
 pinTags ?: string;
}

export type IMarkReadBulk = IFeedListParams & {updateReadLater?:boolean};

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
  isSeen?: boolean;
  pinTags ?: string[];
};

export type IFeedListResponse = IListResponse<IFeedDocument>;

const list = (params:IFeedListParams)=>{
  return client.get<IFeedListResponse>('/user-feeds',{params});
};

const listPinned = (params:IFeedListParams)=>{
  return client.get<IFeedListResponse>('/user-feeds/pinned',{params});
};

const listInfo = (articleIds:string[]) => {
  return client.post('/user-feeds/info',{articleIds});
}

const listByArticleIds = (articleIds:string[]) => {
  return client.post('/user-feeds/article-feeds',{articleIds});
}

const markRead = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-read',data);
};
const markReadBulk = (data:IMarkReadBulk) => {
  return client.post('/user-feeds/mark-read-bulk',data);
};

const markSeen = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-seen',data);
};

const markReadLater = (data:IMarkParams) => {
  return client.post('/user-feeds/read-later',data);
};

const markImportant = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-important',data);
};

const markPinned = (data:IMarkPinParams) => {
  return client.post('/user-feeds/mark-pinned',data);
};

const markDeleted = (data:IMarkParams) => {
  return client.post('/user-feeds/mark-deleted',data);
};

const feedService = {
  list,
  listInfo,
  listPinned,
  listByArticleIds,
  markRead,
  markReadLater,
  markImportant,
  markDeleted,
  markReadBulk,
  markSeen,
  markPinned
};
export default feedService;
