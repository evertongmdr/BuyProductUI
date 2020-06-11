import { ShoppCartTypes } from './types';
import { IProduct } from '../../../../models/Interfaces';

export const loadRequest = () => {
    return {
        type: ShoppCartTypes.LOAD_REQUEST,
    }
}
export const loadSuccess = (products: IProduct[]) => {

    return {
        type: ShoppCartTypes.LOAD_SUCCESS,
        data: products
    }
}
export const loadFailure = () => {

    return {
        type: ShoppCartTypes.LOAD_FAILURE,
    }
}

export const setProductSelected = (product: IProduct)=>{
    return {
        type: ShoppCartTypes.ADD_PRODUCT,
        newProduct: product
    }
}
// export const setSearchProducts = (products: IProduct[]) =>{
//     return {
//         type: ShoppCartTypes.SEARCH_PRODUCTS,
//         products
//     }
// }


// export const removeProduct = (id: string)=>{
//     return {
//         type: ShoppCartTypes.REMOVE_PRODUCT,
//         id
//     }
// }