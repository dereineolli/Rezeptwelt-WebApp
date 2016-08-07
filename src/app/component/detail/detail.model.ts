import { Response } from "@angular/http";
import { Parser } from "../../utils/parser.helper";

import * as jQuery from "jquery";
import { SearchItemModel } from "../search/searchitem.model";

/**
 * DetailModel
 */
export class DetailModel {
    
    private _stars: number;
    public url: string;
    public title: string;
    public portion: string;
    public totalTime: string;
    public prepTime: string;
    public bakingTime: string;
    public tip: string;
    public difficulty: string;


    public starsArray: number[];

    public set stars(value: number) {
        this._stars = value;
        this.starsArray = new Array(value);
    }
    
    public get stars():number {
        return this._stars;
    }
    
    public accessoires = new Array<Accessoire>();
    public images = new Array<string>();
    public ingredients = new Array<Ingredient>();
    public preparations = new Array<PreparationStep>();
    public comments = new Array<Comment>();
    public recommendations = new Array<SearchItemModel>();
    public variations = new Array<SearchItemModel>();


    public load(htmlElement: HTMLElement, url: string) {
        
        if (htmlElement == null) {
            return;
        }
        
        let $rootElement = jQuery(htmlElement);

        const titleSelector = "#step-1-container span:first";
        const portionSelector = "#portion_text";
        const totalTimeSelector = "#total-time-final";
        const prepTimeSelector = "#preparation-time-final";
        const bakingTimeSelector = "#cooking-time-final";
        const tipSelector = "#tip-final";
        const difficultySelector = ".difficulty-word";

        this.url = url;
        this.title = Parser.getHtml($rootElement, titleSelector);
        this.portion = Parser.getHtml($rootElement, portionSelector);
        this.totalTime = Parser.getText($rootElement, totalTimeSelector);
        this.prepTime = Parser.getText($rootElement, prepTimeSelector);
        this.bakingTime = Parser.getText($rootElement, bakingTimeSelector);
        this.difficulty = Parser.getText($rootElement, difficultySelector);
        this.tip = Parser.getHtml($rootElement, tipSelector);
        
        this.stars = $rootElement.find(".star .on").length;
        
        this.loadImages($rootElement);
        this.loadIngredient($rootElement);
        this.loadPreparation($rootElement);
        this.loadComments($rootElement);
        this.loadRecommendations($rootElement);
        this.loadVariations($rootElement);
        this.loadAccessoires($rootElement);
    }

    private loadImages($element: JQuery) {

        const imageSelector = "#step-3-container input[value*="//"]";

        $element.find(imageSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            this.images.push($elem.attr("value"));
        });
    }
    
    private loadIngredient($element: JQuery) {
        
        const ingredientSelector = "#ingredient-blocks-wrapper-final ul";

        $element.find(ingredientSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let ingredient = new Ingredient();
    
            // Sometimes there are no headers...
            // But if there is a header then it has a class groupheader
            if ($elem.prev().prev().hasClass("groupheader")) {
                ingredient.groupName = $elem.prev().prev().text();
            }
            
            ingredient.ingredients = $elem.find("li").map(function(){ 
                let text = jQuery.trim(jQuery(this).html());

                return text.length > 0 ? text : null; 
            }).get();

            this.ingredients.push(ingredient);
        });
    }

    private loadPreparation($element: JQuery) {
        
        const preparationStepsSelector = "#preparation-active-final .step-block:first .step-content";
        const preparationSelector = "#preparation-active-final .step-content:first";
            
        // Are there more than one PreparationStep?
        if ($element.find(preparationStepsSelector).length > 0) {

            $element.find(preparationStepsSelector).each((index, elem) => {
                let $elem = jQuery(elem);
                let step = new PreparationStep();
        
                // Sometimes there are no headers...
                // But if there is a header then it has a class groupheader
                if ($elem.prev().hasClass("groupheader")) {
                    step.groupName = $elem.prev().text();
                }
    
                step.preparation = $elem.html();
                this.preparations.push(step);
            });

        } else {

            let step = new PreparationStep();
            step.preparation = Parser.getHtml($element, preparationSelector);
            this.preparations.push(step);

        }

    }

    private loadComments($element: JQuery) {

        const commentSelector = "#comments .comment";
        
        $element.find(commentSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let comment = new Comment();
    
            comment.text = Parser.getHtml($elem, ".content p");
            comment.submitted = Parser.getHtml($elem, ".submitted");

            this.comments.push(comment);
        });
    }

    private loadRecommendations($element: JQuery) {
        
        const recommendationsSelector = "#recommendations-category .jcarousel li";
        const imageSelector = ".views-field-field-recipes-picture-fid img"
        const linkSelector = ".views-field-title a"
        const starSelector = ".views-field-value .on"

        $element.find(recommendationsSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let item = new SearchItemModel();
    
            item.image = Parser.getAttributeValue($elem, imageSelector, "src");
            item.text = Parser.getText($elem, linkSelector);
            item.link = Parser.getAttributeValue($elem, linkSelector, "href");
            item.stars = $elem.find(starSelector).length;

            if (item.image == null || item.image.length <= 0) {
                item.image = "http://de.cdn.community.thermomix.com/sites/all/themes/frontend/thermomix/images/nopicture_rectangle.png";
            }

            this.recommendations.push(item);
        });
    }

    private loadVariations($element: JQuery) {
        
        const variationsSelector = "#sidebar .recipevariation li a";

        $element.find(variationsSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let item = new SearchItemModel();
    
            item.image = "http://de.cdn.community.thermomix.com/sites/all/themes/frontend/thermomix/images/nopicture_rectangle.png";
            item.text = $elem.text();
            item.link = $elem.attr("href");
            item.stars = 0;

            this.variations.push(item);
        });
    }

    private loadAccessoires($element: JQuery) {

        const accessoireSelector = "#border-box-inner .accessoire";
        const accessoireTextSelector = ".accessoire-text";
        const accessoireImageSelector = "img";

        $element.find(accessoireSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let model = new Accessoire();

            model.text = Parser.getText($elem, accessoireTextSelector);
            model.image = Parser.getAttributeValue($elem, accessoireImageSelector, "src");

            this.accessoires.push(model);
        });
    }
}

export class Ingredient {
    public groupName;

    public ingredients = new Array<string>();
}

export class PreparationStep {
    
    public groupName: string;

    public preparation: string;
}

export class Comment {

    public text: string;

    public submitted: string;
}

export class Accessoire {

    public text: string;

    public image: string;
}
