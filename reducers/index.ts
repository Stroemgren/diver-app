import { combineReducers } from 'redux';
import { RootState } from './state';
import { placeSuggestionReducer } from './placeSuggestions';
import { centerReducer } from './centers';
import { vicinityReducer } from './vicinity';
import { siteReducer } from './sites';
import { searchReducer } from './search';
import { siteSuggestionReducer } from './siteSuggestions';
import { centerSuggestionReducer } from './centerSuggestions';

export { RootState };

export const rootReducer = combineReducers<RootState>({
    centers: centerReducer as any,
    centerSuggestions: centerSuggestionReducer as any,
    search: searchReducer as any,
    sites: siteReducer as any,
    siteSuggestions: siteSuggestionReducer as any,
    vicinity: vicinityReducer as any,
    placeSuggestions: placeSuggestionReducer as any
});