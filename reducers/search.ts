import { createAction, createReducer } from 'redux-act';
import { requestSuggestions } from './placeSuggestions';
import { ThunkDispatch } from 'redux-thunk';
import { requestSiteSuggestions } from './siteSuggestions';
import { requestCenterSuggestions } from './centerSuggestions';

export type SearchState = {
    term: string;
}

export function updateTerm(term: string) {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(setTerm(term));
        if (term !== '') {
            dispatch(requestSuggestions(term));
            dispatch(requestSiteSuggestions(term));
            dispatch(requestCenterSuggestions(term));
        }
    };
}

export const setTerm = createAction('SET_TERM', (term: string) => ({term}));

const initialState: SearchState = {
    term: ''
};

export const searchReducer = createReducer((on) => {
    on(setTerm, (state: SearchState, payload) => {
        return {...state, term: payload.term}
    });
}, initialState)