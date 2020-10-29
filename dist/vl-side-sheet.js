import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-grid/dist/vl-grid.js';
import '/node_modules/vl-ui-button/dist/vl-button.js';
import '/node_modules/vl-ui-icon/dist/vl-icon.js';
import swipeDetect from '/node_modules/swipe-detect/dist/index.js';

/**
 * VlSideSheet
 * @class
 * @classdesc SideSheet zijn containers die aan de linker- of rechterrand van het scherm zijn verankerd.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-enable-swipe - Attribute wordt gebruikt om aan te duiden dat swipe functie toegelaten is.
 * @property {boolean} data-vl-left - Attribute wordt gebruikt om aan te duiden dat de side-sheet de linkererand van het scherm moet plaatsen.
 * @property {boolean} data-vl-absolute - Attribute wordt gebruikt om aan te duiden dat de side-sheet absoluut gepositioneerd wordt.
 * @property {boolean} data-vl-right - Attribute wordt gebruikt om aan te duiden dat de side-sheet de rechterkant van het scherm moet plaatsen.
 *
 * @example Breedte van de side sheet aanpassen(op grote scherm):
 *  static get styles() {
    return [
      css`
        :host {
         --vl-side-sheet-width: 480px;
         }
      `
    ];
  }
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-side-sheet/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-side-sheet/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-side-sheet.html|Demo}
 *
 */
export class VlSideSheet extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['enable-swipe'];
  }

  static get _observedClassAttributes() {
    return ['left', 'right', 'absolute'];
  }

  constructor() {
    super(`
      <style> 
        @import '/node_modules/vl-ui-side-sheet/dist/style.css';
        @import '/node_modules/vl-ui-grid/dist/style.css';
        @import '/node_modules/vl-ui-button/dist/style.css';
        @import '/node_modules/vl-ui-icon/dist/style.css';
      </style>  
      <div id="vl-side-sheet-backdrop"></div>
      <button is="vl-button" type="button" class="vl-side-sheet__toggle" data-vl-icon>
        <span is="vl-icon" data-vl-icon="nav-left"></span>
        <span class="vl-u-visually-hidden">Venster sluiten</span>
      </button>
      <div id="vl-side-sheet">
        <section is="vl-region">
          <div is="vl-layout">
            <slot></slot>
          </div>
        </section>
      </div>
    `);
  }

  connectedCallback() {
    this._toggleButton.addEventListener('click', () => this.toggle());
  }

  get isOpen() {
    return this.hasAttribute('open');
  }

  get isLeft() {
    return this.hasAttribute('left');
  }

  get _classPrefix() {
    return 'vl-side-sheet--';
  }

  get _toggleButton() {
    return this._shadow.querySelector('.vl-side-sheet__toggle');
  }

  get _toggleButtonIcon() {
    return this._toggleButton.querySelector('[is="vl-icon"]');
  }

  get _sheetElement() {
    return this._shadow.querySelector('#vl-side-sheet');
  }

  get _regionElement() {
    return this._sheetElement.querySelector('[is="vl-region"]');
  }

  get _backdropElement() {
    return this._shadow.querySelector('#vl-side-sheet-backdrop');
  }

  get _slotElement() {
    return this._shadow.querySelector('slot');
  }

  /**
   * Triggert een toggle van de side-sheet zonder te klikken op de side-sheet.
   *
   * @Return {void}
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * Handmatig openen van de side-sheet
   *
   * @Return {void}
   */
  open() {
    this.setAttribute('data-vl-open', '');
    this._toggleButtonIcon.setAttribute('data-vl-icon', this.isLeft ? 'nav-left' : 'nav-right');
  }

  /**
   * Handmatig sluiten van de side-sheet
   *
   * @Return {void}
   */
  close() {
    this.removeAttribute('data-vl-open');
    this._toggleButtonIcon.setAttribute('data-vl-icon', this.isLeft ? 'nav-right' : 'nav-left');
    if (this._onClose) {
      this._onClose();
    }
  }

  /**
   * De callback wordt uitgevoerd direct na de afsluiten van een side sheet.
   *
   * @param {function} callback
   */
  onClose(callback) {
    this._onClose = callback;
  }

  _enableSwipeChangedCallback(oldValue, newValue) {
    if (newValue !== undefined) {
      swipeDetect(this._sheetElement, (direction) => {
        if ((this.isLeft && direction === 'left') || (!this.isLeft && direction === 'right')) {
          this.close();
        }
      }, 50);
    } else {
      swipeDetect.disable();
    }
  }

  _absoluteChangedCallback(oldValue, newValue) {
    if (newValue != undefined && this._regionElement) {
      this._sheetElement.append(this._slotElement);
      this._regionElement.remove();
    }
  }

  _leftChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._toggleButtonIcon.setAttribute('data-vl-icon', 'nav-right');
    } else {
      this._toggleButtonIcon.setAttribute('data-vl-icon', 'nav-left');
    }
  }
}

define('vl-side-sheet', VlSideSheet);
