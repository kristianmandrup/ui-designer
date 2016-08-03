import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

@inject(Router)
export class ScreenList {
  router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: 'screens/:id',   moduleId: 'screen/editor', name:'screen',     title: 'Screen' }
    ]);

    this.router = router;
  }
}