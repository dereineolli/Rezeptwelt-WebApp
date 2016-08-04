// Libraries
import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { MDL } from '../MaterialDesignLiteUpgradeElement';

import { RezeptweltService } from "../../services/rezeptwelt.service";
import { LocalStorageService } from "../../services/localStorage.service";

import { SearchbarComponent } from '../navigation/searchbar.component';
import { SearchItemComponent } from '../search/searchitem.component';
import { SearchItemModel } from '../search/searchitem.model';

@Component({
    selector: "home",
    templateUrl: "component/page-home/page-home.component.html",
    directives: [MDL, SearchbarComponent, SearchItemComponent],
    providers: [RezeptweltService, LocalStorageService],
})
export class HomePageComponent implements OnInit {
    
    public reciptOfToday: SearchItemModel;
        
    constructor(private _service: RezeptweltService, private _storage: LocalStorageService) {

    }

    ngOnInit() {
        this._storage.remove("searchvalue");

        this._service.getReciptOfToday().subscribe(
            data => this.reciptOfToday = data
        );
    }

    public hideMenu() {
        let layout = document.querySelector('.mdl-layout') as any;
        layout.MaterialLayout.toggleDrawer();
    }
}
