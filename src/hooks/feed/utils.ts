import {IFeedListParams} from 'services/feed.service';
import {IFeedFilter} from 'slices/feedSlice';
const transformFilters = (filters:IFeedFilter): IFeedListParams => {
  const transformed:any = {};
  for(let [key,value] of Object.entries(filters)){
    if(key==="showImportant"){
      if(value) transformed["important"] = true;
    }
    else if(key==="showReadLater"){
      if(value) transformed["readLater"] = true;
    }
    else if(key==="hideRead"){
      if(value) transformed["isRead"] = false;
    }
    else if(key==="tagName"){
      if(value) transformed["tagNames"] = value;
    }
    else if(key==="q"){
      if(value) transformed["q"] = value;
    }
    else if(value!==null){
      transformed[key]=value;
    }
  }
  return transformed;
};
export  {
  transformFilters,
}
