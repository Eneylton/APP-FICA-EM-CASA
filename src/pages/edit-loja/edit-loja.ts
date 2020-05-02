import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/Storage';
import { Http } from '@angular/http';



@IonicPage({})
@Component({
  selector: 'page-edit-loja',
  templateUrl: 'edit-loja.html',
})

export class EditLojaPage {

  log: any;
  usuario_id: any;
  id: any;
  nome: string = "";
  email: string = "";
  tel: string = "";
  whatsapp: string = "";
  facebook: string = "";
  hist: string = "";
  website: string = "";
  endereco: string = "";
  numero: string = "";
  bairro: string = "";
  cidade: string = "";
  estado: string = "";
  cep: string = "";
  foto: string = "";
  url: string = "";

  foto1:string ="";
  foto2:string ="";

  base64Image: string = "";
  cameraData: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private http: Http,
    private storage: Storage,
    private camera: Camera,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {

    this.url = serve.basepath;

  }
  ionViewDidLoad() {

    this.id         = this.navParams.get("id");
    this.nome       = this.navParams.get("nome");
    this.email      = this.navParams.get("email");
    this.tel        = this.navParams.get("tel");
    this.whatsapp   = this.navParams.get("whatsapp");
    this.facebook   = this.navParams.get("facebook");
    this.hist       = this.navParams.get("hist");
    this.website    = this.navParams.get("website");
    this.cep        = this.navParams.get("cep");
    this.endereco   = this.navParams.get("endereco");
    this.numero     = this.navParams.get("numero");
    this.bairro     = this.navParams.get("bairro");
    this.cidade     = this.navParams.get("cidade");
    this.estado     = this.navParams.get("estado");
    this.foto       = this.navParams.get("foto");

    console.log(this.cidade);
    
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.usuario_id = this.log.id;
      
    });

  
}

presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Abrir Midia',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.abrirCamrera();
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.abrirGaleria();
        }

      }
    ]
  });
  actionSheet.present();
}


abrirCamrera() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:  1000,
    targetHeight: 800,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}

abrirGaleria() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth: 1000,
    targetHeight: 800,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}


buscarCep() {
  const cep = this.cep;

  this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .map(res => res.json()).subscribe(data => {
      console.log(data);
      this.endereco = data.logradouro;
      this.bairro = data.bairro;
      this.cidade = data.localidade;
      this.estado = data.uf;
    });


}

editar() {

  if (this.nome == "") {

    const toast = this.toastyCrtl.create({
      message: 'O campo Nome da Loja é Obrigatório',
      duration: 3000
    });
    toast.present();


  } else if (this.email == "") {

    const toast = this.toastyCrtl.create({
      message: 'O campo Email é Obrigatório',
      duration: 3000
    });
    toast.present();

  }  else if (this.tel == "") {

    const toast = this.toastyCrtl.create({
      message: 'Você precisa adicionar um Nº de telefone !!!',
      duration: 3000
    });
    toast.present();

  }else{
    if(this.cameraData ===undefined){
      this.foto1 = 'null';
    }else{

     this.foto2 = this.cameraData;
    }

    let body = {
      id:this.id,
      usuario_id: this.usuario_id,
      nome: this.nome,
      email: this.email,
      tel: this.tel,
      whatsapp: this.whatsapp,
      facebook: this.facebook,
      hist: this.hist,
      website: this.website,
      cep: this.cep,
      endereco: this.endereco,
      numero: this.numero,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
      foto: this.cameraData,
      foto1: this.foto1,
      crud: 'editar'
    }
    this.serve.postData(body, '/Loja.php').subscribe(data => {

      this.showInsertOk();
    });

  }

  }

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Seu Cadastro foi Atualizado....',
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



