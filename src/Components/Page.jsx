import React, {useState, useEffect} from 'react';

const Page = props => {



  return(
    <>
    <p>{props.match.params.pageid}</p>
    </>
  )
}

export default Page;