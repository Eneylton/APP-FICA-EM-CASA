import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-cad-usuario',
  templateUrl: 'cad-usuario.html',
})
export class CadUsuarioPage {

  nome: string = "";
  email: string = "";
  avatar: string = "";
  tipo: string = "";
  login: string = "";
  senha: string = "";
  confirma: string = "";
  tabBarElement: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {

      this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    console.log('ionViewDidLoad CadUsuarioPage');
  }

  cadastrar() {

    if (this.nome == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo nome é Obrigatório',
        duration: 3000
      });
      toast.present();


    } else if (this.email == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo Email é Obrigatório',
        duration: 3000
      });
      toast.present();

    } else if (this.avatar == "") {

      const toast = this.toastyCrtl.create({
        message: 'Selecione um avatar',
        duration: 3000
      });
      toast.present();


    } else if (this.tipo == "") {

      const toast = this.toastyCrtl.create({
        message: 'O Campo Tipo é Obrigatório',
        duration: 3000
      });
      toast.present();

    } else if (this.senha == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo Senha é Obrigatório',
        duration: 3000
      });
      toast.present();

    } else if (this.senha != this.confirma) {

      const toast = this.toastyCrtl.create({
        message: 'A senha que você Digitou está diferente !',
        duration: 3000
      });
      toast.present();

    } else {

      let body = {

        nome: this.nome,
        email: this.email,
        avatar: this.avatar,
        tipo: this.tipo,
        login: this.login,
        senha: this.senha,
        crud: 'adicionar'
      }

      this.serve.postData(body, '/Login.php').subscribe(data => {

        this.showInsertOk();
      });

    }

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('LoginPage')
          }
        }
      ]
    });
    alert.present();
  }
}
