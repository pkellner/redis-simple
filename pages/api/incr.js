import Redis from 'ioredis'

console.log("/pages/api/incr.js: process.env.REDIS_URL", process.env?.REDIS_URL ?? 'no redis url');

const str = process.env.REDIS_URL;
//const str = 'redis://172.29.0.2:6379'
//const str = 'redis://redisdata:6379'
console.log("/pages/api/incr.js: str", str);

let redis;
try {
  redis = new Redis(str);
  console.log("/pages/api/incr.js: redis", redis);
} catch (e) {
  console.log("/pages/api/incr.js: e", e);
}


export default async (req, res) => {
  console.log("/pages/api/incr.js: about to incr");
  const count = await redis.incr('counter')
  res.status(200).json({ count })
}
