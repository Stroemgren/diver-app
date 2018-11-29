import { createAction, createReducer } from 'redux-act';
import { ThunkDispatch } from 'redux-thunk';
import { ISiteSuggestion } from 'divermodels';
import { Set } from 'immutable';

export type SiteSuggestionState = Set<ISiteSuggestion>

export function requestSiteSuggestions(term: string) {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        fetch(`http://68.183.67.209/api/suggestion/site/${term}`)
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

export const addSuggestions = createAction('addSuggestions', (suggestions: ISiteSuggestion[]) => ({suggestions}));

const initialState: SiteSuggestionState = Set();

export const siteSuggestionReducer = createReducer((on) => {
    on(addSuggestions, (state: SiteSuggestionState, payload) => {
        return Set(payload.suggestions);
    });
}, initialState)