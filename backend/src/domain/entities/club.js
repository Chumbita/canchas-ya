export class Club {
    constructor({id, googleId, name, email, location, status, created_at }){
        this.id = id;
        this.googleId = googleId;
        this.name = name;
        this.email = email;
        this.location = location;
        this.status = status;
        this.created_at = created_at;
    }
}