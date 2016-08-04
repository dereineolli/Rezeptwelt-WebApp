import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from "@angular/router";

import { LocalStorageService } from '../../services/localStorage.service';

@Component({
	selector: 'searchbar',
	templateUrl: "component/navigation/searchbar.component.html",

})

export class SearchbarComponent {
	
	private _searchvalue: string;

    public set searchvalue(value: string) {
        this._searchvalue = value;
        this._storage.set("searchvalue", value);
    }
        
    public get searchvalue(): string {
        return this._searchvalue;
    }

    constructor(private _router: Router, private _storage: LocalStorageService) {
        if (_storage.get("searchvalue")) {
            this.searchvalue = _storage.get("searchvalue");
        }
    }

    search(event: Event) {
        event.preventDefault();
        this._router.navigate(['/search', this.searchvalue, 0])

    }

}
