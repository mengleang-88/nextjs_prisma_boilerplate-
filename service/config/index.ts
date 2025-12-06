import dotenv from 'dotenv';

dotenv.config();

const num = (val: string | undefined, fallback: number) => {
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export const config = {
  port: num(process.env.PORT, 3223),
} as const;

export type AppConfig = typeof config;
