import { Component, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '@firebase/util/dist/src/subscribe';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    public items: Observable<any[]>;

    constructor(
        private database: AngularFireDatabase
    ) {
        this.items = this.database.list('/items').snapshotChanges();
        this.items = this.database.list('/items').valueChanges();
    }
}
