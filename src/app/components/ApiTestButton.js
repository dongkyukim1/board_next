'use client'

import { useState } from 'react';

export default function ApiTestButton() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <>
      <button onClick={() => setOpen(!open)} className="bg-green-500 text-white p-2 rounded">
        {open ? '닫기' : '글쓰기'}
      </button>
      
      {open && (
        <form onSubmit={async e => {
          e.preventDefault();
          try {
            const res = await fetch('/api/write', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                title: e.target.title.value,
                content: e.target.content.value
              })
            });
            const data = await res.json();
            setMsg('완료: ' + data.id);
            e.target.reset();
            setOpen(false);
          } catch {
            setMsg('오류');
          }
        }} className="mt-2 p-2 border">
          <input name="title" placeholder="제목" className="w-full mb-2 border p-1" required />
          <textarea name="content" placeholder="내용" className="w-full mb-2 border p-1" rows="2" required />
          <button className="bg-blue-500 text-white p-1 rounded">저장</button>
        </form>
      )}
      
      {msg && <p className="text-sm">{msg}</p>}
    </>
  );
} 