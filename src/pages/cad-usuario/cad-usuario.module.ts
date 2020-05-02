import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadUsuarioPage } from './cad-usuario';

@NgModule({
  declarations: [
    CadUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CadUsuarioPage),
  ],
})
export class CadUsuarioPageModule {}
