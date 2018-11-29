import React from 'react';
import { ScrollView, View, FlatList, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FactSheet } from '../../components/FactSheet';
import { WeatherSection } from '../../components/WeatherSection';
import { ReadMoreText } from '../../components/ReadMoreText';
import { styles } from './styles';
import { NavigationScreenProp } from 'react-navigation';
import { Title, Caption, SectionTitle } from '../../components/Typography';
import { Container } from '../../components/Container';
import { requestVicinityForCoordinate } from '../../reducers/vicinity';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { nearbyCenters } from '../../selectors/centers';
import { ListItem } from '../../components/ListItem';
import { ICenter, ISite } from 'divermodels';
import { Icon } from 'react-native-elements';

export interface SiteProps {
    navigation: NavigationScreenProp<any, any>
    nearbyCenters: { distance: number, center: ICenter }[];
    requestVicinityForCoordinate: () => void;
}

const mapStateToProps = (state: RootState, props: SiteProps): Pick<SiteProps, 'nearbyCenters'> => {
    const site: ISite = props.navigation.getParam('site');
    const centers = nearbyCenters(site.coordinate)(state).splice(0, 5);
    return { 
        nearbyCenters: centers
    }; 
}
  
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>, props: SiteProps) => {
    const site: ISite = props.navigation.getParam('site');
    return {
        requestVicinityForCoordinate: () => dispatch(requestVicinityForCoordinate(site.coordinate))
    };
}

class Site extends React.Component<SiteProps> {
    public index: number = 0;
    constructor(props: SiteProps) {
        super(props);
    }

    componentDidMount() {
        this.props.requestVicinityForCoordinate();
    }

    render() {
        const site: ISite = this.props.navigation.getParam('site');

        return (
            <ScrollView style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{...site.coordinate, latitudeDelta: 0.05, longitudeDelta: 0.05}}
                >
                    <Marker 
                        key={site.id}
                        coordinate={site.coordinate}
                        title={site.name}
                    />
                </MapView>
                <Container>
                    <Caption>{`${site.ocean}, ${site.country}`}</Caption>
                    <Title>{site.name}</Title>
                </Container>
                <Container>
                    <FactSheet smallLayout={false} diveSpot={site}></FactSheet>
                </Container>
                <Container>
                    {site.description && <ReadMoreText text={site.description}></ReadMoreText>}
                </Container>
                <Container style={{backgroundColor: '#eee', paddingTop: 24}}>
                    <Container style={{paddingHorizontal: 0}}>
                        <SectionTitle style={{marginBottom: 24}}>Upcoming weather</SectionTitle>
                        <WeatherSection latitude={site.coordinate.latitude} longitude={site.coordinate.longitude}></WeatherSection>
                    </Container>
                </Container>
                <Container>
                    <SectionTitle>Dive centers</SectionTitle>
                    <Caption style={{marginBottom: 24}}>Find a dive center with trips to this spot</Caption>
                    <FlatList 
                        data={this.props.nearbyCenters.map(c => ({
                            primaryText: c.center.name.length < 30 ? c.center.name : `${c.center.name.substring(0, 28)}..`, 
                            secondaryText: c.center.address1,
                            leftContent: <Image style={{width: 48, height: 48, borderRadius: 24}} source={{uri: 'http://www.indianpointmarina.com/images/diveshopext.jpg'}}></Image>,
                            rightContent: <View><Icon name={'place'} size={20} iconStyle={{color: 'rgba(0, 0, 0, 0.54)'}} /><Caption>{c.distance.toFixed(1)} km</Caption></View>
                        }))}
                        keyExtractor={(_item, index) => index.toString()}
                        renderItem={({item}) => <ListItem 
                                                    primaryText={item.primaryText} 
                                                    secondaryText={item.secondaryText}
                                                    leftContent={item.leftContent} 
                                                    rightContent={item.rightContent} 
                                                    onPress={() => this.props.navigation.navigate('Center')}
                                                />}
                    />
                </Container>
                <View style={{height: 48}}></View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Site)
