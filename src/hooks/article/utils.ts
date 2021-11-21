import {IArticleListParams} from 'services/article.service';
import {IArticleFilter} from 'slices/articleSlice';

const transformFilters = (filters:IArticleFilter): IArticleListParams => {
  const transformed:any = {};
  for(let [key,value] of Object.entries(filters)){
    if(key==="hideRead"){}
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
