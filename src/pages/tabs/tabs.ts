import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'Menu';
  tab2Root = 'ListSimplesPage';
  tab3Root = 'ListUsuarioPage';
 

  constructor() {

  }
}
