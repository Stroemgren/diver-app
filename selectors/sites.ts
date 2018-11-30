import { RootState } from "../reducers";
import { ISite } from "divermodels";

export const sitesSelector: (state: RootState) => { [key: string]: ISite } = state => state.sites.toObject();