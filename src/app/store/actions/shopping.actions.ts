import {Action} from '@ngrx/store';
import {ShoppingItem} from '../models/shopping-item.model';

export enum ShoppingActionTypes{
  ADD_ITEM = '[SHOPPING] Add Item',
  ADD_ITEM_SUCCESS = '[SHOPPING] Add Item Success',
  ADD_ITEM_FAILURE = '[SHOPPING] Add Item Failure',
  DELETE_ITEM = '[SHOPPING] Delete Item',
  DELETE_ITEM_SUCCESS = '[SHOPPING] Delete Item Success',
  DELETE_ITEM_FAILURE = '[SHOPPING] Delete Item Failure',
  UPDATE_ITEM = '[SHOPPING] Update Item',
  UPDATE_ITEM_SUCCESS = '[SHOPPING] Update Item Success',
  UPDATE_ITEM_FAILURE = '[SHOPPING] Update Item Failure',
}

export class AddItemAction implements Action{
  readonly type = ShoppingActionTypes.ADD_ITEM;
  constructor(public payload: ShoppingItem) {}
}

export class DeleteItemAction implements Action{
  readonly type = ShoppingActionTypes.DELETE_ITEM;
  constructor(public payload: string) {}
}

export class UpdateItemAction implements Action{
  readonly type = ShoppingActionTypes.UPDATE_ITEM;
  constructor(public payload: ShoppingItem) {}
}

export type ShoppingAction = AddItemAction | DeleteItemAction | UpdateItemAction;
