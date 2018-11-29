import { createAction, createReducer } from 'redux-act';
import { ICenter } from 'divermodels';
import { Dispatch } from 'redux';
import { Map } from 'immutable';

export type CenterState = Map<string, ICenter>;

export function requestCenters() {
    return (dispatch: Dispatch) => {
        fetch(`http://68.183.67.209/api/center`)
            .then((response) => response.json())
            .then((centers) => {
                dispatch(addCenters(centers));
            })
            .catch((error) =>{
                // TODO: Proper error handling
                console.error(error);
            });
    };
}

export function requestCentersById(ids: string[]) {
    return (dispatch: Dispatch) => {
        fetch(`http://68.183.67.209/api/center/${ids.join(',')}`)
            .then((response) => response.json())
            .then((centers) => {
                dispatch(addCenters(centers));
            })
            .catch((error) =>{
                // TODO: Proper error handling
                console.error(error);
            });
    };
}

const addCenter = createAction('ADD_CENTER', (center: ICenter) => ({center}));
const addCenters = createAction('ADD_CENTERS', (centers: ICenter[]) => ({centers}));

const initialState: CenterState = Map();

export const centerReducer = createReducer((on) => {
    on(addCenter, (state: CenterState, payload) => {
        return state.set(payload.center.id, payload.center);
    });
    on(addCenters, (state: CenterState, payload) => {
        let newState = state;
        payload.centers.forEach(c => {
            newState = newState.set(c.id, c);
        });
        
        return newState;
    });
}, initialState)