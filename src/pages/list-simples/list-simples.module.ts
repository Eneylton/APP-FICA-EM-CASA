import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSimplesPage } from './list-simples';

@NgModule({
  declarations: [
    ListSimplesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSimplesPage),
  ],
})
export class ListSimplesPageModule {}
