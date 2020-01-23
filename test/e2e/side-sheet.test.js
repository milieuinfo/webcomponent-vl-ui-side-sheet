
const { assert, driver } = require('vl-ui-core').Test;
const VlSideSheetPage = require('./pages/vl-side-sheet.page');

describe('vl-side-sheet', async () => {
    const vlSideSheetPage = new VlSideSheetPage(driver);

    before(() => {
        vlSideSheetPage.load();
    });
});
