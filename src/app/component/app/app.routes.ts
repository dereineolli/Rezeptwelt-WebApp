import { provideRouter, RouterConfig } from "@angular/router";

// Custom Components
import {HomePageComponent}   from "../page-home/page-home.component";
import { SearchlistComponent } from '../search/searchlist.component';
import { DetailComponent } from '../detail/detail.component';


const routes: RouterConfig = [
	{ path: "", component: HomePageComponent },
	{ path: 'search/:value/:page', component: SearchlistComponent },
	{ path: 'detail/:category/:name', component: DetailComponent },
	{ path: 'detail/:category/:name/:id', component: DetailComponent },
	//{ path: '/**', redirectTo: '/' },
];

export const appRouterProviders = [
	provideRouter(routes)
];
