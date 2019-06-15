import React, {useState, useEffect} from 'react';

const Page = props => {



  return(
    <>
    <p>{props.match.params.pagetitle}</p>
    </>
  )
}

export default Page;