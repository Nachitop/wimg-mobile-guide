import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ContratacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContratacionProvider {

  constructor(public http: HttpClient) {
    
  }

    obtenerContratacion(id:string){
      return this.http.get("http://35.185.216.89/getContratacionGuia.php?id_guia="+id);
    }

    obtenerTuristaById(id:string){
      return this.http.get("http://35.185.216.89/getIdTurista.php?id="+id);
    }

    updateContratacion(contratacion){
      return this.http.post("http://35.185.216.89/updateContratacion.php",contratacion);
    }

    obtenerLugarById(id:string){
      return this.http.get("http://35.185.216.89/getLugarContratacion.php?id_lugar="+id);
    }
    editEstadoGuia(guia:any){
    
      return this.http.post("http://35.185.216.89/updateEstadoGuia.php",guia);
    }
}
