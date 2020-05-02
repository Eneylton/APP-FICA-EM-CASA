import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: string;
  senha: string;


  constructor(public navCtrl: NavController,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }



  ionViewDidLoad() {
    
  }

  openLogin() {

    if (this.login != "" && this.senha != "") {
      
      let body = {
        login: this.login,
        senha: this.senha,
        crud: 'acessar'
      }

      this.serve.postData(body, '/Login.php').subscribe(data => {

        var alertperson = data.msg;

        if(data.success){

          this.storage.set('session_storage', data.result);
          this.navCtrl.setRoot('TabsPage');
          const toast = this.toastyCrtl.create({
            message:'Login Efetuado com Sucesso !!',
            duration:3000
          });
          toast.present();

        }else{

          const toast = this.toastyCrtl.create({
            message: alertperson,
            duration:3000
          });
          toast.present();

        }
      
      });
    
    }else{

      const toast = this.toastyCrtl.create({
        message: 'Você Pricesa Preecher os Campos acima',  
        duration:3000
        });
        toast.present();


    }

  }

  openRegistrarUsuario() {

    this.navCtrl.push('CadUsuarioPage');
  }  

}
