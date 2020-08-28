import { Injectable } from "@angular/core";
//MOdulos del firebse
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
//Ingresando nuestro modelo
import { Item } from '../models/item';
@Injectable()
export class ItemService {
     itemList: AngularFireList<any>;
     //almacenar temporalmente un dato
     selectItem: Item = new Item();
     
     constructor(private firebase: AngularFireDatabase) { }
     //metodo que obtiene items
     getItem(){
          return this.itemList = this.firebase.list('item');
     }
     //metodo que agrega datos
     insertItem(item: Item){
          this.itemList.push({
               ubicacion: item.ubicacion,
               estado: item.estado
          });
     }
     //Actualiza
     updateItem(item: Item){
          this.itemList.update(item.$key, {
               ubicacion: item.ubicacion,
               estado: item.estado
          });
     }
     //Eliminar
     deleteItem($key: string){
          this.itemList.remove($key);
     }
}