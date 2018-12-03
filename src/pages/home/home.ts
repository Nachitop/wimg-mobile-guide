import { Component } from '@angular/core';
import { NavController,NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ContratacionProvider } from '../../providers/contratacion/contratacion';
import { Turista } from '../../app/models/turista.model';
import { AlertsProvider } from '../../providers/alerts/alerts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  id_guia:string;
  turista:Turista;
  id_contratacion: string;
  contratacion:any=undefined;
  loader:any;
  mostrarInfoTurista:boolean;
  lugar: any;
  mostrarBotonFinalizar: boolean=false;
  constructor(public navCtrl: NavController, public navparams:NavParams, public contrataciónService:ContratacionProvider, public alertService:AlertsProvider,private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    let id=this.navparams.get('id_guia');
    this.id_guia=id.id;
    
    this.loader = this.loadingCtrl.create({
      content: "Searching for hires",
    
    });
    this.obtenerContratacion();

  }

  
  ionViewDidLoad() {
      
  }

  obtenerContratacion(){
    var interv=setInterval (()=>{

      if(this.contratacion==undefined){ this.loader.present();}
      else{this.loader.dismiss();}

      this.contrataciónService.obtenerContratacion(this.id_guia).subscribe(res=>{
        let resp=JSON.stringify(res);
        let resp2=JSON.parse(resp);
    
        this.contratacion=resp2.Contratacion;
      
        if(resp2.estado==1){


          this.contrataciónService.obtenerLugarById(this.contratacion.id_lugar).subscribe(res=>{
            let resp=JSON.stringify(res);
            let resp2=JSON.parse(resp);
            this.lugar=resp2.Lugar;
          
          });


          this.id_contratacion=resp2.Contratacion.id;
          this.contrataciónService.obtenerTuristaById(resp2.Contratacion.id_turista).subscribe(res=>{
            let resp=JSON.stringify(res);
            let resp2=JSON.parse(resp);
            if(resp2.estado==1){
              this.turista=resp2.resultado as Turista;
              clearInterval(interv);
              this.loader.dismiss();
              this.showConfirm();
            
            }
          });
        }
      });
    },5000);
  }

  showConfirm() {
    let contratacion={
      id_contratacion:this.id_contratacion, estado:"A"
    }
    const confirm = this.alertCtrl.create({
      title: 'Guide service',
      message: this.turista.nombre+" wants your services as guide",
      buttons: [
        {
          text: 'Reject',
          handler: () => {
            contratacion.estado="C";
            this.contrataciónService.updateContratacion(contratacion).subscribe(res=>{
              let resp=JSON.stringify(res);
              let resp2=JSON.parse(resp);
              if(resp2.estado==1){
                this.mostrarInfoTurista=false;
                this.contratacion=undefined;
                this.obtenerContratacion();
              }
            });
          }
        },
        {
          text: 'Accept',
          handler: () => {
            
          
            this.contrataciónService.updateContratacion(contratacion).subscribe(res=>{
              let resp=JSON.stringify(res);
              let resp2=JSON.parse(resp);
              if(resp2.estado==1){
                this.mostrarInfoTurista=true;
                let datos_guia={
                  id:this.id_guia, disponibilidad:"O"
                }
                this.contrataciónService.editEstadoGuia(datos_guia).subscribe(res=>{

                });

              }
            });

          }
        }
      ]
    });
    confirm.present();
  }


  comenzarViaje(){
    let contratacion={
      id_contratacion:this.id_contratacion, estado:"I"
    }
    this.contrataciónService.updateContratacion(contratacion).subscribe(res=>{
      let resp=JSON.stringify(res);
      let resp2=JSON.parse(resp);
      if(resp2.estado==1){
        this.mostrarBotonFinalizar=true;
      }
    });
  }

  finalizarViaje(){
    let contratacion={
      id_contratacion:this.id_contratacion, estado:"F"
    }
    this.contrataciónService.updateContratacion(contratacion).subscribe(res=>{
      let resp=JSON.stringify(res);
      let resp2=JSON.parse(resp);
      if(resp2.estado==1){
        let datos_guia={
          id:this.id_guia, disponibilidad:"A"
        }
        this.contrataciónService.editEstadoGuia(datos_guia).subscribe(res=>{

        });
        this.contratacion=undefined;
        window.location.reload();
      // this.navCtrl.push(HomePage);
      }
    });
  }
}
