import React, { createRef, RefObject } from 'react';
import { View } from 'react-native';
import MapView, { Marker, MapEvent, LatLng } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';
import { styles } from './styles';
import { icons } from '../../icons';
import { CardCarousel } from '../../components/CardCarousel';
import { SiteCard } from '../../components/Cards/SiteCard';
import { SearchField } from '../../components/SearchField';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { ISite, ICoordinate, ICenter } from 'divermodels';
import { requestSites } from '../../reducers/sites';
import { nearbySites } from '../../selectors/sites';
import { nearbyCenters } from '../../selectors/centers';
import { requestVicinityForCoordinate } from '../../reducers/vicinity';
import { nearbyLocations } from '../../selectors/vicinity';
import { LocationSearch } from '../../components/LocationSearch';
import { CarouselCard } from '../../components/Cards/CarouselCard';
import { Title } from '../../components/Typography';

export interface MapProps {
    navigation: NavigationScreenProp<any, any>;
    sites: ISite[];
    centers: ICenter[];
    locations: { type: 'site' | 'center', distance: number, item: ISite | ICenter }[];
    requestSites: () => void;
    requestVicinity: () => void;
}

const mapStateToProps = (state: RootState, props: MapProps) => {
    const coordinate: ICoordinate = props.navigation.getParam('coordinate');

    return { 
        sites: nearbySites(coordinate)(state).map(n => n.site),
        centers: nearbyCenters(coordinate)(state).map(n => n.center),
        locations: nearbyLocations(coordinate)(state)
    }; 
  }
  
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>, props: MapProps) => {
    const coordinate: ICoordinate = props.navigation.getParam('coordinate');

    return {
        requestSites: () => dispatch(requestSites()),
        requestVicinity: () => dispatch(requestVicinityForCoordinate(coordinate))
    };
}

class Map extends React.Component<MapProps> {
    private mapView: RefObject<MapView> = createRef();
    private cardCarousel: RefObject<CardCarousel> = createRef();
    private initialCoordinate: ICoordinate = this.props.navigation.getParam('coordinate', undefined);
    private selectedLocation: ISite | ICenter = this.props.navigation.getParam('selectedLocation', undefined);

    public state: {
        selectedSiteId: string | null;
    }

    constructor(props: MapProps) {
        super(props);
        this.state = { selectedSiteId: null }
        console.log(this.initialCoordinate)
        this._selectLocation = this._selectLocation.bind(this);
    }

    componentWillMount(){
        this.props.requestSites();
        this.props.requestVicinity();
    }

    componentDidMount() {
        if (this.selectedLocation !== undefined) {
            const index = this.props.locations.findIndex(l => l.item.id === this.selectedLocation.id);
            if (index) {
                this._selectLocation(index, true)
            }
        }
        
    }

    _selectLocation(index: number, initializeZoom: boolean = false) {
        const site = this.props.sites[index];
        
        if (site && this.mapView.current && this.cardCarousel.current) {
            this.setState({selectedSiteId: site.id});
            this.cardCarousel.current.moveToItem(index);

            if (initializeZoom) {
                this.mapView.current.animateToRegion({...site.coordinate, latitudeDelta: 0.02, longitudeDelta: 0.02});
            } else {
                this.mapView.current.animateToCoordinate(site.coordinate);
            }
        }
    }

    _renderCards(locations: any) {
        return locations.map((l: any) => {
            return l.type === 'site' ? 
                <SiteCard
                    site={l.item}
                    onPress={() => {this.props.navigation.navigate('Site', {site: l.item})}}
                /> :
                <CarouselCard
                    style={{height: 125, backgroundColor: '#55E8D2'}}
                    onPress={() => {this.props.navigation.navigate('Center')}}
                >
                    <Title theme={'light'}>{l.item.name}</Title>
                </CarouselCard>
        })
        /*
        return sites.map(site => {
            return (
                <SiteCard
                    site={site}
                    onPress={() => {this.props.navigation.navigate('Site', {site: site})}}
                />
            )
        });
        */
    }

    render() {
        const location: string = this.props.navigation.getParam('location');

        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', paddingHorizontal: 24, paddingVertical: 48, top: 0, left: 0, right: 0, zIndex: 500 }}>
                    <SearchField value={location}/>
                </View>
                <MapView
                    ref={this.mapView}
                    style={styles.map}
                    initialRegion={{
                        ...this.initialCoordinate,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                >
                    {this.props.locations.map((location, index) => 
                        <Marker 
                            key={location.item.id}
                            identifier={location.item.id}
                            coordinate={location.item.coordinate}
                            onPress={(e: MapEvent) => this._selectLocation(index)}
                            image={location.type === 'site' ? icons[`marker${this.state.selectedSiteId === location.item.id ? 'Selected' : ''}`] : icons[`centerMarker${this.state.selectedSiteId === location.item.id ? 'Selected' : ''}`]}
                        />
                    )}
                    
                </MapView>
                <View style={{position: 'absolute', bottom: 12}}>
                    <CardCarousel
                        ref={this.cardCarousel} 
                        cards={this._renderCards(this.props.locations)}
                        onItemSnap={this._selectLocation}
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)