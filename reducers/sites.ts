import { createAction, createReducer } from 'redux-act';
import { Dispatch } from 'redux';
import { Map } from 'immutable';
import { ISite } from 'divermodels';

export type SiteState = Map<string, ISite>;

export function requestSites() {
    return (dispatch: Dispatch) => {
        fetch(`http://68.183.67.209/api/site`)
            .then((response) => response.json())
            .then((sites) => {
                dispatch(addSites(sites));
            })
            .catch((error) =>{
                // TODO: Proper error handling
                console.error(error);
            });
    };
}

export function requestCentersById(ids: string[]) {
    return (dispatch: Dispatch) => {
        fetch(`http://68.183.67.209/api/site/${ids.join(',')}`)
            .then((response) => response.json())
            .then((sites) => {
                dispatch(addSites(sites));
            })
            .catch((error) =>{
                // TODO: Proper error handling
                console.error(error);
            });
    };
}

const addSite = createAction('ADD_SITE', (site: ISite) => ({site}));
const addSites = createAction('ADD_SITES', (sites: ISite[]) => ({sites}));

const initialState: SiteState = Map();

export const siteReducer = createReducer((on) => {
    on(addSite, (state: SiteState, payload) => {
        return state.set(payload.site.id, payload.site);
    });
    on(addSites, (state: SiteState, payload) => {
        let newState = state;
        payload.sites.forEach(s => {
            newState = newState.set(s.id, s);
        });
        
        return newState;
    });
}, initialState)