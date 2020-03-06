// TODO support combination selectors
// TODO support non shadowDom elements in middle

by.addLocator('css_sr', (cssSelector, opt_parentElement) => {
  
  const findElements = ([selector, ...tailSelector], [firstParent, ...tailParent]) => {
    if (selector) {
      if (firstParent) {
        const node = firstParent.shadowRoot || firstParent;
        const foundElements = Array.from(node.querySelectorAll(selector));
        if (foundElements.length) {
          return findElements(tailSelector, foundElements);
        } else {
          if(!tailParent.length) throw new Error(`${selector}, ${firstParent.id}`)
          return findElements(selector, tailParent);
        }  
      }
    }
  
    return firstParent;
  };

  const selectors = cssSelector.split(/[ ]+/);
  const foundElement = findElements(selectors, [opt_parentElement || document]);

  if (foundElement && foundElement !== document) {
    return foundElement;
  }
});


// spec.js
describe("Protractor Demo App", () => {
  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  it("should add one and two", () => {
    browser.get("https://9-web.wh.bileto.sympla.com.br/event/60165");

    const loginButton = element(by.css_sr("app-page #eventPage app-header header app-button"));
    // loginButton.click();
    browser.executeScript("arguments[0].click();", loginButton.getWebElement());
    
    const form = element(by.css_sr("app-page #eventPage app-header #authDialogManager #signinDialog #form"));
    const emailInput = form.element(by.css_sr("#email input[type=email]"));
    emailInput.sendKeys('ticketautomation2019@gmail.com');
    const passInput = form.element(by.css_sr("#password input[type=password]"));
    passInput.sendKeys('automation@123')
    const submitBtn = form.element(by.css_sr("#submitButton"));
    // submitBtn.click();
    browser.executeScript("arguments[0].click();", submitBtn.getWebElement());
    browser.sleep(3000)
  });
});
