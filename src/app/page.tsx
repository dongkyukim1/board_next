import { connectDB } from "./utils/database";
import Link from "next/link";
import { ObjectId } from "mongodb";
import ButtonWrapper from './components/ButtonWrapper';

interface Post {
  title: string;
  content: string;
  date?: Date;
  _id?: ObjectId;
}

export default async function Home() {
  const db = (await connectDB).db("board_next");
  let posts: Post[] = [];
  
  try {
    posts = await db.collection("next").find().toArray() as Post[];
  } catch (error) {
    console.error("데이터베이스 연결 오류:", error);
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">게시판</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id?.toString()} className="border p-4 rounded shadow-sm hover:shadow-md transition">
            <Link href={`/detail/${post._id?.toString()}`}>
              <h2 className="font-bold text-lg mb-2">{post.title}</h2>
            </Link>
            <p className="text-gray-700 text-sm line-clamp-2 mb-2">{post.content}</p>
            {post.date && <small className="text-gray-500">{new Date(post.date).toLocaleDateString()}</small>}
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">게시물이 없습니다</p>
        </div>
      )}
      
      <ButtonWrapper />
    </div>
  );
} 