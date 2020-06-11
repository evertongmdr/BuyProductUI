import { IProduct } from "../../../../models/Interfaces";

export enum ShoppCartTypes{
    
    SEARCH_PRODUCTS = 'SEARCH_PRODUCTS',
    ADD_PRODUCT = 'ADD_PRODUCT',
    REMOVE_PRODUCT = 'REMOVE_PRODUCT',
    LOAD_SUCCESS = 'LOAD_SUCCESS',
    LOAD_FAILURE = 'LOAD_FAILURE',
    LOAD_REQUEST = 'LOAD_REQUEST'
}

export interface ShoppCartState {
 readonly searchedProducts: IProduct[],
 readonly addedProducts: IProduct[],
 readonly loading: boolean,
 readonly total: number,
 readonly error: boolean
}

