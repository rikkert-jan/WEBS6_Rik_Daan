import { AuthorizationService } from "../../services/authorization.service";
import { Component } from "@angular/core";

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LoginComponent {

    constructor(
        private auth: AuthorizationService
    ) {}

    public login() {
        this.auth.login();
    }

    public logout() {
        this.auth.logout();
    }
}