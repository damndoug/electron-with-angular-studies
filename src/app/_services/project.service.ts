import { AngularFire } from 'angularfire2';
import { Injectable } from "@angular/core";

@Injectable()
export class ProjectService {

    af: AngularFire;
    obj;

    constructor(af: AngularFire) {
        this.af = af;
    }

    getProjectKeys() {

        let keys = [];

        this.obj = this.af.database.list('/projectList')

        this.obj.forEach(key => {
            for (var item = 0; item < key.length; item++) {
                var element = key[item].$key;
                keys.push(element);
            }
        });

        return keys

    }

}