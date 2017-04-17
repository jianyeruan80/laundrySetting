import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { BaseWebAppComponent } from '../app/base-web.component';

beforeEachProviders(() => [BaseWebAppComponent]);

describe('App: BaseWeb', () => {
  it('should create the app',
      inject([BaseWebAppComponent], (app: BaseWebAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'base-web works!\'',
      inject([BaseWebAppComponent], (app: BaseWebAppComponent) => {
    expect(app.title).toEqual('base-web works!');
  }));
});
