import { SearchItemModel } from './searchitem.model';

export class SearchModel {

    public items: SearchItemModel[];
    public pages = 0;
    public pageIndex: number;

    public get hasMorePages() {
        return this.pageIndex < this.pages; 
    }
    
    public get pagesArray(): Array<number> {
        return new Array<number>(this.pages);
    }

    /**
     *
     */
    constructor() {
        this.items = new Array<SearchItemModel>();
    }
}
