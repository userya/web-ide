import { WebIdePage } from './app.po';

describe('web-ide App', () => {
  let page: WebIdePage;

  beforeEach(() => {
    page = new WebIdePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
