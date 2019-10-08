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
export class VlSideSheets extends VlElement(HTMLElement){
  constructor() {
    super(`
        <style> 
        @import "../style.css";
        </style>
        <div id="vl-side-sheets">
          <slot></slot>
        </div>
        `);
  }

  get _sheetsElement() {
    return this._element;
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this._sheetsElement.classList.add('active');
  }

  close() {
    this._sheetsElement.classList.remove('active');
  }

  get isOpen() {
    return this._element.classList.contains('active');
  }
}

customElements.define('vl-side-sheets', VlSideSheets);
