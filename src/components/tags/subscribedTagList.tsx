import React, { useState } from "react";
import { FixedSizeList } from "react-window";
import TagRow from './tagRow';

const SubscribedTagList = ()=>{
  return (
    <FixedSizeList height={1000} width={299} itemCount={500} itemSize={34}>
      {TagRow}
    </FixedSizeList>
  )
}

export default SubscribedTagList;

