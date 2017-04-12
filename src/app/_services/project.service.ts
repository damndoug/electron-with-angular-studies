import { AngularFire } from 'angularfire2';
import { Injectable } from "@angular/core";

@Injectable()
export class ProjectService {

    af: AngularFire;

    constructor(af: AngularFire) {
        this.af = af;
    }

    getProjectData() {

        return this.af.database.list('/projectList')
    }

}