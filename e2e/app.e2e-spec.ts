import { DevTaskManagerPage } from './app.po';

describe('dev-task-manager App', function() {
  let page: DevTaskManagerPage;

  beforeEach(() => {
    page = new DevTaskManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
