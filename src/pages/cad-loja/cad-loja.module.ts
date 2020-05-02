import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadLojaPage } from './cad-loja';
import { BrMaskerModule } from 'brmasker-ionic-3';


@NgModule({
  declarations: [
    CadLojaPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(CadLojaPage),
  ],
})
export class CadLojaPageModule {}
