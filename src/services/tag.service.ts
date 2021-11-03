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

const me = ()=>{
  return client.get<IListResponse<ITagDocument>>('/tags/me');
};

export default {
  list,
  me
}

