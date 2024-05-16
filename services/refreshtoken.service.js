import { BaseRepository, BaseService } from '../core/database.js';
export class RefreshToken extends BaseRepository {
        constructor() {
            super();
        }
}

export class RefreshTokenService extends BaseService {
    getRepository() {
        return new RefreshToken()
     }
}

export default new RefreshTokenService();