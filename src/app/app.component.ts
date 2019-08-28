import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AddItemAction, DeleteItemAction, UpdateItemAction } from './store/actions/shopping.actions';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingItems$: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = {id: '', name: ''};
  title = 'ngrx-shopping-list';
  update: boolean = false;
  updatedName: string;
  updatedId: string;


  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
   this.shoppingItems$ = this.store.select(store => store.shopping);


  }

  addItem() {
    this.newShoppingItem.id = uuid();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    this.newShoppingItem = {id: '', name: ''};
  }

  deleteItem(index: string) {

    this.store.dispatch(new DeleteItemAction(index));

  }

  openFormUpdate(shoppingItem: ShoppingItem){
    this.update = true;
    this.updatedName = shoppingItem.name;
    this.updatedId = shoppingItem.id;
  }

  updateItem(shoppingItem: ShoppingItem) {
    let i=0;
    this.shoppingItems$.forEach(function(value) {

      if(value[i].id === shoppingItem.id){
        value[i].name=shoppingItem.name;
      }
     // value=shoppingItem;
      console.log(value[i].id);
      i++;

    });

    console.log('update');
    shoppingItem.name = "Updated article";
    console.log(shoppingItem);


    this.store.dispatch(new UpdateItemAction(shoppingItem));

  }
}
