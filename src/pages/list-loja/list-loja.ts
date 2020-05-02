import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';

@IonicPage({})
@Component({
  selector: 'page-list-loja',
  templateUrl: 'list-loja.html',
})


export class ListLojaPage {

  log: any;
  url:string ="";
  usuario_id: any;

  limit: number = 10;
  start: number = 0;

  lojas: any = [];
  todos: Array<{ id: any, nome: string, email: string }>;

  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage,
    private serve: ServiceProvider) {

      this.url = serve.basepath;

      this.tabBarElement = document.querySelector('.tabbar');
  
  }

  ionViewDidLoad() {
 
        this.storage.get('session_storage').then((res)=>{

        this.log = res;
        this.usuario_id = this.log.id;
     
      });

    this.tabBarElement.style.display = 'none';
    this.lojas = [];
    this.start = 0;
    this.listarLojas();

  }

  
  openCadLoja(){

    this.navCtrl.push('CadLojaPage');

  }



  openPerfil(){

    this.navCtrl.push('PerfilUsuarioPage');

  }


  openEditar(id,nome,email,tel,whatsapp,facebook,hist,website,cep,endereco,numero,bairro,cidade,estado,foto){
    this.navCtrl.push('EditLojaPage', {
      id:id,
      nome:nome,
      email:email,
      tel:tel,
      whatsapp:whatsapp,
      facebook:facebook,
      hist:hist,
      website:website,
      cep:cep,
      endereco:endereco,
      numero:numero,
      bairro:bairro,
      cidade:cidade,
      estado:estado,    
      foto:foto

    });
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
      this.listarLojas().then(() => {
        event.complete();
      })
    }, 1000);
  }

  listarLojas() {

    return new Promise(resolve => {
      let body = {
        limit: this.limit,
        start: this.start,
        crud: 'listar'
      }

      this.serve.postData(body, '/Loja.php').subscribe(data => {
        for (let i = 0; i < data.result.length; i++) {

          if(this.usuario_id == data.result[i]["usuario_id"]){

          this.lojas.push({
            id: data.result[i]["id"],
            nome: data.result[i]["nome"],
            email: data.result[i]["email"],
            tel: data.result[i]["tel"],
            whatsapp: data.result[i]["whatsapp"],
            facebook: data.result[i]["facebook"],
            hist: data.result[i]["hist"],
            website: data.result[i]["website"],
            cep: data.result[i]["cep"],
            endereco: data.result[i]["endereco"],
            numero: data.result[i]["numero"],
            bairro: data.result[i]["bairro"],
            cidade: data.result[i]["cidade"],
            estado: data.result[i]["estado"],
            data: data.result[i]["data"],
            foto: data.result[i]["foto"]
          });
        }else{
          console.log('chegou aki');
        }
        }

        resolve(true);

        this.todos = this.lojas;

      });
    });
  }

  getlojas(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.lojas = this.todos.filter((item) => {
          return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
            || (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
      this.lojas = this.todos;
    }
  }

  delete(id){
    let body = {
      id: id,
      crud:'deletar'}
   
    this.serve.postData(body, '/Loja.php').subscribe(data =>{
    this.showInsertOk();
    });

  }

  
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Loja Excluida ...',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('ListLojaPage')
          }
        }
      ]
    });
    alert.present();
  }

  

}
