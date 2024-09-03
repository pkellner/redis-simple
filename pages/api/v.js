import Redis from "ioredis";

const str = process.env.REDIS_URL;
//const str = 'redis://172.29.0.2:6379'
//const str = 'redis://redisdata:6379'
//console.log("/pages/api/incr.js: str", str);

const releaseDate = process.env?.RELEASEDATE ?? "no release date";

export default async (req, res) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(1000);
  const z = {
    RELEASEDATE: releaseDate ?? "NO RELEASEDATE",
    RELEASEDATEISO: new Date(releaseDate)?.toISOString(),
    RELEASEVERSION: process.env?.RELEASEVERSION ?? "NO RELEASEVERSION",
    data: str ?? "NO_REDIS_URL",
    time: new Date().toISOString(),
    releaseDate: releaseData,
  };
  res.status(200).json(z);
};
