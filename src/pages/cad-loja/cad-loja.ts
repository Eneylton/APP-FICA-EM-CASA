import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-cad-loja',
  templateUrl: 'cad-loja.html',
})
export class CadLojaPage {

  id:any;
  descricao:string = "";

  log:           any;
  usuario_id:    any;
  nome:          string = "";
  email:         string = "";
  tel:           string = "";
  whatsapp:      string = "";
  facebook:      string = "";
  hist:          string = "";
  website:       string = "";
  endereco:      string = "";
  numero:        string = "";
  bairro:        string = "";
  cidade:        string = "";
  estado:        string = "";
  cep:           string = "";
  lat:           string = "";
  lng:           string = "";
  tipo_loja_id:  string = "";
  foto:          string = "";

  

  empreendimentos: any = [];

  base64Image: string = "";
  cameraData: string;
  url:string =  "";

  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private http: Http,
    private storage: Storage,
    
    private camera: Camera,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {

      this.tabBarElement = document.querySelector('.tabbar');
  }


  ionViewDidLoad() {

    this.tabBarElement.style.display = 'none';

    this.empreendimentos = [];
    
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.usuario_id = this.log.id;
      
    });

    this.listarEmpreedimentos();

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

  checkEmail(){

       let validEmail = false;
       let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
       if(reg.test(this.email)){
        let body = {
          email: this.email,
          crud: 'check_email'
        }

        this.serve.postData(body, '/Loja.php').subscribe(data => {

          for (let i = 0; i < data.result.length; i++) {
             
            if(data.result[i]["email"] == this.email){
              validEmail = false;
  
              this.toastyCrtl.create({
                message: "E-mail já registrado. por favor, verifique.",
                showCloseButton: true
              }).present();

            }
        
        }
       
  
        })
         

       }else {
        validEmail = false;
        this.toastyCrtl.create({
          message: "E-mail inválido. por favor, verifique.",
          showCloseButton: true
        }).present();
        console.log(validEmail);
      }

      

  }

  listarEmpreedimentos(){

    return new Promise(resolve => {
      let body = {
        id: this.id,
        descricao: this.descricao,
        crud: 'listar_emp'
      }

      this.serve.postData(body, '/Loja.php').subscribe(data => {
        for (let i = 0; i < data.result.length; i++) {
            this.empreendimentos.push({
            id: data.result[i]["id"],
            descricao: data.result[i]["descricao"]

            
          });
        }
  
        resolve(true);
  
      });
    });
 
  }



  buscarCep() {
    const cep = this.cep;

    this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
      .map(res => res.json()).subscribe(data => {
       
        this.endereco = data.logradouro;
        this.bairro = data.bairro;
        this.cidade = data.localidade;
        this.estado = data.uf;

        this.buscarEndereco(this.endereco, this.bairro, this.estado);

      });


  }

  buscarEndereco(endereco, bairro, estado) {


    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco},${bairro},${estado}&key=AIzaSyCq_CgXuRNxxwx6v7-1TDd7EXqIXI4p35g`)
      .map(res => res.json())
      .subscribe(data => {


        this.lat = data.results[0].geometry.location.lat;
        this.lng = data.results[0].geometry.location.lng;
     

      });
  }

  cadastrar() {

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

    }else if(this.cameraData === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Adicione uma Foto !!!',
        duration: 3000
      });
      toast.present();

    } else{

      let body = {
        usuario_id: this.usuario_id,
        nome: this.nome,
        email: this.email,
        tel: this.tel,
        whatsapp: this.whatsapp,
        facebook: this.facebook,
        hist: this.hist,
        website: this.website,
        endereco: this.endereco,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        estado: this.estado,
        cep: this.cep,
        lat: this.lat,
        lng: this.lng,
        tipo_loja_id: this.tipo_loja_id,
        foto: this.cameraData,
        crud: 'adicionar'
      }
      this.serve.postData(body, '/Loja.php').subscribe(data => {

        this.enviarEmail();

        this.showInsertOk();
      });

    }

    }

    enviarEmail(){

      let body ={
        nome:this.nome,
        email:this.email,
        crud:'enviar_email'
      }
  
      this.serve.postData(body, 'enviar_email.php').subscribe(data =>{
       
        console.log("Email enviado....");
        
      });
  
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
  
              this.navCtrl.setRoot('ListLojaPage')
            }
          }
        ]
      });
      alert.present();
    }


    

}
