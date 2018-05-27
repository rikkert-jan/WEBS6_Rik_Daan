import { Component, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    public itemObservable: Observable<any[]>;
    public items: any[];

    constructor(
        private database: AngularFireDatabase
    ) {
        this.itemObservable = this.database.list('/items').valueChanges();
        this.itemObservable.subscribe(x => {
            this.items = x;
        });

        // this.database.list('/items').set('/item', 'hello world');
    }
}
