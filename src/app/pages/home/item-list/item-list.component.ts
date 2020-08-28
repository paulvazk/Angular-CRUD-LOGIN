import { Component, OnInit } from '@angular/core';
//importando servicio
import { ItemService } from '../../../services/item.service';
//Class Product
import { Item } from '../../../models/item';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  
  itemList: Item[];
  constructor( private itemService: ItemService ) { }

  ngOnInit() {
    this.itemService.getItem()
    .snapshotChanges()//Este metodo sirve para ver los cambios en tiempo real
    .subscribe(item => {//con este es para observarlos
      this.itemList = [];
      item.forEach( elemento => {//eligiendo  cada elemento
        let x = elemento.payload.toJSON();
        x["$key"] = elemento.key;
        this.itemList.push(x as Item);
      });
    }); 
  }

  onEdit(item: Item){
    this.itemService.selectItem = Object.assign({}, item);
  }

  onDelete($key: string){
    this.itemService.deleteItem($key); 
  }
}
