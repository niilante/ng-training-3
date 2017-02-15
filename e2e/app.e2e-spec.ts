import { NgTraining3Page } from './app.po';

describe('ng-training3 App', function() {
  let page: NgTraining3Page;

  beforeEach(() => {
    page = new NgTraining3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
