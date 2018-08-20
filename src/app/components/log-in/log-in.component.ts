import { AuthorizationService } from "../../services/authorization.service";
import { Component } from "@angular/core";

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LoginComponent {

    public isAuthenticated = false;

    constructor(
        public auth: AuthorizationService
    ) {}

    public login() {
        this.auth.login();
        this.isAuthenticated = true;
    }

    public logout() {
        this.auth.logout();
        this.isAuthenticated = false;
    }
}