'use client'

import ListLink from '../list/listlink.js';
import Link from 'next/link';

export default function ButtonWrapper() {
  return (
    <div className="mt-6 text-right">
      <Link href="/write">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
          글쓰기
        </button>
      </Link>
      <br></br>
      <br></br>
      <ListLink />
    </div>
  );
} 