export class SearchItemModel {

    private _link: string;
    private _stars: number;

    public image: string;
    public text: string;
    
    public category = "";
    public uriName = "";
    public id = "";
    
    public starsArray: number[];

    public set stars(value: number) {
        this._stars = value;
        this.starsArray = new Array(value);
    }
    
    public get stars():number {
        return this._stars;
    }

    public set link(value: string) {
        
        // In details, links are relative. So we must add the complete url.
        if (value.indexOf("/") == 0) {
            value = "http://www.rezeptwelt.de" + value;
        }

        this._link = value;
        
        // http://www.rezeptwelt.de/vorspeisensalate-rezepte/radieschen-apfel-salat/755367
        // remove domain and split into segments
        

        let segments = value.replace("http://www.rezeptwelt.de/", "").split("/");
        if (segments != null && segments.length >= 2) {
            this.category = segments[0];
            this.uriName = segments[1];
            this.id = segments.length === 3 ? segments[2] : "";
        }
    }
}
