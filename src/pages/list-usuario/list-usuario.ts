import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';

@IonicPage({})
@Component({
  selector: 'page-list-usuario',
  templateUrl: 'list-usuario.html',
})
export class ListUsuarioPage {

  log:any;
  usuario_id:any;

  limit: number = 10;
  start: number = 0;

  usuarios: any = [];
  todos: Array<{id:any, nome: string, email: string, telefone: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage,
    public serve: ServiceProvider) {
}

ionViewDidLoad() {
  this.storage.get('session_storage').then((res)=>{

    this.log = res;
    this.usuario_id = this.log.id;
 
  });

  this.usuarios = [];
  this.start = 0;
  this.listarUsuario();
}

openRegistrarUsuario(){

  this.navCtrl.push('CadUsuarioPage');
}

openPerfilUsuario(){
  this.navCtrl.push('PerfilUsuarioPage');
}

openEditar(id, nome, email, tipo, avatar, login, senha){

  this.navCtrl.push('EditUsuarioPage', {
    id:          id,
    nome:        nome,
    email:       email,
    tipo:        tipo,
    avatar:      avatar,
    login:       login,
    senha:       senha

  })

}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarUsuario().then(() => {
      event.complete();
    })
  }, 1000);
}


listarUsuario() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar'
    };
    this.serve.postData(body, '/Login.php').subscribe(data => {
      for (let i = 0; i < data.result.length; i++) {

        if(this.usuario_id == data.result[i]["id"]){

        this.usuarios.push({
          id:      data.result[i]["id"],
          nome:    data.result[i]["nome"],
          email:   data.result[i]["email"],
          tipo:    data.result[i]["tipo"],
          avatar:  data.result[i]["avatar"],
          login:   data.result[i]["login"],
          senha:   data.result[i]["senha"],
        });

      }

      }

      resolve(true);

      this.todos = this.usuarios;

    });
  });
}

getUsuarios(ev: any) {
  
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.usuarios = this.todos.filter((user) => {
      return (user.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
             || (user.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.usuarios = this.todos;
  }
}


delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, '/Login.php').subscribe(data =>{
    this.showInsertOk();
  });

}

openDetalhe(id, nome, email, tipo,avatar, login, senha){

  this.navCtrl.push('RegistroDetalhePage', {
    id:          id,
    nome:        nome,
    email:       email,
    tipo:        tipo,
    avatar:      avatar,
    login:       login,
    senha:       senha

  })

}





showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('ListUsuarioPage')
        }
      }
    ]
  });
  alert.present();
}

}

