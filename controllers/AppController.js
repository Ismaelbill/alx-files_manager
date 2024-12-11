import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(request, response) {
    const redisstatus = redisClient.isAlive();
    const dbstatus = dbClient.isAlive();
    response.status(200).send({ redis: redisstatus, db: dbstatus });
  }

  static async getStats(request, response) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    response.status(200).send({ users: nbUsers, files: nbFiles });
  }
}
module.exports = AppController;
