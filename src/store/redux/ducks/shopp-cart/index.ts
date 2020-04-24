import { Reducer } from "redux";
import { ShoppCartTypes, ShoppCartState } from './types';
import updateObject from "../../utility";

const intialState: ShoppCartState = {
  addedProducts: [],
  searchedProducts: [],
  total: 0
};

const reducer: Reducer<ShoppCartState> = (state = intialState, action) => {

  switch (action.type) {
    case ShoppCartTypes.SEARCH_PRODUCTS:
      return updateObject(state, { searchedProducts: action.products });
    case ShoppCartTypes.ADD_PRODUCT:
      const products = [...state.addedProducts];
      products.push(action.newProduct);
      return updateObject(state,{addedProducts: products });
    default:
      return state;
  }

};

export default reducer;
