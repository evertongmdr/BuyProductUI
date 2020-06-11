import {all, takeLatest} from 'redux-saga/effects';
import {load} from './shopp-cart/sagas';
import {ShoppCartTypes} from './shopp-cart/types';

export default function* rootSaga(){
    return yield all([
        takeLatest(ShoppCartTypes.LOAD_REQUEST, load)
    ]);
}