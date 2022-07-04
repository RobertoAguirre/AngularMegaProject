import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { environment, SERVER_URL, DB_INSTANCE } from '../environments/environment';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  //@ViewChild(MatAccordion) accordion: MatAccordion;

  id;//comentar la 1
  title = 'AngularMegaProject';
  menus;
  modulos;
  //grupoModulos;
  modulosPorGrupo: any = [];
  
  
  showFiller = false;
  sideopened = false;
  

  constructor(public apiService: ApiService, public auth: AuthService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


  }

  async ngOnInit() {

    let user = this.auth.user$;

    this.auth.user$.subscribe((response) => {
      console.log(response);
      //alert(`user ${response}`)
      let data = {
        "appname": DB_INSTANCE,
        "sp": "Trae_IdUsuario",
        "params": [`'${response?.email}'`]
      }
      this.apiService.ejecuta(data).subscribe((response) => {
          let _response;
          _response = response;
          console.log(_response.success.recordset[0].id_persona);
          this.id = _response.success.recordset[0].id_persona;
          localStorage.setItem('id', this.id);
          this.GeneraMenu();
          
          
      });

    })



    //this.GeneraMenu(); esta es la buuena por ahora

    /*     await this.storage.create();
        this.storage.get('id').then((val) => {
          this.id = val;
          //this.GeneraMenu(); Uncomment this!
        }); */
  }

  //FILLERS PARA EL DEMO

  private _mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  //



  Filtrar(nombre_grupo) {

    return this.modulos.filter(function (item) { return (item.nombre_grupo == nombre_grupo); });
  }


  GeneraMenu() {


    //this.id = this.storage.get('id');
    //this.id = 1 //delete this
    /* this.MODULOSPORGRUPO = JSON.parse(localStorage.getItem('MODULOSPORGRUPO')); */
    if (this.modulosPorGrupo === undefined || this.modulosPorGrupo.length <= 0) {

      let data = {
        "appname": DB_INSTANCE,
        "sp": "Trae_Modulos_Web_Usuario",
        "params": [this.id]

      }

      this.apiService.ejecuta(data).subscribe((response) => {
        let _response;
        _response = response;


        this.menus = _response.success.recordsets[1];
        this.modulos = _response.success.recordsets[0];

        this.menus.forEach(value => {
          let grupoModulos: any = {
            'idgrupo': value.id_grupo,
            'nombre_grupo': value.nombre_grupo,
            'modulos': []
          }

          this.modulos = _response.success.recordsets[0];
          this.modulos = this.Filtrar(value.nombre_grupo);

          this.modulos.forEach(value => {
            grupoModulos['modulos'].push(value);
          })

          this.modulosPorGrupo.push(grupoModulos);

          //this.sideopened = true;
        })

        //localStorage.setItem('MODULOSPORGRUPO', JSON.stringify(this.MODULOSPORGRUPO));

      })

    }

  }

}
