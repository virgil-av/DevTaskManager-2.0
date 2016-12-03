import { DevTasksManagerPage } from './app.po';

describe('dev-tasks-manager App', function() {
  let page: DevTasksManagerPage;

  beforeEach(() => {
    page = new DevTasksManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
