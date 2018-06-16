import { Directive, TemplateRef, ViewContainerRef, Input, Renderer2, ElementRef, KeyValueDiffers } from '@angular/core';
import { Network } from 'vis';

@Directive({
    selector: '[appGraphVis]'
})
export class GraphVisDirective {
    network;
    differ;
    @Input() graphData;
    constructor(
        private el: ElementRef,
        private differs: KeyValueDiffers
    ) {
        this.differ = differs.find({}).create();
    }

    @Input() set appGraphVis(graphData) {
        this.graphData = graphData;
        var options = {
            interaction: {
                dragNodes: false,
            },
            layout: {
                hierarchical: {
                    sortMethod: "directed",
                    direction: "UD",
                    nodeSpacing: 350                    
                }
            },
            physics: false            
        };
        if (!this.network) {
            this.network = new Network(this.el.nativeElement, graphData, options);
        }
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.graphData);
        if (changes) {
            this.network.destroy();
            this.network = null;
            var options = {
                interaction: {
                    dragNodes: false,
                },
                layout: {
                    hierarchical: {
                        sortMethod: "directed",
                        direction: "UD",
                        nodeSpacing: 350                        
                    }
                },
                physics: false                
            };
            if (!this.network) {
                this.network = new Network(this.el.nativeElement, this.graphData, options);
            }
        }
    }
}