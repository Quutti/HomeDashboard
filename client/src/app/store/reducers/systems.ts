
import * as objectAssign from 'object-assign';
import * as Redux from 'redux'

import { SystemState, SYSTEMS_RECEIVED } from '../types';

const initialState: SystemState = {
    instances: []
}

const systems: Redux.Reducer<SystemState> = (state = initialState, action: any) => {

    switch (action.type) {

        case SYSTEMS_RECEIVED:
            return objectAssign({}, state, { instances: action.instances });

        default:
            return state;
    }

}

export default systems;