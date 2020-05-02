import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
  @ViewChild('content') childNavCtrl: NavController;
  homePage: any = 'HomePage';

  log:any;
  membros:any;
  nome:      string ="";
  email:     string ="";
  avatar:    string ="";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    private appCtrol:  App,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
    this.homePage = 'HomePage';
   
  }

  ionViewDidLoad() {


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
      this.avatar = data.profiles["avatar"];
      

    });

  }

  openRegistrarLoja(){

    this.navCtrl.push('CadLojaPage');
  }

  openListLoja(){
    this.navCtrl.push('ListLojaPage');
  }

  openCatalogo(){
    this.navCtrl.push('CatalogoPage');
  }

 
  openPerfil(){
    this.navCtrl.push('PerfilUsuarioPage');
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
