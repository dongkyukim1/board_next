import { connectDB } from "../utils/database";
import Link from "next/link";
import { ObjectId } from "mongodb";
import DetailLink from "../detail/detaillink";

interface Post {
  title: string;
  content: string;
  date?: Date;
  _id?: ObjectId;
}

export default async function Home() {
  const db = (await connectDB).db("board_next");
  const posts = await db.collection("next").find().toArray() as Post[];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">독서 게시판</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {posts.map((post) => (
          <div key={post._id?.toString()} className="border p-3 rounded">
            <Link href={`/detail/${post._id?.toString()}`}>
              <h2 className="font-bold">{post.title}</h2>
            </Link>
            <DetailLink />
            <p className="text-sm line-clamp-2">{post.content}</p>
            {post.date && <small>{new Date(post.date).toLocaleDateString()}</small>}
          </div>
        ))}
      </div>
      
      {posts.length === 0 && <p className="text-center">게시물이 없습니다</p>}
    </div>
  );
}
