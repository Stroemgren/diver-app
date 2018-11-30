import React, { createRef, RefObject } from 'react';
import { View } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
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
import { requestVicinityForCoordinate } from '../../reducers/vicinity';
import { nearbyLocations } from '../../selectors/vicinity';
import { CarouselCard } from '../../components/Cards/CarouselCard';
import { Title } from '../../components/Typography';

export interface MapProps {
    navigation: NavigationScreenProp<any, any>;
    locationId: string;
    locations: { type: 'site' | 'center', distance: number, item: ISite | ICenter }[];
    requestSites: () => void;
    requestVicinity: () => void;
}

const mapStateToProps = (state: RootState, props: MapProps) => {
    const coordinate: ICoordinate = props.navigation.getParam('coordinate');

    return { 
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

    public state: {
        selectedLocationId: string | null;
    }

    constructor(props: MapProps) {
        super(props);
        this.state = { selectedLocationId: null }
        this._selectLocation = this._selectLocation.bind(this);
    }

    componentWillMount() {
        this.props.requestVicinity();
    }

    getDerivedStateFromProps(nextProps: MapProps) {
        if (nextProps.locationId && (nextProps.locationId !== this.props.locationId || nextProps.locations.length !== this.props.locations.length)) {
            const index = nextProps.locations.findIndex(l => l.item.id === nextProps.locationId);
            this._selectLocation(index, true);
        }
    }

    _selectLocation(index: number, initializeZoom: boolean = false) {
        const location = this.props.locations[index];
        
        if (location && this.mapView.current && this.cardCarousel.current) {
            this.setState({selectedLocationId: location.item.id});
            this.cardCarousel.current.moveToItem(index);

            if (initializeZoom) {
                this.mapView.current.animateToRegion({...location.item.coordinate, latitudeDelta: 0.02, longitudeDelta: 0.02});
            } else {
                this.mapView.current.animateToCoordinate(location.item.coordinate);
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
        });
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
                            title={location.item.name}
                            image={location.type === 'site' ? icons[`marker${this.state.selectedLocationId === location.item.id ? 'Selected' : ''}`] : icons[`centerMarker${this.state.selectedLocationId === location.item.id ? 'Selected' : ''}`]}
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