import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-grid/dist/vl-grid.js';
import swipeDetect from '/node_modules/swipe-detect/dist/index.js';

/**
 * VlSideSheet
 * @class
 * @classdesc SideSheet zijn containers die aan de linker- of rechterrand van het scherm zijn verankerd.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-left - Attribute wordt gebruikt om aan te duiden dat de side-sheet de linkererand van het scherm moet plaatsen.
 * @property {boolean} data-vl-right - Attribute wordt gebruikt om aan te duiden dat de side-sheet de rechterkant van het scherm moet plaatsen.
 * @property {boolean} data-vl-enable-swipe - Attribute wordt gebruikt om aan te duiden dat swipe functie toegelaten is.
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
    return ['left', 'right', 'enable-swipe'];
  }

  constructor() {
    super(`
      <style> 
        @import '/node_modules/vl-ui-side-sheet/dist/style.css';
        @import '/node_modules/vl-ui-grid/dist/style.css';
      </style>  
      <div id="vl-side-sheet-backdrop"></div>
      <div id="vl-side-sheet">
        <section is="vl-region">
          <div is="vl-layout">
            <slot></slot>
          </div>
        </section>
        <button type="button" class="vl-side-sheet__close">
          <i class="vl-side-sheet__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
          <span class="vl-u-visually-hidden">Venster sluiten</span>
        </button>
      </div>
    `);
  }

  connectedCallback() {
    this._closeButton.addEventListener('click', () => this.close());
  }

  get isOpen() {
    return this._element.hasAttribute('open');
  }

  get isLeft() {
    return this.hasAttribute('left');
  }

  get _closeButton() {
    return this._shadow.querySelector('.vl-side-sheet__close');
  }

  get _sheetElement() {
    return this._shadow.querySelector('#vl-side-sheet');
  }

  get _backdropElement() {
    return this._shadow.querySelector('#vl-side-sheet-backdrop');
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
    this._sheetElement.setAttribute('open', '');
    this._backdropElement.setAttribute('open', '');
  }

  /**
   * Handmatig sluiten van de side-sheet
   *
   * @Return {void}
   */
  close() {
    this._sheetElement.removeAttribute('open');
    this._backdropElement.removeAttribute('open');
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

  _leftChangedCallback(oldValue, newValue) {
    if (newValue !== undefined) {
      this._sheetElement.classList.add('vl-side-sheet--left');
    } else {
      this._sheetElement.classList.remove('vl-side-sheet--left');
    }
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
}

define('vl-side-sheet', VlSideSheet);
