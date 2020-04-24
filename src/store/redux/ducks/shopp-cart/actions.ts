import {ShoppCartTypes} from './types';
import { IProduct } from '../../../../models/Interfaces';

export const setSearchProducts = (products: IProduct[]) =>{
    return {
        type: ShoppCartTypes.SEARCH_PRODUCTS,
        products
    }
}

export const setProductSelected = (product: IProduct)=>{
    return {
        type: ShoppCartTypes.ADD_PRODUCT,
        newProduct: product
    }
}