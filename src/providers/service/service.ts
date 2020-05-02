import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class ServiceProvider {

  basepath = "/php/";

  constructor(public http: Http, private platform: Platform) {
    if(this.platform.is("cordova")){
      this.basepath = 'http://192.168.100.19/Servidor-Fique-Casa/';
    }
  }

  postData(body,file){
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type});
    let options = new RequestOptions({ headers:headers});

    return this.http.post(this.basepath + file,
           JSON.stringify(body),options).map(res => res.json());
  }

}
