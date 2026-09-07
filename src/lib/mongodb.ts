import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되어 있지 않습니다 (.env.local 확인)");
  }
  return new MongoClient(uri).connect();
}

// 개발 모드의 hot-reload 시 매 요청마다 새 커넥션이 쌓이지 않도록 전역에 캐시한다.
const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (global._mongoClientPromise ??= createClientPromise())
    : createClientPromise();

export default clientPromise;
