import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되어 있지 않습니다 (.env.local 확인)");
  }
  return new MongoClient(uri).connect();
}

// 요청 시점에 연결을 생성하고, hot-reload/서버리스 재사용 시 커넥션이 쌓이지 않도록 전역에 캐시한다.
export default function getClientPromise(): Promise<MongoClient> {
  return (global._mongoClientPromise ??= createClientPromise());
}
