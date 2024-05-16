import { BaseRepository, BaseService } from '../core/database.js';
export class AccessToken extends BaseRepository {
        constructor() {
            super();
        }
}

export class AccessTokenService extends BaseService {
    getRepository() {
        return new AccessToken()
     }
}

export default new AccessTokenService();