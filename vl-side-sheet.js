import{VlElement,define}from"/node_modules/vl-ui-core/vl-core.js";import swipeDetect from"/node_modules/swipe-detect/dist/index.js";export class VlSidesheet extends VlElement(HTMLElement){static get _observedAttributes(){return["left","right","enable-swipe"]}constructor(){super(`
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
    `)}connectedCallback(){this._closeButton.addEventListener("click",()=>this.close())}get isOpen(){return this._element.hasAttribute("open")}get isLeft(){return this.hasAttribute("left")}get _closeButton(){return this._shadow.querySelector(".vl-side-sheet__close")}get _sheetElement(){return this._shadow.querySelector("#vl-side-sheet")}get _backdropElement(){return this._shadow.querySelector("#vl-side-sheet-backdrop")}toggle(){this.isOpen?this.close():this.open()}open(){this._sheetElement.setAttribute("open","");this._backdropElement.setAttribute("open","")}close(){this._sheetElement.removeAttribute("open");this._backdropElement.removeAttribute("open");if(this._onClose){this._onClose()}}onClose(callback){this._onClose=callback}_leftChangedCallback(oldValue,newValue){if(newValue!==undefined){this._sheetElement.classList.add("vl-side-sheet--left")}else{this._sheetElement.classList.remove("vl-side-sheet--left")}}_enable_swipeChangedCallback(oldValue,newValue){if(newValue!==undefined){swipeDetect(this._sheetElement,direction=>{if(this.isLeft&&direction==="left"||!this.isLeft&&direction==="right"){this.close()}},50)}else{swipeDetect.disable()}}};define("vl-side-sheet",VlSidesheet);