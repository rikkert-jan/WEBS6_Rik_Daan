import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable() export class MatchService {

    constructor(
        private database: AngularFireDatabase
    ) {

    }
}