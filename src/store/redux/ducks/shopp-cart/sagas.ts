import {call, put, delay} from 'redux-saga/effects';
import api from '../../../../services/api';

import {loadSuccess, loadFailure} from './actions';

export function *load(){
    try {
      
        var url = `/products?searchQuery=`;
        const response = yield call(api.get,url);
        yield delay(2000);
        console.log(response.data);
        yield put(loadSuccess(response.data))
    } catch (error) {
        yield put(loadFailure());
    }
}