import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  af: AngularFire;

  constructor(af: AngularFire) {
    this.af = af;
  }

  getUserList(){

    return this.af.database.list('/userList')
  }

  addUser(user: any) {
    
    let id;
    id = user.count
    this.af.database.list('/userlist/' + id).push(user)
  }

}
