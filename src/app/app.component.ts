import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AddItemAction, DeleteItemAction, UpdateItemAction, LoadShoppingAction } from './store/actions/shopping.actions';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = {id: '', name: ''};
  updatedShoppingItem: ShoppingItem = {id: '', name: ''};
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  title = 'ngrx-shopping-list';
  update: boolean = false;
  updatedName: string;
  updatedId: string;


  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems = this.store.select(store => store.shopping.list);
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);
    this.store.dispatch(new LoadShoppingAction());
  }

  addItem() {
    this.newShoppingItem.id = uuid();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    this.newShoppingItem = {id: '', name: ''};
    //this.store.dispatch(new LoadShoppingAction());
  }

  deleteItem(index: string) {

    this.store.dispatch(new DeleteItemAction(index));
    //this.store.dispatch(new LoadShoppingAction());
  }

  openFormUpdate(shoppingItem: ShoppingItem){
    console.log(shoppingItem);
    this.update = true;
    this.updatedShoppingItem.name = shoppingItem.name;
    this.updatedShoppingItem.id = shoppingItem.id;
  }

  updateItem(shoppingItem: ShoppingItem) {

    this.update = false;
    this.store.dispatch(new UpdateItemAction(shoppingItem));

  }
}
