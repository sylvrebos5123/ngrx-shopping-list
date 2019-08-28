import {ShoppingItem} from '../models/shopping-item.model';
import { ShoppingAction, ShoppingActionTypes } from '../actions/shopping.actions';

const initialState: Array<ShoppingItem> = [
  {
    id: '1',
    name: 'Diet Coke',
  }

];

export function ShoppingReducer(state: Array<ShoppingItem> = initialState, action: ShoppingAction) {
  console.log('state ' + state);
  switch (action.type) {
    case ShoppingActionTypes.ADD_ITEM:
      console.log(action.payload, action.type);
      return [...state, action.payload];

      case ShoppingActionTypes.DELETE_ITEM:
          console.log(action.payload, action.type);
        return state.filter( item => item.id !== action.payload);

        case ShoppingActionTypes.UPDATE_ITEM:
            console.log(action.payload, action.type);
            return state;
           /*  const new_state = state.map(o => ({ ...o }));
            console.log('new state' + new_state);
            return new_state; */


    default:
      return state;
  }
}
