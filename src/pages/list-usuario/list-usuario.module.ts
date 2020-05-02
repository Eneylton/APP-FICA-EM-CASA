import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUsuarioPage } from './list-usuario';

@NgModule({
  declarations: [
    ListUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUsuarioPage),
  ],
})
export class ListUsuarioPageModule {}
