import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLojaPage } from './edit-loja';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EditLojaPage
  ],
  imports: [
    BrMaskerModule, 
    IonicPageModule.forChild(EditLojaPage),
  ],
})
export class EditLojaPageModule {}
