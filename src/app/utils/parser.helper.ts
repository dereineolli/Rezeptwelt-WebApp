/**
 * Parser
 */

import * as jQuery from "jquery";

export class Parser {
    
    public static getHtml(element: JQuery, selector: string) {
        return element.find(selector).html();
    }
    
    public static getAttributeValue(element: JQuery, selector: string, attribute: string) {
        return element.find(selector).attr(attribute);
    }

    public static getText(element: JQuery, selector: string) {
        return jQuery.trim(element.find(selector).text());
    };
}
