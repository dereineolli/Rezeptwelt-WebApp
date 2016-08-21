
/// <reference path="../../typings/index.d.ts" />
///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import "./vendor";

import {provide, Component, enableProdMode} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_DIRECTIVES, Router } from "@angular/router";
import {Title, BrowserDomAdapter} from "angular2/platform/browser";

import {LocationStrategy, PathLocationStrategy, HashLocationStrategy} from "@angular/common";
import {RezeptweltService} from "./services/rezeptwelt.service";
import {LocalStorageService} from "./services/localStorage.service";
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from "@angular/http";
import {APP_BASE_HREF} from "@angular/common";

// Custom Components
import {AppComponent}     from "./component/app/app";
import { appRouterProviders } from "./component/app/app.routes";

enableProdMode();
bootstrap(AppComponent, [
	appRouterProviders,
	HTTP_PROVIDERS,
	JSONP_PROVIDERS,
	Title,
	BrowserDomAdapter,
	RezeptweltService,
	LocalStorageService,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	provide(APP_BASE_HREF, {useValue : "/" })
])
