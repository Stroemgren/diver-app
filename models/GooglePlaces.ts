export interface IAutoCompleteResponse {
    predictions: IAutoCompleteSuggestion[];
}

export interface IAutoCompleteSuggestion {
    description: string;
    id: string;
    place_id: string;
    types: string[];
}

export interface IPlaceResponse {
    results: {
        geometry: {
            location: {
                lat: number,
                lng: number
            }
            viewport: {
                northeast: {
                    lat: number;
                    lng: number;
                },
                southwest: {
                    lat: number;
                    lng: number;
                }
            }
        }
    }
}
