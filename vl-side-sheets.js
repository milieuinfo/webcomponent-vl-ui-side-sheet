import{VlElement}from"/node_modules/vl-ui-core/vl-core.js";(()=>{!function(e,t,s){if(!document.head.querySelector("#"+e)){let n=document.createElement("script");n.setAttribute("id",e),n.setAttribute("src",t),n.onload=s,document.head.appendChild(n)}}("util.js","/node_modules/@govflanders/vl-ui-util/dist/js/util.js",()=>{})})();export class VlSideSheets extends VlElement(HTMLElement){constructor(){super(`
        <style> 
        @import "/node_modules/vl-side-sheets/style.css";
        </style>
        <div id="vl-side-sheets">
          <slot></slot>
        </div>
        `)}get _sheetsElement(){return this._element}toggle(){this.isOpen?this.close():this.open()}open(){this._sheetsElement.classList.add("active")}close(){this._sheetsElement.classList.remove("active")}get isOpen(){return this._element.classList.contains("active")}};customElements.define("vl-side-sheets",VlSideSheets);