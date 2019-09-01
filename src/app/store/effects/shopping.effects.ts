import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemSuccessAction, DeleteItemFailureAction, DeleteItemAction, UpdateItemSuccessAction, UpdateItemFailureAction, UpdateItemAction } from '../actions/shopping.actions';
import { ShoppingService } from 'src/app/shopping.service';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()

export class ShoppingEffects {

    @Effect() loadShopping$ = this.actions$
    .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItems()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data)),
                        catchError(error => of(new LoadShoppingFailureAction(error))),

                    )
            )
        );


    @Effect() addShoppingItems$ = this.actions$
    .pipe(
        ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
        
        mergeMap(
            data => 
            this.shoppingService.addShoppingItem(data.payload)
                .pipe(
                    map(data => new AddItemSuccessAction(data)), 
                    map(() => new LoadShoppingAction()),
                    catchError(error => of(new AddItemFailureAction(error))),

                )
        )
    );

    @Effect() deleteShoppingItems$ = this.actions$
    .pipe(
        ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
        mergeMap(
            data => this.shoppingService.deleteShoppingItem(data.payload)
                .pipe(
                    map(data => new DeleteItemSuccessAction(data.payload)),
                    map(() => new LoadShoppingAction()),
                    catchError(error => of(new DeleteItemFailureAction(error))),

                )
        )
    );


    
    @Effect() updateShoppingItems$ = this.actions$
    .pipe(
        ofType<UpdateItemAction>(ShoppingActionTypes.UPDATE_ITEM),
        
        mergeMap(
            data => 
            this.shoppingService.updateShoppingItem(data.payload)
                .pipe(
                    map(data => new UpdateItemSuccessAction(data)), 
                    map(() => new LoadShoppingAction()),
                    catchError(error => of(new UpdateItemFailureAction(error))),

                )
        )
    );


    constructor(private actions$: Actions, private shoppingService: ShoppingService) {

    }

}