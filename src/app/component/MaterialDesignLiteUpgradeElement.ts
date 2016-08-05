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

        // offset for anchor jumps to look nicer
        jQuery(".detail-section").css("padding-top", jQuery(".mdl-layout__header").height() + 20 + "px");
        // to much space between sections so remove the half
        jQuery(".detail-section").css("margin-top", (jQuery(".mdl-layout__header").height()/2 * -1) + "px");
    }
}
