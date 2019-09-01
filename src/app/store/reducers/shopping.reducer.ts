import {ShoppingItem} from '../models/shopping-item.model';
import { ShoppingAction, ShoppingActionTypes } from '../actions/shopping.actions';

export interface ShoppingState {
  list: ShoppingItem[],
  loading: boolean,
  error: Error
}

const initialState: ShoppingState = 
  {
    list: [],
    loading: false,
    error: undefined
  }

;

export function ShoppingReducer(state: ShoppingState = initialState, action: ShoppingAction) {
  console.log('state ' + state);
  switch (action.type) {
    case ShoppingActionTypes.LOAD_SHOPPING:
      return {...state, loading: true};

    case ShoppingActionTypes.LOAD_SHOPPING_SUCCESS:
      return {
      ...state,
      list: action.payload,
      loading: false
    }
    case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
      return {
      ...state,
      error: action.payload,
      loading: false
    }

    case ShoppingActionTypes.ADD_ITEM:
      return {
        ...state,
        loading: true
      };

    case ShoppingActionTypes.ADD_ITEM_SUCCESS:
      console.log(action.payload, action.type);
      return [...state.list, 
              action.payload];
      /* const new_state = {...state, 
        list: action.payload, loading: false};
        console.log('new state');
        console.log(new_state);
      return new_state; */
        
    case ShoppingActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ShoppingActionTypes.DELETE_ITEM:
      return {
        ...state,
        loading: true
      };

      case ShoppingActionTypes.DELETE_ITEM_SUCCESS:
          console.log(action.payload, action.type);
        return {...state, 
          list: state.list.filter( item => item.id !== action.payload),
          loading: false
          };

          case ShoppingActionTypes.DELETE_ITEM_FAILURE:
              return {
                ...state,
                error: action.payload,
                loading: false
              };

      case ShoppingActionTypes.UPDATE_ITEM:      
        console.log(action.payload, action.type); 
             state.list.forEach(item => {
              if (item.id === action.payload.id) {
                item.name=action.payload.name;
              }
          }); 
          return state;
         

    default:
      return state;
  }
}
