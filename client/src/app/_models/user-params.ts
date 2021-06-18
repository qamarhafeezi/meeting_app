import { User } from 'src/app/_models/user';
export class UserParams {

    pageNumber: number = 1;
    pageSize: number = 5;
    minAge: number = 18;
    maxAge: number = 150;
    gender: string = 'female'

    constructor(user: User) {
        this.gender = user.gender == 'male' ? 'female' : 'male'
    }

}
