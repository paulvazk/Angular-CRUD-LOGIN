import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//servicio
import { ItemService } from '../../../services/item.service';
//Clase Item
import { Item } from '../../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItem();
    this.resetForm();
  } 

  onSubmit(itemForm: NgForm){
    if (itemForm.value.$key == null) {
      this.itemService.insertItem(itemForm.value);
    } else {
      this.itemService.updateItem(itemForm.value);
    }
    this.resetForm(itemForm);
  }

 resetForm(itemForm?: NgForm){
  if (itemForm != null) {
    itemForm.reset();
    this.itemService.selectItem = new Item();
  }
 }
}
