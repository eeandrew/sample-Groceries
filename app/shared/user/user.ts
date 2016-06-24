const validator = require('email-validator');

export class User {
    email: String;
    password: String;
    isValidEmail() {
        return validator.validate(this.email);
    }
    constructor(email: string,password: string){
        this.email = email;
        this.password = password;
    }
}