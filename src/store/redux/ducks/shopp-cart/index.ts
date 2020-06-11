import { Reducer } from "redux";
import { ShoppCartTypes, ShoppCartState } from './types';
import updateObject from "../../utility";

const intialState: ShoppCartState = {
  addedProducts: [],
  searchedProducts: [],
  loading: false,
  total: 0,
  error: false
};
const reducer: Reducer<ShoppCartState> = (state = intialState, action) => {
  let products = []; // 
  switch (action.type) {

    case ShoppCartTypes.LOAD_REQUEST:
      return updateObject(state, { loading: true });
    case ShoppCartTypes.LOAD_SUCCESS:
      return updateObject(state, { searchedProducts: action.data, loading: false, error: false });

    case ShoppCartTypes.LOAD_FAILURE:
      return updateObject(state, { loading: false, error: true });

    case ShoppCartTypes.ADD_PRODUCT:
      products = [...state.addedProducts];
      products.push(action.newProduct);
      return updateObject(state, { addedProducts: products });

    default:
      return state;
  }

};

export default reducer;

// switch (action.type) {
//   case ShoppCartTypes.SEARCH_PRODUCTS:
//     return updateObject(state, { searchedProducts: action.products });
//   case ShoppCartTypes.ADD_PRODUCT:
//     products = [...state.addedProducts];
//     products.push(action.newProduct);
//     return updateObject(state, { addedProducts: products });

//   case ShoppCartTypes.REMOVE_PRODUCT:
//     products = [...state.addedProducts];
//     const pos = products.findIndex(product => product.id === action.id)
//     products.splice(pos,1);

//     return updateObject(state, { addedProducts: products });
//   default:
//     return state;
// }
