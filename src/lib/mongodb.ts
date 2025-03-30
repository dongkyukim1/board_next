import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'MongoDB URI가 설정되지 않았습니다. .env.local 파일에 MONGODB_URI를 설정해주세요.'
  );
}

// mongoose 연결 객체 타입 지정
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 글로벌 선언 (Next.js의 hot reload에서도 작동하게 하기 위함)
declare global {
   // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// 캐시 객체 설정
const cached: MongooseCache = globalThis.mongoose ?? {
  conn: null,
  promise: null,
};

// 캐시를 글로벌에 등록 (최초 1회만)
globalThis.mongoose = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    cached.promise = mongoose.connect(MONGODB_URI!, opts);

  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
