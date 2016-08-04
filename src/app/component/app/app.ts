// Libraries
import { Component } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";

import { MDL } from '../MaterialDesignLiteUpgradeElement';

import {LocalStorageService} from "../../services/localStorage.service";

// Custom Components
import {HomePageComponent}   from "../page-home/page-home.component";
import { SearchlistComponent } from '../search/searchlist.component';
import { DetailComponent } from '../detail/detail.component';


@Component({
    selector: "app",
    templateUrl: "component/app/app.html",
	directives: [MDL, SearchlistComponent, HomePageComponent, ROUTER_DIRECTIVES],
    precompile: [HomePageComponent, DetailComponent]
})

export class AppComponent {

    public searchvalue: string;

    constructor(private _router: Router, private _storage: LocalStorageService) {
        if (_storage.get("searchvalue")) {
            this.searchvalue = _storage.get("searchvalue");
        }
    }

    search() {
        
        this._router.navigate(['/search', this.searchvalue, 0])
    }
}
