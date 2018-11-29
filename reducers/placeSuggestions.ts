import { IAutoCompleteResponse, IAutoCompleteSuggestion } from '../models/GooglePlaces';
import { PlaceSuggestionState } from './state';
import { ThunkDispatch } from 'redux-thunk';

export const REQUEST_SUGGESTIONS = 'REQUEST_SUGGESTIONS';
export const RECEIVE_SUGGESTIONS = 'RECEIVE_SUGGESTIONS';
export const START_FETCHING_STATE = 'START_FETCHING_STATE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export type REQUEST_SUGGESTIONS = typeof REQUEST_SUGGESTIONS;
export type RECEIVE_SUGGESTIONS = typeof RECEIVE_SUGGESTIONS;
export type START_FETCHING_STATE = typeof START_FETCHING_STATE;
export type SET_SEARCH_TERM = typeof SET_SEARCH_TERM;

export interface ReceiveSuggestions {
    type: RECEIVE_SUGGESTIONS;
    suggestions: IAutoCompleteSuggestion[]
}

export interface StartFetchingState {
    type: START_FETCHING_STATE;
}

export interface SetSearchTerm {
    type: SET_SEARCH_TERM;
    term: string;
}

export type PlaceSuggestionAction = ReceiveSuggestions | StartFetchingState | SetSearchTerm;

export function requestSuggestions(term: string) {
    return (dispatch: ThunkDispatch<any, any, PlaceSuggestionAction>) => {
        if (term !== '') {
            dispatch(startFetchingState());
            
            fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${term}&types=(regions)&key=AIzaSyCbiVq77U94A6g0sEK59tcKlKj_1NFMZkE`)
                .then((response) => response.json())
                .then((suggestion: IAutoCompleteResponse) => {
                    const suggestions = suggestion.predictions.filter(suggestion => suggestion.types.includes('locality'))
                    dispatch(receiveSuggestions(suggestions))
                })
                .catch((error) =>{
                    // TODO: Proper error handling
                    console.error(error);
                });
        }
    };
}

export function receiveSuggestions(suggestions: IAutoCompleteSuggestion[]): ReceiveSuggestions {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions
    }
}

export function startFetchingState(): StartFetchingState {
    return {
        type: START_FETCHING_STATE
    };
}

export function setSearchTerm(term: string): SetSearchTerm {
    return {
        type: SET_SEARCH_TERM,
        term
    }
}

const initialState: PlaceSuggestionState = {
    isFetching: false,
    suggestions: [],
    searchTerm: ''
};

export const placeSuggestionReducer = (state: PlaceSuggestionState = initialState, action: PlaceSuggestionAction): PlaceSuggestionState => {
    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
            return Object.assign({}, state, {suggestions: action.suggestions, isFetching: false});
        case START_FETCHING_STATE:
            return Object.assign({}, state, {isFetching: true});
        case SET_SEARCH_TERM: 
            return Object.assign({}, state, {searchTerm: action.term})
        default: 
            return state;    
    }
}
