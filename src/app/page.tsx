import { connectDB } from "../../util/database.js";
import React from "react";
import { ObjectId } from "mongodb";

interface Post {
  title: string;
  content: string;
  date?: Date;
  _id?: ObjectId;
}

export default async function Home() {
  const client = await connectDB;
  
  const db = client.db("board_next");
  const result = await db.collection("next").find().toArray() as Post[];
  console.log(result);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>
      {result.length > 0 ? (
        <ul className="space-y-2">
          {result.map((post: Post, i: number) => (
            <li key={i} className="border p-4 rounded-lg">
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </div>
  );
}
