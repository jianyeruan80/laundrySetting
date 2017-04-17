import { A2WebPage } from './app.po';

describe('a2-web App', () => {
  let page: A2WebPage;

  beforeEach(() => {
    page = new A2WebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
