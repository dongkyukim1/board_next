'use client'

import { useState } from 'react';

export default function ApiTestButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get('title'),
      content: formData.get('content')
    };
    
    try {
      const res = await fetch('/api/write', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      setResult('저장 완료: ' + json.id);
      event.target.reset();
      setIsOpen(false);
    } catch (e) {
      setResult('오류 발생');
    }
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-green-500 text-white p-2 rounded">
        {isOpen ? '닫기' : 'API 테스트'}
      </button>
      
      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-2 p-2 border rounded">
          <input name="title" placeholder="제목" className="w-full p-1 border mb-2" required />
          <textarea name="content" placeholder="내용" className="w-full p-1 border mb-2" rows="2" required />
          <button type="submit" className="bg-blue-500 text-white p-1 rounded">저장</button>
        </form>
      )}
      
      {result && <p className="text-sm mt-1">{result}</p>}
    </div>
  );
} 