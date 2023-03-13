import UserSchema from "../models/user.model";

import { IUser } from "../types/ITypes";

class UserService {
    /**
     * @description
     * Registers a new user
     * @param {{username, email, password}} data
     */
    createUser(data: IUser) {
        const user = new UserSchema(data);
        return user.save();
    }

    /**
     * @description
     * Finds and return a user
     * @param {{username}} data
     */
    findUserName(data: IUser) {
        return UserSchema.findOne({ username: data.username });
    }

    /**
     * @description
     * Finds and return a user
     * @param {{email}} data
     */
    findUserEmail(data: IUser) {
        return UserSchema.findOne({ email: data.email });
    }

    /**
     * @description
     * Finds and returns all the user
     */
    findUsers() {
        return UserSchema.find({});
    }
}

export default new UserService();
