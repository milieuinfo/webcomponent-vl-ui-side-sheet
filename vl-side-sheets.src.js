import {VlElement} from '/node_modules/vl-ui-core/vl-core.js';

(() => {
  loadScript('util.js',
      '/node_modules/@govflanders/vl-ui-util/dist/js/util.js', () => {
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
 * VlSide-sheets
 * @class
 * @classdesc
 *
 * @extends VlElement
 *
 * @property
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-side-sheets/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-side-sheets/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-side-sheets.html|Demo}
 *
 */
export class VlSideSheets extends VlElement(HTMLElement) {
  constructor() {
    super(`
        <style> 
        @import "../style.css";
        </style>       
        <div id="vl-side-sheets-backdrop"></div>
        <div id="vl-side-sheets">
         <button type="button" class="vl-side-sheets__close">
            <i class="vl-side-sheets__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
            <span class="vl-u-visually-hidden">Venster sluiten</span>
          </button>
          <slot></slot>
        </div>
        `);
  }

  connectedCallback(){
    this._closeButton.addEventListener("click",(e)=>{
      this.close();
    });
  }

  get _closeButton() {
    return this._shadow.querySelector('.vl-side-sheets__close');
  }

  get _sheetsElement() {
    return this._shadow.querySelector('#vl-side-sheets');
  }

  get _backdropElement() {
    return this._shadow.querySelector('#vl-side-sheets-backdrop');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this._sheetsElement.setAttribute('open', '');
    this._backdropElement.setAttribute('open', '');
  }

  close() {
    this._sheetsElement.removeAttribute('open');
    this._backdropElement.removeAttribute('open');
  }

  get isOpen() {
    return this._element.hasAttribute('open');
  }
}

customElements.define('vl-side-sheets', VlSideSheets);
