const VlSideSheet = require('../components/vl-side-sheet');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlSideSheetPage extends Page {
    async _getSideSheet(selector) {
        return new VlSideSheet(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-side-sheet.html');
    }
}

module.exports = VlSideSheetPage;
