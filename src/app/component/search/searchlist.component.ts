import { Component, OnInit, Input } from '@angular/core';
import { Route, ActivatedRoute, ROUTER_DIRECTIVES, Router } from '@angular/router';

import {RezeptweltService} from "../../services/rezeptwelt.service";
import {LocalStorageService} from "../../services/localStorage.service";

import { MDL } from '../MaterialDesignLiteUpgradeElement';

import { SearchModel } from './search.model';
import { SearchItemComponent } from './searchitem.component';
import { DetailComponent } from '../detail/detail.component';
import { SearchbarComponent } from '../navigation/searchbar.component';

@Component({
    selector: 'searchlist',
    templateUrl: 'component/search/searchlist.component.html',
    directives: [MDL, SearchItemComponent, ROUTER_DIRECTIVES, SearchbarComponent],
})

export class SearchlistComponent implements OnInit {

    public searchvalue: string;
    public pageIndex = 0;
    public model: SearchModel;
    public searching = false;

    constructor(private _service: RezeptweltService, private _route: ActivatedRoute, private _router: Router, private _storage: LocalStorageService) {


    }

    ngOnInit() {

        this._route.params.subscribe(params => {
            this.searchvalue = params['value'];
            this.pageIndex = parseInt(params['page']);

            this._storage.set('searchvalue', this.searchvalue);

            console.log("New SearchListComponent Instance. Searchvalue: " + this.searchvalue);

            if (this.searchvalue != null && this.searchvalue.length > 0) {
                this.searching = true;

                window.scrollTo(0, 0);

                this._service.getList(this.searchvalue, this.pageIndex).subscribe(
                    data => {
                        console.log("Loaded")
                        this.model = data;
                        this.pageIndex = data.pageIndex;
                    },
                    error => alert(error),
                    () => {
                        console.log("Finished");
                        this.searching = false;
                    }
                );
            }
        });

    }
    
    public hideMenu() {
        let layout = document.querySelector('.mdl-layout') as any;
        layout.MaterialLayout.toggleDrawer();
    }
}
