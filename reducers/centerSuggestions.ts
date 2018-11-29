import { createAction, createReducer } from 'redux-act';
import { ThunkDispatch } from 'redux-thunk';
import { ICenterSuggestion } from 'divermodels';
import { Set } from 'immutable';

export type CenterSuggestionState = Set<ICenterSuggestion>

export function requestCenterSuggestions(term: string) {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        fetch(`http://68.183.67.209/api/suggestion/center/${term}`)
            .then((response) => response.json())
            .then((suggestions) => {
                dispatch(addSuggestions(suggestions));
            })
            .catch((error) =>{
                // TODO: Proper error handling
                console.error(error);
            });
    };
}

export const addSuggestions = createAction('addSuggestions', (suggestions: ICenterSuggestion[]) => ({suggestions}));

const initialState: CenterSuggestionState = Set();

export const centerSuggestionReducer = createReducer((on) => {
    on(addSuggestions, (state: CenterSuggestionState, payload) => {
        return Set(payload.suggestions);
    });
}, initialState)