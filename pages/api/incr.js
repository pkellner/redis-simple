import Redis from 'ioredis'

console.log("/pages/api/incr.js: process.env.REDIS_URL", process.env?.REDIS_URL ?? 'no redis url');
let redis = new Redis(process.env.REDIS_URL)

export default async (req, res) => {
  const count = await redis.incr('counter')
  res.status(200).json({ count })
}
