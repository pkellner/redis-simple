import Redis from 'ioredis'


const str = process.env.REDIS_URL;
//const str = 'redis://172.29.0.2:6379'
//const str = 'redis://redisdata:6379'
//console.log("/pages/api/incr.js: str", str);

export default async (req, res) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  await sleep(1000)
  res.status(200).json({ data: str ?? "NO_REDIS_URL", time: new Date().toISOString() })
}
