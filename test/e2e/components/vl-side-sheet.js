const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlSideSheet extends VlElement {
  async isOpen() {
    return this.hasAttribute('data-vl-open');
  }

  async isLeft() {
    return this.hasAttribute('data-vl-left');
  }

  async isSwipeEnabled() {
    return this.hasAttribute('data-vl-enable-swipe');
  }

  async open() {
    const isOpen = await this.isOpen();
    if (!isOpen) {
      const toggleButton = await this._getToggleButton();
      return toggleButton.click();
    }
  }

  async close() {
    const isOpen = await this.isOpen();
    if (isOpen) {
      const html = await this.shadowRoot.getInnerHTML();
      console.log(html);
      const toggleButton = await this._getToggleButton();
      return toggleButton.click();
    }
  }

  async getContentSlotNodes() {
    const contentSlot = await this._getContentSlot();
    return this.getAssignedElements(contentSlot);
  }

  async _getContentSlot() {
    return this.shadowRoot.findElement(By.css('#vl-side-sheet slot'));
  }

  async _getToggleButton() {
    return this.shadowRoot.findElement(By.css('.vl-side-sheet__toggle'));
  }
}

module.exports = VlSideSheet;
