import 'bootstrap';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '',              moduleId: 'home',          name: 'home',      title: 'App designer'},
      { route: 'screens',       moduleId: 'screens/list',  name: 'screens',   title: 'Screens' }
    ]);

    this.router = router;
  }
}