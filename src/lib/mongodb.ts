import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'MongoDB URI가 설정되지 않았습니다. .env.local 파일에 MONGODB_URI를 설정해주세요.'
  );
}

/**
 * 글로벌 변수에 mongoose 연결 객체를 캐싱
 */
let cached = global as any;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongoose.promise = mongoose.connect(MONGODB_URI!, opts);
  }
  
  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (e) {
    cached.mongoose.promise = null;
    throw e;
  }
  
  return cached.mongoose.conn;
}

export default connectDB; 