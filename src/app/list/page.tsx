import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export default async function List() {
  const client = await MongoClient.connect(uri);
  const db = client.db('board_next'); // ← DB 이름
  const result = await db.collection('next').find().toArray(); // ← 모든 글 가져오기
  console.log(result); // ← 콘솔에 결과 출력
  return (
    <div className="list-bg">
      <div className="list-item">  
      {result.map((post) => (
        <div key={post._id.toString()} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      </div>
    </div>
  );
}