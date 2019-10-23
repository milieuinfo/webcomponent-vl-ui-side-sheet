import{VlElement,define}from"/node_modules/vl-ui-core/vl-core.js";import{SwipeDetect}from"/node_modules/vl-ui-side-sheet/dist/swipeDetect.js";(()=>{!function(e,t,i){if(!document.head.querySelector("#"+e)){let n=document.createElement("script");n.setAttribute("id",e),n.setAttribute("src",t),n.onload=i,document.head.appendChild(n)}}("util","/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js",()=>{})})();export class VlSidesheet extends VlElement(HTMLElement){static get _observedAttributes(){return["left","enable-swipe"]}constructor(){super(`
        <style> 
        @import "/node_modules/vl-ui-side-sheet/style.css";
        </style>       
        <div id="vl-side-sheet-backdrop"></div>
        <div id="vl-side-sheet">
         <button type="button" class="vl-side-sheet__close">
            <i class="vl-side-sheet__close__icon vl-vi vl-vi-cross" aria-hidden="true"></i>
            <span class="vl-u-visually-hidden">Venster sluiten</span>
         </button>
         <slot></slot>
        </div>
        `)}connectedCallback(){this._closeButton.addEventListener("click",e=>{this.close()})}get _closeButton(){return this._shadow.querySelector(".vl-side-sheet__close")}get _sheetElement(){return this._shadow.querySelector("#vl-side-sheet")}get _backdropElement(){return this._shadow.querySelector("#vl-side-sheet-backdrop")}toggle(){this.isOpen?this.close():this.open()}open(){this._sheetElement.setAttribute("open","");this._backdropElement.setAttribute("open","")}close(){this._sheetElement.removeAttribute("open");this._backdropElement.removeAttribute("open");if(this._onClose){this._onClose()}}onClose(callBack){this._onClose=callBack}get isOpen(){return this._element.hasAttribute("open")}_leftChangedCallback(oldValue,newValue){if(newValue!==undefined){this._sheetElement.setAttribute("data-vl-side-sheet-left","")}else{this._sheetElement.remove("data-vl-side-sheet-left")}}_enable_swipeChangedCallback(oldValue,newValue){const swipeDetect=new SwipeDetect;if(newValue!==undefined){swipeDetect.attach(this._sheetElement,direction=>{const closeDirection=this.hasAttribute("left")?"left":"right";if(direction&&direction===closeDirection){this.close()}})}else{swipeDetect.detach()}}};define("vl-side-sheet",VlSidesheet);