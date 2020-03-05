by.addLocator('css_sr', (cssSelector, opt_parentElement, opt_rootSelector) => {
  let selectors = cssSelector.split('::sr');
  if (selectors.length === 0) {
      return [];
  }

  let shadowDomInUse = (document.head.createShadowRoot || document.head.attachShadow);
  let getShadowRoot  = (el) => ((el && shadowDomInUse) ? el.shadowRoot : el);
  let findAllMatches = (selector, targets, firstTry) => {
      let using, i, matches = [];
      for (i = 0; i < targets.length; ++i) {
          using = (firstTry) ? targets[i] : getShadowRoot(targets[i]);
          if (using) {
              if (selector === '') {
                  matches.push(using);
              } else {
                  Array.prototype.push.apply(matches, using.querySelectorAll(selector));
              }
          }
      }
      return matches;
  };

  let matches = findAllMatches(selectors.shift().trim(), [opt_parentElement || document], true);
  while (selectors.length > 0 && matches.length > 0) {
      matches = findAllMatches(selectors.shift().trim(), matches, false);
  }
  return matches;
});
// spec.js
describe("Protractor Demo App", () => {
  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  it("should add one and two", () => {
    browser.get("http://localhost:8081/event/60165");

    // const app = $("app-page");
    // const pages = element(by.shadow$("iron-pages", app));
    // const eventPage = pages.$("#eventPage");
    // const header = element(by.shadow$("app-header", eventPage));
    // const button = element(by.shadow$("header app-button", header));

    const loginButton = element(by.css_sr("app-page::sr #eventPage::sr app-header::sr header app-button"));
    loginButton.click();
    
    const form = element(by.css_sr("app-page::sr #eventPage::sr app-header::sr #authDialogManager::sr #signinDialog::sr #form"));
    const emailInput = form.element(by.css_sr("::sr #email::sr #input input[type=email]"));
    emailInput.sendKeys('ticketautomation2019@gmail.com');
    const passInput = form.element(by.css_sr("::sr #password::sr #input input[type=password]"));
    passInput.sendKeys('automation@123')
    const submitBtn = form.element(by.css_sr("::sr #submitButton"));
    submitBtn.click();
    browser.sleep(3000)
  });
});



document.querySelector("body > app-page").shadowRoot.querySelector("#eventPage").shadowRoot.querySelector("app-header").shadowRoot.querySelector("#authDialogManager").shadowRoot.querySelector("#signinDialog").shadowRoot.querySelector("#form").shadowRoot.querySelector("#password").shadowRoot.querySelector("#input")