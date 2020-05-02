import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-edit-usuario',
  templateUrl: 'edit-usuario.html',
})
export class EditUsuarioPage {

  id: number;
  nome: string = "";
  email: string = "";
  tipo: string = "";
  avatar: string = "";
  login: string = "";
  senha: string = "";
  confirma: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {

  }


  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
    this.tipo = this.navParams.get('tipo');
    this.email = this.navParams.get('email');
    this.avatar = this.navParams.get('avatar');
    this.login = this.navParams.get('login');

  }

  editar() {

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
        id: this.id,
        nome: this.nome,
        email: this.email,
        tipo: this.tipo,
        avatar: this.avatar,
        login: this.login,
        senha: this.senha,
        crud: 'editar'
      }

      this.serve.postData(body, '/Login.php').subscribe(data => {

        this.showInsertOk();

      });
    }

  }


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Registro foi Atualizado',
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
