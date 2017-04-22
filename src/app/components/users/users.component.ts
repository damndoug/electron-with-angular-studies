import { UserService } from './../../_services/user.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    users;
    userService: UserService;
    userForm: FormGroup;
    userName: string;
    userMail: string;
    accessType: string;
    userCount: number;

    constructor(us: UserService, fb: FormBuilder) {

        this.userService = us;
        this.userForm = fb.group({
            'id': [null],
            'name': [this.userName, Validators.required],
            'email': [this.userMail, Validators.required],
            'accessType': [this.accessType, Validators.required]
        })
    }

    ngOnInit() {

        this.userService.getUserList().subscribe(users => {
            this.users = users;
            this.userCount = users.length;
        });
    }

    addUser() {

        this.userForm.value.id = this.userCount++
        this.userService.postUser(this.userForm.value);
    }
}