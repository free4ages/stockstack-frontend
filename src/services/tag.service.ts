import {IDocument,IListParams,IListResponse} from './types';
import { client } from './client';
export interface ITagDocument extends IDocument{
  name: string;
  displayName ?: string;
  aliases?: string[];
  lastUpdated?: Date;
  subscribed?: boolean;
};

const list = (params:IListParams)=>{
  return client.get<IListResponse<ITagDocument>>('/tags',{params});
};

const search = (params: IListParams) => {
  return client.get<IListResponse<ITagDocument>>('/tags/search',{params});
}

const me = ()=>{
  return client.get<IListResponse<ITagDocument>>('/tags/me');
};

const subscribe = (tagId:string)=>{
  return client.post('/tags/subscribe',{tagId});
}

const unsubscribe = (tagId:string)=>{
  return client.post('/tags/unsubscribe',{tagId});
}

export default {
  list,
  search,
  me,
  subscribe,
  unsubscribe
}

