import { BaseModel } from '../core/database.js';
class UserModel extends BaseModel {
        constructor() {
            super("User");
        }
}

export default new UserModel();