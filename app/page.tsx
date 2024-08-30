// app/page.tsx
'use client'
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import axios from 'axios';
import { useCallback, useEffect } from 'react';

export default function Home() {
  const { state, setState } = useGlobalContext();
  const data = state?.dataCollection

  const getData: any = useCallback(async () => {
    const result = await axios.get('/api/data')
    console.log(result)
    setState({ ...state, dataCollection: result.data })
  }, [state, setState])

  useEffect(() => {
    if(!state?.dataCollection){
      getData()
    }
  }, [getData, state]);

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <div className='bg-red-500 sm:bg-violet-500 md:bg-yellow-500 lg:bg-gray-500 xl:bg-green-500 2xl:bg-blue-500 w-56 h-56'>

      </div>
      {/* {
        data && data.map((item: any) => {
          return item
        })
      } */}
    </div>
  );
}
