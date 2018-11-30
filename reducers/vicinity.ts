import { createAction, createReducer } from 'redux-act';
import { IVicinity, ICoordinate } from 'divermodels';
import { requestCentersById } from './centers';
import { ThunkDispatch } from 'redux-thunk';

export type VicinityState = {
    [key: string]: IVicinity;
}

export function requestVicinityForCoordinate(coordinate: ICoordinate) {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        fetch(`http://68.183.67.209/api/vicinity/center?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&radius=10`)
            .then((response) => response.json())
            .then((vicinity: IVicinity) => {
                dispatch(addVicinity(vicinity))
                dispatch(requestCentersById(vicinity.locations.map(l => l.locationId)));
            })
            .catch((error) => {
                console.error(error);
            });

        fetch(`http://68.183.67.209/api/vicinity/site?latitude=${coordinate.latitude}&longitude=${coordinate.longitude}&radius=10`)
            .then((response) => response.json())
            .then((vicinity: IVicinity) => {
                dispatch(addVicinity(vicinity))
                dispatch(requestCentersById(vicinity.locations.map(l => l.locationId)));
            })
            .catch((error) => {
                console.error(error);
            });
    };
}

const addVicinity = createAction('ADD_VICINITY', (vicinity: IVicinity) => ({vicinity}));

export const vicinityReducer = createReducer((on) => {
    on(addVicinity, (state: VicinityState, payload) => {
        const coordinateKey = `${payload.vicinity.coordinate.latitude},${payload.vicinity.coordinate.longitude}`;
        return {
            ...state,
            [coordinateKey]: {
                ...payload.vicinity,
                locations: payload.vicinity.locations
            }
        }
    });
}, {})