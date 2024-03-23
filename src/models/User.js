import moment from 'moment';

class User {
    constructor({
        uid,
        email,
        firstname,
        lastname,
        isAdmin = false,
        updatedAt = moment().toString(),
    }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.uid = uid;
        this.email = email;
        this.isAdmin = isAdmin;
        this.updatedAt = updatedAt;
    }

    to_json(excludeFields = []) {
        let obj = {
            firstname: this.firstname,
            lastname: this.lastname,
            uid: this.uid,
            email: this.email,
            isAdmin: this.isAdmin,
            updatedAt: this.updatedAt,
        };

        excludeFields.forEach((x) => delete obj[x]);

        return obj;
    }
}

export default User;
