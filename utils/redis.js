import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.connected = true;
    this.client.on('error', (err) => {
      this.connected = false;
      console.error(err);
    });
    this.promisifyGet = promisify(this.client.get).bind(this.client);
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    try {
      const reply = await this.promisifyGet(key);
      return reply;
    } catch (err) {
      throw new Error(err);
    }
  }

  async set(key, val, duration) {
    this.client.setex(key, duration, val);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
