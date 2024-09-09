'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function HalamanUtama() {
  const router = useRouter()
  useEffect(() => {
    router.push('/auth')
  }, [router])
  return (
    <div></div>
  )
}
