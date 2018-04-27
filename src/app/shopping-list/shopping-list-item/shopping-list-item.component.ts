import { Component, OnInit, Input, Output } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { isNgTemplate } from '@angular/compiler';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  @Input("itemFromList") private listItem: any;
  @Output() changeOccured: EventEmitter = new EventEmitter();

  constructor(
    private myListService: ShoppingListService
   ) {}

  //Quando construiu o component e vai ser iniciado
  ngOnInit() {}

  public removeItem(): void
  {
    this.myListService.remove(this.listItem);
    this.changeOccured.emit("Removed");
  }

  public markItemAsDone(): void
  {
    let doneItem = {
      key: this.listItem.key,
      name: this.listItem.name,
      quantity: 0,
      unitPrice: this.listItem.unitPrice,
      totalPrice: 0,
      disabled: true
    }

    this.myListService.update(doneItem);
    this.changeOccured.emit("Done");
  }

  public decreaseQuantity(): void
  {
    let item = {
      key: this.listItem.key,
      name: this.listItem.name,
      quantity: this.listItem.quantity - 1,
      unitPrice: this.listItem.unitPrice,
      totalPrice: parseFloat(((this.listItem.quantity - 1) * this.listItem.unitPrice).toFixed(2)),
      disabled: false
    }

    if (item.quantity == 0)
    {
      this.markItemAsDone();
      return;
    }

    this.myListService.update(item);
    this.changeOccured.emit("Decreased");
  }

  public increaseQuantity(): void
  {
    let item = {
      key: this.listItem.key,
      name: this.listItem.name,
      quantity: this.listItem.quantity + 1,
      unitPrice: this.listItem.unitPrice,
      totalPrice: parseFloat(((this.listItem.quantity + 1) * this.listItem.unitPrice).toFixed(2)),
      disabled: false
    }

    this.myListService.update(item);
    this.changeOccured.emit("Increased");
  }
}
