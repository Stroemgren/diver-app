import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { CardCarousel } from '../../components/CardCarousel';
import { CarouselCard } from '../../components/Cards/CarouselCard';
import { typography } from '../../styles/typography';
import { Display } from '../../components/Typography';
import { SiteCard } from '../../components/Cards/SiteCard';
import { SearchField } from '../../components/SearchField';
import { RootState } from '../../reducers';
import { SlideUpView } from '../../components/SlideUpView';
import { StatusBar } from '../../components/StatusBar';
import { ThunkDispatch } from 'redux-thunk';
import { sitesSelector } from '../../selectors/sites';
import { requestSites } from '../../reducers/sites';
import { ISite } from 'divermodels';

export interface ExploreProps {
    navigation: NavigationScreenProp<any, any>;
    sites: ISite[];
    searchTerm: string;
    requestSites: () => void;
}

const mapStateToProps = (state: RootState) => {
    return { 
        sites: Object.values(sitesSelector(state)),
        searchTerm: state.placeSuggestions.searchTerm
    }; 
  }
  
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        requestSites: () => dispatch(requestSites())
    };
}

class Explore extends React.Component<ExploreProps> {
    static navigationOptions = { header: null };
    private searchView: React.RefObject<SlideUpView> = React.createRef();
    public state: {
        showSearch: boolean;
    }

    constructor(props: ExploreProps) {
        super(props);
        this.state = {
            showSearch: false
        }

        this._showSearch = this._showSearch.bind(this);
    }

    componentWillMount() {
        this.props.requestSites();
    }

    _showSearch() {
        if (this.searchView.current) {
            this.searchView.current.show();
        }
    }

    _renderDestinationCards(): React.ReactElement<any>[] {
        return [
            {title: 'Aqaba', diveSpots: 18, backgroundImage: 'https://cdn2.wanderlust.co.uk/media/1005/cropped-dreamstime_xxl_9483360.jpg?anchor=center&mode=crop&width=1440&height=540&rnd=131789726660000000'},
            {title: 'Sharm el Sheikh', diveSpots: 31, backgroundImage: 'http://www.nadiatravel.com/wp-content/uploads/2017/11/Sharm-El-Sheikh-1.jpg'},
            {title: 'Hurghada', diveSpots: 24, backgroundImage: 'https://img.ev.mu/images/villes/2900/1605x642/2900.jpg'}
        ].map(dest => {
            return (<CarouselCard backgroundImage={dest.backgroundImage}>
                        <View style={{padding: 16, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                            <View>
                                <Text style={[typography.headline, {color: '#fefefe', fontSize: 18}]}>{dest.title}</Text>
                                <Text style={[typography.subheader, {color: '#fefefe', fontSize: 13}]}>{dest.diveSpots} divespots</Text>
                            </View>
                        </View>
                    </CarouselCard>
            );
        });
    }

    _renderWallDiveCards(): React.ReactElement<any>[] {
        return this.props.sites
            .filter(site => site.diveType === 'wall')
            .map(site => {
                return (<SiteCard 
                            site={site}
                            onPress={() => {this.props.navigation.navigate('Site', {site})}}
                        />
                );
            });
    }

    _renderDeepestDivesCards(): React.ReactElement<any>[] {
        return this.props.sites
            .filter(s => s.maxDepth)
            .sort((a, b) => !a.maxDepth || !b.maxDepth || a.maxDepth > b.maxDepth ? 1 : -1)
            .slice(0, 5)
            .map(site => {
                return (<SiteCard 
                            site={site}
                            onPress={() => {this.props.navigation.navigate('Site', {site})}}
                        />
                );
            });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={'#f3f3f3'}></StatusBar>
                <View style={{position: 'absolute', paddingHorizontal: 24, paddingVertical: 48, top: 0, left: 0, right: 0, zIndex: 100 }}>
                    <SearchField value={this.props.searchTerm || undefined} onPress={() => {this.props.navigation.navigate('Search')}} />
                </View>
                <View style={{height: 110, backgroundColor: '#f3f3f3'}}></View>
                <ScrollView style={styles.container}>
                    <View style={{paddingHorizontal: 24, marginTop: 12}}>
                        <Display style={{marginBottom: 24}}>Best of the Red Sea</Display>
                    </View>
                    <CardCarousel cards={this._renderDestinationCards()}></CardCarousel>
                    <View style={{paddingHorizontal: 24, marginTop: 24}}>
                        <Display style={{marginBottom: 24}}>Amazing walldives</Display>
                    </View>
                    <CardCarousel cards={this._renderWallDiveCards()}></CardCarousel>
                    <View style={{paddingHorizontal: 24, marginTop: 24}}>
                        <Display style={{marginBottom: 24}}>The deepest dives</Display>
                    </View>
                    <CardCarousel cards={this._renderDeepestDivesCards()}></CardCarousel>
                    <View style={{height: 48}}></View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)