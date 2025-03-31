// util/database.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("환경 변수에 MONGODB_URI가 설정되지 않았습니다.");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export { clientPromise as connectDB };
