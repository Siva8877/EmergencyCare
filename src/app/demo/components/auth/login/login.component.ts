import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/demo/service/user.service';
import { Message, MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/demo/service/data.storage.service';
import {
    Router
} from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    usernamePassMissing = false;
    invalidUserNamePass = false;
    password!: string;
    username: string = '';
    constructor(public layoutService: LayoutService,
        private userService: UserService,
        private router: Router,
        private dataStorageService: DataStorageService) { }

    onSignInClick() {
        this.usernamePassMissing = false;
        this.invalidUserNamePass = false;
        if (!this.username || !this.password) {
            this.usernamePassMissing = true;
            return
        } else {
            this.userService.getUser(this.username, this.password).then((userDetail: any) => {
                if (userDetail) {
                    localStorage.setItem('userId', userDetail['userid']);
                    localStorage.setItem('password', userDetail['password']);
                    localStorage.setItem('role', userDetail['role']);
                    localStorage.setItem('name', userDetail['name']);
                    localStorage.setItem('hospitalId', userDetail['hospitalId']);

                    this.router.navigate(['/hospital']);
                } else {
                    this.invalidUserNamePass = true;
                }
            });
        }

    }
}
