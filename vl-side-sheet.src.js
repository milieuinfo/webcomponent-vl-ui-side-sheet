import {VlElement} from '/node_modules/vl-ui-core/vl-core.js';

(() => {
  loadScript('util.js',
      '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
      });

  function loadScript(id, src, onload) {
    if (!document.head.querySelector('#' + id)) {
      let script = document.createElement('script');
      script.setAttribute('id', id);
      script.setAttribute('src', src);
      script.onload = onload;
      document.head.appendChild(script);
    }
  }
})();

/**
 * VlSide-sheet
 * @class
 * @classdesc Side-sheet zijn containers die aan de linker- of rechterrand van het scherm zijn verankerd.
 *
 * @extends VlElement
 *
 * @property {boolean} left - Attribute wordt gebruikt om aan te duiden dat de side-sheet de linkererand van het scherm moet plaatsen.
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
export class VlSidesheet extends VlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['left'];
  }

  constructor() {
    super(`
        <style> 
        @import "../style.css";
        </style>       
        <div id="vl-side-sheet-backdrop"></div>
        <div id="vl-side-sheet">
         <button type="button" class="vl-side-sheet__close">
            <i class="vl-side-sheet__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
            <span class="vl-u-visually-hidden">Venster sluiten</span>
         </button>
         <slot></slot>
        </div>
        `);
  }

  connectedCallback() {
    this._closeButton.addEventListener("click", (e) => {
      this.close();
    });
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

  /*
   *Toggle
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  /*
   *Handmatig open de side-sheet
   */
  open() {
    this._sheetElement.setAttribute('open', '');
    this._backdropElement.setAttribute('open', '');
  }

  /*
   *Handmatig sluiten de side-sheet
   */
  close() {
    this._sheetElement.removeAttribute('open');
    this._backdropElement.removeAttribute('open');
  }

  get isOpen() {
    return this._element.hasAttribute('open');
  }

  _leftChangedCallback(oldValue, newValue) {
    if (newValue !== undefined) {
      this._sheetElement.setAttribute('data-vl-side-sheet-left', '')
    } else {
      this._sheetElement.remove('data-vl-side-sheet-left');
    }
  }
}

customElements.define('vl-side-sheet', VlSidesheet);
