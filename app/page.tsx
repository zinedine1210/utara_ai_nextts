// app/page.tsx
'use client'
import { useGlobalContext } from '@@/src/context/GlobalContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const { state, setState } = useGlobalContext();
  const data = state?.dataCollection

  const getData = async () => {
    const result = await axios.get('/api/data')
    console.log(result)
    setState({ ...state, dataCollection: result.data })
  }

  useEffect(() => {
    if(!state?.dataCollection){
      getData()
    }
  }, [state]);

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      {
        data && data.map((item: any) => {
          return item
        })
      }
    </div>
  );
}
