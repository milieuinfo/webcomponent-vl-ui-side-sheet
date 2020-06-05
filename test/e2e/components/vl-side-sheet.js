const {VlElement} = require('vl-ui-core').Test;
const {By} = require('selenium-webdriver');

class VlSideSheet extends VlElement {
  async _getCloseButton() {
    return this.shadowRoot.findElement(By.css('button.vl-side-sheet__close'));
  }

  async isOpen() {
    return this.shadowRoot.hasAttribute('open');
  }

  async isLeft() {
    return this.hasAttribute('left');
  }

  async isSwipeEnabled() {
    return this.hasAttribute('enable-swipe');
  }

  async close() {
    const closeButton = await this._getCloseButton();
    return closeButton.click();
  }

  async getContentSlotNodes() {
    const contentSlot = await this._getContentSlot();
    return this.getAssignedElements(contentSlot);
  }

  async _getContentSlot() {
    return this.shadowRoot.findElement(By.css('#vl-side-sheet slot'));
  }
}

module.exports = VlSideSheet;
