// app/page.tsx
'use client'
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';


export default function Home({ params }: {
  params: {
    lang: string
  }
}) {
  const { state, setState } = useGlobalContext();
  const data = state?.dataCollection

  const getData: any = useCallback(async () => {
    const result = await axios.get('/api/data')
    // console.log(result)
    setState({ ...state, dataCollection: result.data })
  }, [state, setState])

  useEffect(() => {
    if(!state?.dataCollection){
      getData()
    }
  }, [getData, state]);


  const langgg = state?.language

  return (
    <div>
      <div className='bg-red-500 sm:bg-violet-500 md:bg-yellow-500 lg:bg-gray-500 xl:bg-green-500 2xl:bg-blue-500 w-56 h-56'>

      </div>
      <h1>{langgg?.products?.cart}</h1>
      {/* {
        data && data.map((item: any) => {
          return item
        })
      } */}
    </div>
  );
}
