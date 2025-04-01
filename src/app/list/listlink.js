'use client'

import { useRouter } from 'next/navigation'

export default function ListLink() {
    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.push(`/list`)}>목록</button>
            <br></br>
            <br></br>
            <button onClick={() => router.back()}>뒤로가기</button>
        </div>
    )
}