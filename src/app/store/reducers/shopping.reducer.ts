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
 
  switch (action.type) {

    case ShoppingActionTypes.LOAD_SHOPPING:
      console.log(state, action.type);
      return {...state, loading: true};

    case ShoppingActionTypes.LOAD_SHOPPING_SUCCESS:
     console.log(action.payload, action.type);
      return {
      ...state,
      list: action.payload,
      loading: false
    }
    case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
      console.log(action.payload, action.type);
      return {
      ...state,
      error: action.payload,
      loading: false
    }

    case ShoppingActionTypes.ADD_ITEM:
      console.log(action.payload, action.type);
      return {
        ...state,
        loading: true
      };

    case ShoppingActionTypes.ADD_ITEM_SUCCESS:
      console.log(action.payload, action.type);
      
       const new_state = {...state, 
        list: action.payload, loading: false};
       
      return new_state; 
        
    case ShoppingActionTypes.ADD_ITEM_FAILURE:
      console.log(action.payload, action.type);
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ShoppingActionTypes.DELETE_ITEM:
      console.log(state, action.type);
      return {
        ...state,
        loading: true
      };

      case ShoppingActionTypes.DELETE_ITEM_SUCCESS:
          console.log(state, action.type);
        return {...state, 
          list: state.list.filter( item => item.id !== action.payload),
          loading: false
          };

          case ShoppingActionTypes.DELETE_ITEM_FAILURE:
              console.log(state, action.type);
              return {
                ...state,
                error: action.payload,
                loading: false
              };

      case ShoppingActionTypes.UPDATE_ITEM:
          console.log(action.payload, action.type);
        return {
          ...state,
          loading: true
        };

      case ShoppingActionTypes.UPDATE_ITEM_SUCCESS:      
        console.log(action.payload, action.type); 
             state.list.forEach(item => {
              if (item.id === action.payload.id) {
                item=action.payload;
              }
          }); 
          return state;

        case ShoppingActionTypes.UPDATE_ITEM_FAILURE:
            console.log(action.payload, action.type);
            return {
              ...state,
              error: action.payload,
              loading: false
            };
         

    default:
      return state;
  }
}
