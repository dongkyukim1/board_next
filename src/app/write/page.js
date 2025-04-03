'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('저장 중...');

    try {
      const res = await fetch('/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('저장 완료!');
        setTimeout(() => {
          router.push('/');  // 메인 페이지로 이동
        }, 1000);
      } else {
        setMessage(data.error || '오류가 발생했습니다');
      }
    } catch (err) {
      setMessage('서버 오류가 발생했습니다');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">글쓰기</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="10"
            required
          />
        </div>
        
        <div className="flex justify-between">
          <Link href="/" className="bg-gray-500 text-white py-2 px-4 rounded">
            취소
          </Link>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            저장
          </button>
        </div>
      </form>
      
      {message && (
        <div className="mt-4 p-2 bg-blue-50 text-center rounded">
          {message}
        </div>
      )}
    </div>
  );
} 