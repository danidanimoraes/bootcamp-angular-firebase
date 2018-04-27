import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ShoppingListService {
  
  public listItemsObservable: Observable<any[]>;
  public listItemsFirebase: AngularFireList<any>;

  constructor(
    private httpClient: HttpClient,
    private database: AngularFireDatabase
  ) 
  { 
    this.getAll();
  }

  public add(item): void
  {
    // Unshift: no começo da lista
    // Push: no fim da lista
    // A lista do firebase não conhece unshift

    //firebase tem q ter .json
    //database url do environments
  
    this.listItemsFirebase.push(item);
  }

  public getAll(): Observable<any[]>
  {
    // Pega 'items' do db do firebase como lista
    this.listItemsFirebase = this.database.list('items');

    this.listItemsObservable = this.listItemsFirebase.snapshotChanges().map(
      changes => changes.map(
        change => {
          return ({
            key: change.payload.key,
            name: change.payload.val()['name'],
            quantity: change.payload.val()['quantity'],
            unitPrice: change.payload.val()['unitPrice'],
            totalPrice: change.payload.val()['totalPrice'],
            disabled: change.payload.val()['disabled']
          })
        }
      )
    );
  
    return this.listItemsObservable;
  }

  public remove(item): void
  {
    this.listItemsFirebase.remove(item.key)
  }

  public removeAll(): void
  {
    this.listItemsFirebase.remove()
  }

  public update(item): void
  {
    let key = item.key;
    delete item.key;
    //Má prática porque editei o item antes de mandar
    
    this.listItemsFirebase.update(key, item)
  }
}
