import { RootState } from '../reducers';
import { createSelector } from 'reselect';
import { vicinitySelector } from './vicinity';
import { ICoordinate } from 'divermodels';
import { ICenter } from 'divermodels';

export const centersSelector: (state: RootState) => { [key: string]: ICenter } = state => state.centers.toObject();

export const nearbyCenters = (coordinate: ICoordinate) => {
    return createSelector(
        centersSelector, 
        vicinitySelector(coordinate), 
        (centers, vicinity): { distance: number, center: ICenter }[] => {
            return vicinity !== undefined 
                ?  vicinity.locations
                        .map(l => ({ distance: l.distance, center: centers[l.locationId] }))
                        .filter(c => c.center !== undefined)
                : [];
        });
}