import { Component, OnInit, Output } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  private listItemsObservable: Observable<any[]>;
  private itemFromInput: string = '';
  private itemQuantity: number = null;
  private itemPrice: number = null;

  @Output() total: number = 0;
  
  constructor(
    //Só injeta se for private senão ele acha q eh um atributo da classe e não inicializa
    private myListService: ShoppingListService
  ){}

  ngOnInit() {
    this.loadAllItems();
    this.calculeTotalPrice();
  }

  /**
   * Includes an item in the database.
   * If this item already exists in the database, 
   * updates its quantity and total price
   */
  private addItem(): void
  {
    let doContinue: boolean = true;
    let newItem = {
      key: '',
      name: this.itemFromInput,
      quantity: this.itemQuantity > 0 ? this.itemQuantity : 1,
      unitPrice: this.itemPrice? this.itemPrice : 0, 
      totalPrice: parseFloat(0.00.toFixed(2)),
      disabled: false
    };
    
    newItem.totalPrice = parseFloat((newItem.unitPrice * newItem.quantity).toFixed(2));
  
    this.myListService.getAll()
      .takeWhile(() => doContinue)
      .subscribe(
        (items) => 
        {
          let foundItem = items.filter((item) => item.name == newItem.name, newItem)[0]

          if (foundItem)
          {
            newItem.key = foundItem.key;
            newItem.quantity = foundItem.quantity + 1;
            newItem.totalPrice = parseFloat((newItem.unitPrice * newItem.quantity).toFixed(2));
            this.myListService.update(newItem);
          }
          else
          {
            this.myListService.add(newItem); 
          }
          this.cleanInput();
          this.calculeTotalPrice();
          doContinue = false;
          return;
      })
  }

  /**
   * Loads all items in the screen
   */
  private loadAllItems(): void
  {
    this.listItemsObservable = this.myListService.getAll();
    this.calculeTotalPrice();

  }

  /**
   * Removes all items from the database
   */
  private removeAllItems(): void
  {
    this.myListService.removeAll();
    this.total = 0;
  }

  /**
   * Method called when a change occurs
   * in the list
   */
  public onChange(): void
  {
    this.cleanInput();
    this.loadAllItems();
    this.calculeTotalPrice();
  }

  /**
   * Cleans the inputs in the screen,
   * making them show their initial
   * texts
   */
  private cleanInput(): void
  {
    this.itemFromInput = '';
    this.itemQuantity = null;
    this.itemPrice = null;
  }

  /**
   * Calculates the total price of the cart
   * and updates the output with the total value
   */
  private calculeTotalPrice(): void
  { 
    this.myListService.getAll()
      .subscribe(
        (items) => 
        { 
          let price: number = 0;
          items.map((item) => {
            price += item.totalPrice; 
            return price
          },
          price)
          this.total = parseFloat(price.toFixed(2));
      })
  }
}
