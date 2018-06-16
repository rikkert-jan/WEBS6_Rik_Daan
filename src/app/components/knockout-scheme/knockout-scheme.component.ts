import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { UserService } from "../../services/user.service";
import { Match } from "../../models/match";

@Component({
    selector: 'knockout-scheme',
    templateUrl: './knockout-scheme.component.html',
    styleUrls: ['./knockout-scheme.component.scss'],
})
export class KnockoutSchemeComponent {

    graphData = {};

    @Input() matchNodes: any[] = [];
    @Input() matchEdges: any[] = [];
    @Input() matches: Match[];
    private calls = 0;
    private userCalls = 0;
    private usersReady = false;
    private nodesReady = false;

    constructor(
        private matchService: MatchService,
        private userService: UserService
    ) { }

    public generateTreeNodes() {
        var matches: Match[] = [];
        for (var j = 0; j < this.matches.length; j++) {
            var match = this.matches[j];
            var node = {
                id: match.id, label: "??? VS. ???\nTime: " + new Date(match.startingTimeInMs).toLocaleString(), shape: "box", color: {}, shapeProperties: {
                    borderRadius: 3
                }
            };

            if (match.prevMatch1 && match.prevMatch2) {
                var edge1 = { from: match.id, to: match.prevMatch1.id };
                var edge2 = { from: match.id, to: match.prevMatch2.id };
                this.matchEdges.push(edge1);
                this.matchEdges.push(edge2);
            }

            if (match.participants) {
                node.label = ((match.participants[0]) ? match.participants[0].name : "???") + " VS. " + ((match.participants[1]) ? match.participants[1].name : "???")
                node.label += "\nTime: " + new Date(match.startingTimeInMs).toLocaleString();
            }

            this.matchNodes.push(node);
        }
    }

    ngOnInit() {
        this.calls = this.matches.length;
        this.matchService.matches.snapshotChanges().subscribe(matches => {
            for (var i = 0; i < this.matches.length; i++) {
                for (var j = 0; j < matches.length; j++) {
                    if (matches[j].key == this.matches[i].id) {
                        this.matches[i] = { id: matches[j].key, ...matches[j].payload.val() }
                        this.calls--;
                        if (matches[i].payload.val().participants) {
                            for (var k = 0; k < matches[i].payload.val().participants.length; k++) {
                                this.userCalls++;
                            }
                        }
                    }
                }
            }
        });
    }

    ngDoCheck() {
        if (this.calls == 0 && !this.usersReady) {
            this.userService.users.snapshotChanges().subscribe(users => {
                for (var i = 0; i < users.length; i++) {
                    for (var j = 0; j < this.matches.length; j++) {
                        var match = this.matches[j];
                        if (match.participants) {
                            if (match.participants[0].id == users[i].key) {
                                this.matches[j].participants[0] = { id: users[i].key, ...users[i].payload.val() }
                                this.userCalls--;
                            }
                            if (match.participants[1].id == users[i].key) {
                                this.matches[j].participants[1] = { id: users[i].key, ...users[i].payload.val() }
                                this.userCalls--;
                            }
                        }
                    }
                }
            });
            this.usersReady = true;
        }
        if (this.userCalls == 0 && this.usersReady && !this.nodesReady) {
            this.generateTreeNodes();
            this.graphData["nodes"] = this.matchNodes;
            this.graphData["edges"] = this.matchEdges;
            this.nodesReady = true;
        }
    }

}
