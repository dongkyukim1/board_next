'use client'

import { useRouter } from 'next/navigation'
export default function DetailLink() {
    const router = useRouter()
    return (
        
            <button onClick={() => router.push(`/`)}>상세페이지</button>
  
    )
}