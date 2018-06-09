import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/Notification';

@Component({
    selector: 'notification-component',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    public message: string;
    public type: string;

    constructor(
        private notificationService: NotificationService
    ) {
        this.notificationService.notificationSubject.subscribe(notification => {
            this.showMessage(notification);
        });
    }

    public showMessage(notification: Notification) {
        this.message = notification.message;
        this.type = notification.type;
        setTimeout(() => {
            this.type = '';
        }, 4000);
    }

    public hide() {
        this.type = '';
    }
}
