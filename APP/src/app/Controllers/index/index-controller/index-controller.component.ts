import { Component, OnInit } from '@angular/core';
import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'codemirror/mode/go/go';
import 'codemirror/mode/markdown/markdown';
import {
  custom as customDialogComponent,
} from 'devextreme/ui/dialog';

import { PESTANA } from 'src/app/modules/pestañas';
import { COMPILADOR } from 'src/app/modules/compilar';
import { CompilarServiceService } from 'src/app/services/compilar-service.service';

@Component({
  selector: 'app-index-controller',
  templateUrl: './index-controller.component.html',
  styleUrls: ['./index-controller.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class IndexControllerComponent implements OnInit {


  tabs: Array<PESTANA> = [];
  Num = 0;
  ID = '';
  TAB_ACTUAL:any = undefined;
  CONTENT = '';
  CONSOLA = '';
  ERRORES: any[] = [];
  SIMBOLOS:any[] = [];
  Options: Array<any> = [
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        hint: 'Agregar',
        stylingMode: 'contained',
        onClick: this.Creartab.bind(this),
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'video',
        hint: 'Compilar',
        stylingMode: 'contained',
        onClick: this.compiar.bind(this),
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        hint: 'Refrescar',
        stylingMode: 'contained',
        onClick: this.limpiarconsola.bind(this),
      },
    }
  ];

  @Output() appLoadingChange: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  constructor(public compilar: CompilarServiceService) { }

  ngOnInit(): void {
    this.tabs = [];
    this.Num = 0;
    this.CONTENT = '';
    this.TAB_ACTUAL = undefined;
    this.ID = 'TAB_0';
  }


  actualizarContent(c:string){
    this.CONTENT = c;
  }
  guardar(){
    if (this.Num!=0) {
      this.writeContents(this.CONTENT, this.ID + ".ty", "text/plain");
    }
  }

  writeContents(content:string, fileName:string, contentType:string) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  Creartab(){
      if (this.tabs.length === 0) {
        this.Num = 0;
      }
      let nueva = new PESTANA('TAB_' + String(this.Num++));
      this.tabs.push(nueva);
      return nueva;
  }

  async confirmacion(message: string, title?: string): Promise<boolean>{
    try {
      const customDialog = customDialogComponent({
        title: title ? title : '¡ALERTA!',
        messageHtml: `<i>${message}</i>`,
        buttons: [
          {
            text: 'Aceptar',
            onClick: () => {
              return Promise.resolve(true);
            },
          },
          {
            text: 'Cancelar',
            onClick: () => {
              return Promise.resolve(false);
            },
          },
        ],
      });

      const result = await customDialog.show();

      return Promise.resolve(result);
    } catch (error) {
      return Promise.resolve(false);
    }
  }

  async eliminartab(){
    if (!this.tabs.length) {
      return;
    }
    if (!(await this.confirmacion("¿Eliminar Tab: "+ this.ID +"?"))) {
      return;
    }
    this.ERRORES = [];
    this.SIMBOLOS = [];
    this.tabs = this.tabs.filter((obj) => {
      return obj.ID !== this.ID;
    });
  }

  showCloseButton(): boolean {
    return this.tabs.length >= 1;
  }

  cargar(e: any){
    console.log(e);
    let input = e.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = async () => {
      let nueva = this.Creartab();
      this.ID = nueva.ID;
      nueva.CONTENIDO =<string>reader.result;
      console.log(nueva);
      nueva.CONSOLA = "";
    };
  }

  async eliminartodas(){
    if (!(await this.confirmacion("¿Eliminar todas las tabs?"))) {
      return;
    }
    this.ERRORES = [];
    this.SIMBOLOS = [];
    this.CONSOLA = "";
    this.ngOnInit();
  }

  limpiarconsola(){
    this.CONSOLA = "";
    this.TAB_ACTUAL.CONSOLA = "";
  }

  seleccionartab(e: any){
    this.TAB_ACTUAL = e.addedItems[0];
    this.ID = e.addedItems[0].ID;
    this.CONSOLA = e.addedItems[0].CONSOLA;
    this.CONTENT = e.addedItems[0].CONTENIDO;
    console.log(e.addedItems[0].CONTENIDO);
    this.ERRORES = e.addedItems[0].ERRORES;
    this.SIMBOLOS = e.addedItems[0].SIMBOLOS;
  }

  compiar(){
    const cont:COMPILADOR = {
      CONTENIDO: this.CONTENT
    };
    this.compilar.COMPILAR(cont).subscribe(
      (res: any) => {
        this.CONSOLA = res.CONSOLA;
        this.ERRORES = res.ERRORES;
        this.SIMBOLOS = res.SIMBOLOS;
        this.TAB_ACTUAL.consola = this.CONSOLA;
        this.TAB_ACTUAL.SIMBOLOS = res.SIMBOLOS;
        this.TAB_ACTUAL.ERRORES = res.ERRORES;
      },
      (err: any) => console.log(err)
    );
  }

  graficar(){
    const cont:COMPILADOR = {
      CONTENIDO: this.CONTENT
    };
    this.compilar.GRAFICAR(cont);
  }
}
