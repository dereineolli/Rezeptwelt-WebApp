import {Directive, AfterViewInit} from '@angular/core';
declare var componentHandler: any;


@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewInit {

    ngAfterViewInit() {
        
        // To get mdl work correct....
        if (componentHandler) {
            componentHandler.upgradeDom();
        }

        // Correct margin mdl-layout__content, because header is fixed
        jQuery("main.mdl-layout__content").css("margin-top", jQuery(".mdl-layout__header").height() + "px");
    }
}
