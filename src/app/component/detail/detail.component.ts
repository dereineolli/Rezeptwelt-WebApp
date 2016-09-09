import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ROUTER_DIRECTIVES, Router } from "@angular/router";

import { ByPassSecurity } from "../../pipes/ByPassSecurity.pipe";

import { DetailModel } from "./detail.model";
import {RezeptweltService} from "../../services/rezeptwelt.service";
import { MDL } from "../MaterialDesignLiteUpgradeElement";

import { DetailViewComponent } from "./detail-view.component";


@Component({
    selector: "detail",
    templateUrl: "app/component/detail/detail.component.html",
    directives: [MDL, DetailViewComponent, ROUTER_DIRECTIVES],
    providers: [RezeptweltService],
    pipes: [ByPassSecurity]
})
export class DetailComponent implements OnInit {
    
    public searchvalue = "";
    public model = new DetailModel();
    private loading = false;


    constructor(private _service: RezeptweltService, private _route: ActivatedRoute, private _router: Router) {
        
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            
            this.loading = true;

            let category = params["category"];
            let name = params["name"];
            let id = params["id"];

            document.title = "Rezept: " + decodeURIComponent(name);
            
            console.log("Load Details for " + category + "/" + name + "/" + id);

            this._service.getRecipe(category, name, id).subscribe(
                data => {
                    if (data === undefined || data === null) {
                        alert("Es ist ein Fehler aufgetreten.");
                        history.back();
                    } else {
                        this.model = data;
                        this.loading = false;
                    }
                },
                error => alert(error),
                () => {
                    console.log("Finished Details");
                }
            );
        });

    }
    
    public selectTab(tabId: string) {
        document.getElementById(tabId).scrollIntoView();

        // let layout = document.querySelector(".mdl-layout") as any;
        // layout.MaterialLayout.toggleDrawer();
        (document.body.querySelector(".mdl-layout__obfuscator.is-visible") as any).click();
    }

    public search(event: Event) {
        event.preventDefault();
        this._router.navigate(["/search", this.searchvalue, 0])

    }
}
