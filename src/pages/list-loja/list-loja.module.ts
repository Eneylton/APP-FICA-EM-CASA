import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLojaPage } from './list-loja';

@NgModule({
  declarations: [
    ListLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListLojaPage),
  ],
})
export class ListLojaPageModule {}
