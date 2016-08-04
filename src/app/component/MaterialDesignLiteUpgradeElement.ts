import {Directive, AfterViewInit} from '@angular/core';
declare var componentHandler: any;


@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewInit {

    ngAfterViewInit() {
        if (componentHandler) {
            componentHandler.upgradeDom();
        }
    }
}
