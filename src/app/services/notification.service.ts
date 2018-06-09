import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Notification } from "../models/Notification";

@Injectable()
export class NotificationService {

    public notificationSubject: Subject<Notification> = new Subject<Notification>();

    constructor() {
        this.notificationSubject.next();
    }

    public sendSuccess(message: string) {
        const notification: Notification = {
            message: message,
            type: 'success'
        }
        this.notificationSubject.next(notification);
    }

    public sendError(message: string) {
        const notification: Notification = {
            message: message,
            type: 'error'
        }
        this.notificationSubject.next(notification);
    }
}