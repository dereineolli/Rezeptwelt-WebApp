import { Pipe } from "@angular/core";
import { DomSanitizationService } from "@angular/platform-browser";

@Pipe({ name: "bypassSecurity" })
export class ByPassSecurity {
    constructor(private _sanitizer: DomSanitizationService) {
    }

    transform(style) {
        return this._sanitizer.bypassSecurityTrustStyle(style);
    }
}
