import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { ByPassSecurity } from '../../pipes/ByPassSecurity.pipe';

import { DetailModel } from './detail.model';
import {RezeptweltService} from "../../services/rezeptwelt.service";
import { MDL } from '../MaterialDesignLiteUpgradeElement';

import { SearchItemComponent } from '../search/searchitem.component';


@Component({
    selector: 'detail-view',
    templateUrl: "component/detail/detail-view.component.html",
    directives: [MDL, SearchItemComponent, ROUTER_DIRECTIVES],
    providers: [RezeptweltService],
    pipes: [ByPassSecurity]
})
export class DetailViewComponent {

    @Input()
    public model = new DetailModel();

    public selectTab(tabId: string) {
        document.getElementById(tabId).scrollIntoView();
    }
}
