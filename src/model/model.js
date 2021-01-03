import { User, UserType } from "./all-classes";

export class Model {
    user = new User({customerId: 2001, userType: UserType.CUSTOMER});
}

const model = new Model();

export default model;
