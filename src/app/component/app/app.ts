// Libraries
import { Component, ApplicationRef } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, NavigationEnd } from "@angular/router";

import { MDL } from "../MaterialDesignLiteUpgradeElement";

import {LocalStorageService} from "../../services/localStorage.service";

// Custom Components
import {HomePageComponent}   from "../page-home/page-home.component";
import { SearchlistComponent } from "../search/searchlist.component";
import { DetailComponent } from "../detail/detail.component";


@Component({
    selector: "app",
    templateUrl: "app/component/app/app.html",
	directives: [MDL, SearchlistComponent, HomePageComponent, ROUTER_DIRECTIVES],
    precompile: [HomePageComponent, DetailComponent]
})

export class AppComponent {

    public searchvalue: string;

    constructor(private _router: Router, private _applicationRef: ApplicationRef, private _storage: LocalStorageService) {
        // Load last searchvalue
        if (_storage.get("searchvalue")) {
            this.searchvalue = _storage.get("searchvalue");
        }
        
        // iOS Hack for swiping back
         _router.events.subscribe(ev => {
            if(ev instanceof NavigationEnd) {
                setTimeout(() => {
                    _applicationRef.zone.run(() => _applicationRef.tick())
                }, 500)
            }
        });
    }

    search() {
        this._router.navigate(["/search", this.searchvalue, 0])
    }

    onResize(event) {

        // Correct margin mdl-layout__content, because header is fixed
        jQuery("main.mdl-layout__content").css("margin-top", jQuery(".mdl-layout__header").height() + "px");

        // offset for anchor jumps to look nicer
        jQuery(".detail-section").css("padding-top", jQuery(".mdl-layout__header").height() + 20 + "px");
        // to much space between sections so remove the half
        jQuery(".detail-section").css("margin-top", (jQuery(".mdl-layout__header").height()/2 * -1) + "px");
    }
}
