import { NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

/**
 * VlTitle
 * @class
 * @classdesc Gebruik de vl-title om titels en subtitels als leidraad voor de gebruiker om door de content te gaan.
 * 
 * @extends NativeVlElement
 * 
 * @property {boolean} sans - Attribuut wordt gebruikt om de font te wijzigen van Flanders Serif naar Flanders Sans.
 * @property {boolean} has-border - Attribuut wordt gebruikt om een subtiele lijn toe te voegen onder de titel.
 * @property {boolean} alt - Attribuut wordt gebruikt voor een alt titel en zal altijd een lijn toevoegen onder de titel.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-titles/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-titles/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-titles.html|Demo}
 */
export class VlTitle extends NativeVlElement(HTMLHeadingElement) {
    static get _observedClassAttributes() {
        return ['sans','has-border','alt'];
    }

    connectedCallback() {
        this.classList.add("vl-title");
        this.classList.add("vl-title--"+this.tagName.toLowerCase());
    }

    get _classPrefix() {
        return 'vl-title--';
    }

    get _stylePath() {
        return '/node_modules/vl-ui-titles/style.css';
    }
}

define('vl-h1', class extends VlTitle{}, {extends:"h1"});
define('vl-h2', class extends VlTitle{}, {extends:"h2"});
define('vl-h3', class extends VlTitle{}, {extends:"h3"});
define('vl-h4', class extends VlTitle{}, {extends:"h4"});
define('vl-h5', class extends VlTitle{}, {extends:"h5"});
define('vl-h6', class extends VlTitle{}, {extends:"h6"});
