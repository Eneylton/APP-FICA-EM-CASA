import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {

  log: any;
  nome: string;
  email: string;
  avatar: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.nome = this.log.nome;
      this.email = this.log.email;
      this.avatar = this.log.avatar;
    

    });
  }

  selectText(event){
    event.target.Select();
  }

  salvar(){

    let body = {
      nome: this.nome, 
      email: this.email,
      avatar: this.avatar,
      id: this.log.id,
      crud: 'editar_perfil' 
    }

    this.serve.postData(body, '/Login.php').subscribe(data => {
    
      this.log.nome = this.nome;
      this.log.email = this.email;
      this.log.avatar = this.avatar;
      this.storage.set('session_storage', this.log);

      this.navCtrl.push('PerfilUsuarioPage');

      const toast = this.toastyCrtl.create({
        message:'Atualização Realizada !!',
        duration:3000
      });
      toast.present();
      

    });

  }

}


