import { IProduct } from "../../../../models/Interfaces";

export enum ShoppCartTypes{
    
    SEARCH_PRODUCTS = 'SEARCH_PRODUCTS',
    ADD_PRODUCT = 'ADD_PRODUCT',
    REMOVE_PRODUCT = 'REMOVE_PRODUCT'
}

export interface ShoppCartState {
 readonly searchedProducts: IProduct[],
 readonly addedProducts: IProduct[],
 readonly total: number
}

