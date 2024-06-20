import { RedisClientType, createClient as redisCreateClient } from "redis";
import dotenv from "dotenv";
import { VercelKV, createClient as vercelCreateClient } from "@vercel/kv";
import { RedisClientSourceType } from "./types";

dotenv.config();

class RedisClient {
  private static instance: RedisClient;
  private vercelRedisClient: VercelKV | undefined;
  private onServerRedisClient: RedisClientType | undefined;
  private redisClientType: RedisClientSourceType | undefined;

  private constructor() {
    this.initializeClients();
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  private initializeClients() {
    if (
      process.env.KV_URL &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN &&
      process.env.KV_REST_API_READ_ONLY_TOKEN
    ) {
      this.vercelRedisClient = vercelCreateClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });

      this.redisClientType = "vercelkv";
    } else {
      this.onServerRedisClient = redisCreateClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT || "6379", 10),
        },
      });
      this.onServerRedisClient.connect();

      this.redisClientType = "onserver";
    }
  }

  public async set(key: string, data: string): Promise<boolean> {
    try {
      if (this.redisClientType === "vercelkv") {
        this.vercelRedisClient?.set(key, data);
      }
      if (this.redisClientType === "onserver") {
        this.onServerRedisClient?.set(key, data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public async get(key: string): Promise<string | null | undefined> {
    try {
      if (this.redisClientType === "vercelkv") {
        return await this.vercelRedisClient?.get(key);
      }
      if (this.redisClientType === "onserver") {
        const result = await this.onServerRedisClient?.get(key);
        if (!result) {
          return null;
        }
        return JSON.parse(result);
      }
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }
}

export default RedisClient.getInstance();
