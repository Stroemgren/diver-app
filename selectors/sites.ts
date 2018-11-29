import { RootState } from "../reducers";
import { ISite, ICoordinate } from "divermodels";
import { createSelector } from "reselect";
import { vicinitySelector } from "./vicinity";

export const sitesSelector: (state: RootState) => { [key: string]: ISite } = state => state.sites.toObject();

export const nearbySites = (coordinate: ICoordinate) => {
    return createSelector(
        sitesSelector, 
        vicinitySelector(coordinate), 
        (sites, vicinity): { distance: number, site: ISite }[] => {
            return vicinity !== undefined 
                ?  vicinity.locations
                        .map(l => ({ distance: l.distance, site: sites[l.locationId] }))
                        .filter(c => c.site !== undefined)
                : [];
        });
}