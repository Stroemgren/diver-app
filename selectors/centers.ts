import { RootState } from '../reducers';
import { ICenter } from 'divermodels';

export const centersSelector: (state: RootState) => { [key: string]: ICenter } = state => state.centers.toObject();
