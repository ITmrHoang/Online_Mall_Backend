import { BaseRepository, BaseService } from '../core/database.js';
export class UserModel extends BaseRepository {
        constructor() {
            super("User");
        }
}

export class UserService extends BaseService {
    getRepository() {
       return new UserModel()
    }
}

export default new UserService();