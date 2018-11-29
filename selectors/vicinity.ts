import { VicinityState } from "../reducers/vicinity";
import { RootState } from "../reducers";
import { ICoordinate, IVicinity, ISite, ICenter } from "divermodels";
import { createSelector } from "reselect";
import { centersSelector } from "./centers";
import { sitesSelector } from "./sites";

export const vicinitiesSelector: (state: RootState) => VicinityState = state => state.vicinity;

export const vicinitySelector = (coordinate: ICoordinate) => {
    return createSelector(
        vicinitiesSelector,
        (vicinities): IVicinity => {
            return vicinities[`${coordinate.latitude},${coordinate.longitude}`] || undefined
        }
    )
}

export const nearbyLocations = (coordinate: ICoordinate) => {
    return createSelector(
        vicinitySelector(coordinate),
        centersSelector,
        sitesSelector,
        (vicinity, centers, sites): { type: 'site' | 'center', distance: number, item: ISite | ICenter }[] => {
            if (vicinity === undefined) {
                return [];
            }

            return vicinity.locations.map(l => {
                let item: ISite | ICenter | undefined = undefined;

                if (l.locationType === 'site') {
                    item = sites[l.locationId];
                } else if (l.locationType === 'center') {
                    item = centers[l.locationId];
                }

                return {
                    type: l.locationType,
                    distance: l.distance,
                    item
                }
            })
            .filter(l => l.item !== undefined)
            .sort((a, b) => a.distance < b.distance ? 1 : -1) as { type: 'site' | 'center', distance: number, item: ISite | ICenter }[]
        }
    )
}