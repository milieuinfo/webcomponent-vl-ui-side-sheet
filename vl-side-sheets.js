import{VlElement}from"/node_modules/vl-ui-core/vl-core.js";(()=>{!function(e,t,n){if(!document.head.querySelector("#"+e)){let s=document.createElement("script");s.setAttribute("id",e),s.setAttribute("src",t),s.onload=n,document.head.appendChild(s)}}("util.js","/node_modules/@govflanders/vl-ui-util/dist/js/util.js",()=>{})})();export class VlSideSheets extends VlElement(HTMLElement){constructor(){super(`
        <style> 
        @import "/node_modules/vl-ui-side-sheets/style.css";
        </style>       
        <div id="vl-side-sheets-backdrop"></div>
        <div id="vl-side-sheets">
         <button type="button" class="vl-side-sheets__close">
            <i class="vl-side-sheets__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
            <span class="vl-u-visually-hidden">Venster sluiten</span>
          </button>
          <slot></slot>
        </div>
        `)}connectedCallback(){this._closeButton.addEventListener("click",e=>{this.close()})}get _closeButton(){return this._shadow.querySelector(".vl-side-sheets__close")}get _sheetsElement(){return this._shadow.querySelector("#vl-side-sheets")}get _backdropElement(){return this._shadow.querySelector("#vl-side-sheets-backdrop")}toggle(){this.isOpen?this.close():this.open()}open(){this._sheetsElement.setAttribute("open","");this._backdropElement.setAttribute("open","")}close(){this._sheetsElement.removeAttribute("open");this._backdropElement.removeAttribute("open")}get isOpen(){return this._element.hasAttribute("open")}};customElements.define("vl-side-sheets",VlSideSheets);