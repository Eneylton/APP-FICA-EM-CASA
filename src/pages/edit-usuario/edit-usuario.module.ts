import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUsuarioPage } from './edit-usuario';

@NgModule({
  declarations: [
    EditUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUsuarioPage),
  ],
})
export class EditUsuarioPageModule {}
