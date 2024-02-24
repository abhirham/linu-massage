class User {
    constructor({ uid, email, firstname, lastname, isAdmin = false }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.uid = uid;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    to_json() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            uid: this.uid,
            email: this.email,
            isAdmin: this.isAdmin,
        };
    }
}

export default User;
