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

    public get stars(): number {
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

        const titleSelector = ".recipe-title-heading a.preventDefault";
        const portionSelector = ".ingredients .padding-bottom-10";
        const totalTimeSelector = ".additional-info li:first h5";
        const prepTimeSelector = "#preparation-time-final";
        const bakingTimeSelector = "#baking-time-final";
        const tipSelector = ".tips p";
        const difficultySelector = ".additional-info li:nth-child(2) h5"; // upff why so difficult
        const starSelector = ".rating-stars:first";

        this.url = url;
        this.title = Parser.getHtml($rootElement, titleSelector);
        this.portion = Parser.getText($rootElement, portionSelector);
        this.totalTime = Parser.getText($rootElement, totalTimeSelector);
        this.prepTime = Parser.getText($rootElement, prepTimeSelector);
        this.bakingTime = Parser.getText($rootElement, bakingTimeSelector);
        this.difficulty = Parser.getText($rootElement, difficultySelector);
        
        // To get all p Elements, simply wrap all togehter in an div Element, select the div Element and get inner html
        this.tip = $rootElement.find(tipSelector).wrapAll("<div></div>").parent().html();

        let stars = Parser.getAttributeValue($rootElement, starSelector, "data-average");
        if (stars.length > 0) {
            this.stars = parseInt(stars);
        }

        this.loadImages($rootElement);
        this.loadIngredient($rootElement);
        this.loadPreparation($rootElement);
        this.loadComments($rootElement);
        this.loadRecommendations($rootElement);
        this.loadVariations($rootElement);
        this.loadAccessoires($rootElement);
    }

    private loadImages($element: JQuery) {

        const imageSelector = ".images .responsive-image";

        $element.find(imageSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            this.images.push($elem.attr("src"));
        });
    }

    private loadIngredient($element: JQuery) {

        const ingredientSelector = ".ingredients h5";

        if ($element.find(ingredientSelector).length > 0) {

            $element.find(ingredientSelector).each((index, elem) => {
                let $elem = jQuery(elem);
                let ingredient = new Ingredient();
                ingredient.groupName = $elem.text();
                
                // Only add ingredient if there is a list
                if ($elem.next("ul").length > 0) {
                    
                    // Select all li elem
                    ingredient.ingredients = $elem.next("ul").find("li").map(function () {
                        let text = jQuery.trim(jQuery(this).html());

                        return text.length > 0 ? text : null;
                    }).get();
                    
                    this.ingredients.push(ingredient);
                }
            });
        }
    }

    private loadPreparation($element: JQuery) {

        const preparationStepsSelector = ".steps-list";

        let lastStep: PreparationStep;

        // Lookup for ol-Element with class steps-list
        $element.find(preparationStepsSelector).children().each((index, elem) => {
            let $elem = jQuery(elem);

            // If current element is an h5 tag, then this is a group header
            if (elem.tagName.toLowerCase() === "h5") {

                // if lastStep is not null, add lastStep to preparation array
                if (lastStep != null) {
                    this.preparations.push(lastStep);
                }

                lastStep = new PreparationStep();
                lastStep.preparation = "";
                lastStep.groupName = $elem.text();
            } else {

                if (lastStep == null) {
                    lastStep = new PreparationStep();
                    lastStep.preparation = "";
                }

                // add preparation step
                lastStep.preparation += $elem.html();
                lastStep.preparation = lastStep.preparation.replace("/bundles/", "http://www.rezeptwelt.de/bundles/")
                
            }
        });

    }

    private loadComments($element: JQuery) {

        const commentSelector = "li.comment";

        $element.find(commentSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let comment = new Comment();

            comment.text = Parser.getHtml($elem, ".content p");

            comment.text = comment.text.replace("/bundles/", "http://www.rezeptwelt.de/bundles/")
            comment.submitted = "Verfasst von " + Parser.getText($elem, ".media-body a:first") + " am " + Parser.getText($elem, "small");

            this.comments.push(comment);
        });
    }

    private loadRecommendations($element: JQuery) {

        const recommendationsSelector = ".recommendations-box li.slick-slide";
        const imageSelector = "img.img-responsive"
        const linkSelector = "a"
        const starSelector = ".rating-stars"

        $element.find(recommendationsSelector).each((index, elem) => {
            let $elem = jQuery(elem);
            let item = new SearchItemModel();

            item.image = Parser.getAttributeValue($elem, imageSelector, "src");
            item.text = Parser.getText($elem, linkSelector);
            item.link = Parser.getAttributeValue($elem, linkSelector, "href");
            let stars = Parser.getAttributeValue($elem, starSelector, "data-average");
            
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
