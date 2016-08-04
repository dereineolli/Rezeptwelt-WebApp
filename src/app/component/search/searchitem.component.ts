import { Component, OnInit, Input } from '@angular/core';
import { ByPassSecurity } from '../../pipes/ByPassSecurity.pipe';
import { ROUTER_DIRECTIVES} from '@angular/router';

import { MDL } from '../MaterialDesignLiteUpgradeElement';

import { SearchItemModel } from './searchitem.model';


@Component({
    selector: 'searchitem',
    templateUrl: 'component/search/searchitem.component.html',
    directives: [MDL, ROUTER_DIRECTIVES],
    pipes: [ByPassSecurity]
})



export class SearchItemComponent {

    @Input()
    model: SearchItemModel;

}
