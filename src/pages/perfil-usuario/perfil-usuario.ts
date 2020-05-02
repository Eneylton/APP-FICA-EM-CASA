import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {

  log:any;
  membros:any;

  id:        number;
  nome:      string ="";
  email:     string ="";
  tipo:      string ="";
  avatar:    string ="";
  login:     string ="";
  senha:     string ="";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    private appCtrol:  App,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }
  ionViewWillEnter(){

    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.load();
    

    });

  }

  load(){
    let body ={
      id:this.log.id,
      senha:this.log.senha,
      crud:'perfil'
    }

    this.serve.postData(body, '/Login.php').subscribe(data => {
    
      this.membros = data.profiles;
      this.nome = data.profiles["nome"];
      this.email = data.profiles["email"];
      this.tipo = data.profiles["tipo"];
      this.avatar = data.profiles["avatar"];
      

    });

  }

  openEditarPerfil(){
    this.navCtrl.push('EditPerfilPage');
  }

  logaout(){
    this.storage.clear();
    this.appCtrol.getRootNav().setRoot('LoginPage');

    const toast = this.toastyCrtl.create({
      message:'Você Encerrou sua sessão !!',
      duration:3000
    });
    toast.present();

  }

}
