import { createStore, Store } from 'redux';
import { ShoppCartState } from './ducks/shopp-cart/types';

import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
    shoppCart: ShoppCartState
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;