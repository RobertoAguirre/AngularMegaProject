import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment, SERVER_URL, DB_INSTANCE } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }

  public pruebaGet() {
    try {
      return this.http.get(SERVER_URL + 'pruebaget');
    } catch (ex) {
      console.log(ex);
      return ex;
    }

  }

  public pruebaGetProtegido(tkn) {


    this.httpOptions.headers = this.httpOptions.headers.set('access-token', 'Bearer ' + tkn);

    try {
      return this.http.get(SERVER_URL + 'pruebagetProtegida', this.httpOptions);
    } catch (ex) {
      console.log(ex);
      return ex;
    }

  }

  public ejecuta(data) {
    return this.http.post(SERVER_URL + 'EjecutaConsulta/', data);
  }

  public server() {
    return DB_INSTANCE
  }

  //trae token
  public autentifica(data) {

    return this.http.post(SERVER_URL + 'autentificar/', data);

  }

  //Alta Usuario
  public registra(data) {

    return this.http.post(SERVER_URL + 'registrar/', data);

  }

  //Reseteo Passsword Usuario
  public reseteoContrasena(data) {

    return this.http.post(SERVER_URL + 'reseteoContrasena/', data);

  }

  //subir archivos
  public uploadPhoto(formData) {

    return this.http.post(SERVER_URL + 'UploadFiles/', formData);
  }

  //reset password
  public resetPassword(data) {
    return this.http.post(SERVER_URL + 'createCode/', data);
  }

  public createNewPassword(data) {
    return this.http.post(SERVER_URL + 'resetPassword/', data);
  }

  public buscador(data) {
    return this.http.post(SERVER_URL + 'buscador', data);
  }

  public EnviaEmail(data) {
    return this.http.post('http://localhost:4000/api/EnviarEmail/', data);
  }




}
