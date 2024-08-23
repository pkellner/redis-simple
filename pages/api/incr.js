import Redis from 'ioredis'

console.log("/pages/api/incr.js: process.env.REDIS_URL", process.env?.REDIS_URL ?? 'no redis url');

const str = process.env.REDIS_URL;
//const str = 'redis://172.29.0.2:6379'
//const str = 'redis://redisdata:6379'
console.log("/pages/api/incr.js: str", str);

let redis = new Redis(str)


export default async (req, res) => {
  const count = await redis.incr('counter')
  res.status(200).json({ count })
}
