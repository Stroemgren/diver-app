import { IAutoCompleteSuggestion } from "../models/GooglePlaces";
import { CenterState } from "./centers";
import { VicinityState } from "./vicinity";
import { SiteState } from "./sites";
import { SearchState } from "./search";
import { SiteSuggestionState } from "./siteSuggestions";
import { CenterSuggestionState } from "./centerSuggestions";

export interface RootState {
    centers: CenterState;
    centerSuggestions: CenterSuggestionState;
    search: SearchState;
    sites: SiteState;
    siteSuggestions: SiteSuggestionState;
    vicinity: VicinityState;
    placeSuggestions: PlaceSuggestionState;
}

export type PlaceSuggestionState = {
    isFetching: boolean;
    suggestions: IAutoCompleteSuggestion[],
    searchTerm: string;
}
