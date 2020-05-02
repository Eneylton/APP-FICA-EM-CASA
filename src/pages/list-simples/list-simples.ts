import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage({})
@Component({
  selector: 'page-list-simples',
  templateUrl: 'list-simples.html',
})
export class ListSimplesPage {

  nome: string = "";
  endereco: string = "";

  listar: any = [{
    nome: 'Enylton Barros',
    endereco: 'Rua 03 Qd.05 Casa 36 Cohatarc IV'
  },
  {
    nome: 'Isabely Barros',
    endereco: 'Rua 33 Cohab'

  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.exibirLista();
  }

  // exibirLista(){

  //   for(let i = 0; i < this.listar.length; i++){

  //     this.nome = this.listar[i]["nome"];
  //     this.endereco = this.listar[i]["endereco"];

  //   }

  // }

}
