import { Pipe } from "@angular/core";
import { DomSanitizationService } from "@angular/platform-browser";

@Pipe({ name: "bypassSecurity" })
export class ByPassSecurity {
    constructor(private sanitizer: DomSanitizationService) {
        this.sanitizer = sanitizer;
    }

    transform(style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }
}
