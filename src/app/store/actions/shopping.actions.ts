import {Action} from '@ngrx/store';
import {ShoppingItem} from '../models/shopping-item.model';

export enum ShoppingActionTypes{
  ADD_ITEM = '[SHOPPPING] Add Item',
  ADD_ITEM_SUCCESS = '[SHOPPPING] Add Item Success',
  ADD_ITEM_FAILURE = '[SHOPPPING] Add Item Failure',
}

export class AddItemAction implements Action{
  readonly type = ShoppingActionTypes.ADD_ITEM;
  constructor(public payload: ShoppingItem) {}
}

export type ShoppingAction = AddItemAction;
