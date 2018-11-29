import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { View, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { IAutoCompleteSuggestion } from '../../models/GooglePlaces';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { requestSuggestions } from '../../reducers/placeSuggestions';
import { connect } from 'react-redux';
import { updateTerm } from '../../reducers/search';
import { SearchResult } from './SearchResult';
import { ISiteSuggestion, ICenterSuggestion } from 'divermodels';
import { siteSuggestionsSelector } from '../../selectors/siteSuggestions';
import { centerSuggestionsSelector } from '../../selectors/centerSuggestions';
import { styles } from './styles';

export interface SearchProps {
    navigation: NavigationScreenProp<any, any>;
    searchTerm: string;
    centerSuggestions: ICenterSuggestion[];
    placeSuggestions: IAutoCompleteSuggestion[];
    siteSuggestions: ISiteSuggestion[];
    requestPlaceSuggestions: (text: string) => void;
    updateSearchTerm: (term: string) => void;
}

const mapStateToProps = (state: RootState) => {
    return {
        searchTerm: state.search.term,
        centerSuggestions: centerSuggestionsSelector(state),
        placeSuggestions: state.placeSuggestions.suggestions,
        siteSuggestions: siteSuggestionsSelector(state)
    }; 
}
  
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        requestPlaceSuggestions: (text: string) => dispatch(requestSuggestions(text)),
        updateSearchTerm: (term: string) => dispatch(updateTerm(term))
    };
}

class Search extends React.Component<SearchProps> {
    static navigationOptions = (navigationOptions: any) => {
        const navigation = navigationOptions.navigation;
        
        return navigation !== undefined ? {
            headerStyle:{ backgroundColor: '#576FE8', border: 'none', shadowColor: 'transparent', borderBottomWidth: 0 },
            headerLeft: (
                <Icon onPress={() => {navigation.goBack()}} name={'clear'} color={'rgba(255, 255, 255, 0.87)'} iconStyle={{ paddingHorizontal: 20 }} />
            )
        } : {}
    };

    constructor(props: SearchProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{paddingHorizontal: 24, marginVertical: 12}}>
                    <TextInput
                        onSubmitEditing={() => {}}
                        onChangeText={this.props.updateSearchTerm}
                        placeholder={'Search a destination'} 
                        placeholderTextColor={'rgba(255, 255, 255, 0.54)'}
                        style={{fontFamily: 'RobotoMedium', fontSize: 28, color: 'rgba(255, 255, 255, 0.87)', marginBottom: 16}} 
                        value={this.props.searchTerm || undefined}
                        autoFocus={true}
                    />
                </View>
                <View style={{height: 1, backgroundColor: 'rgba(255, 255, 255, 0.87)'}}></View>
                <ScrollView style={{paddingHorizontal: 24, paddingTop: 24}}>
                    {this.props.placeSuggestions.map((suggestion, index) => 
                        <SearchResult key={index} icon={'place'} title={suggestion.description} />    
                    )}
                    {this.props.siteSuggestions.map((suggestion, index) => 
                        <SearchResult onPress={() => {this.props.navigation.navigate('Map', { coordinate: suggestion.coordinate })}} key={index} icon={'nature'} title={suggestion.name} />    
                    )}
                    {this.props.centerSuggestions.map((suggestion, index) => 
                        <SearchResult onPress={() => {this.props.navigation.navigate('Map', { coordinate: suggestion.coordinate })}} key={index} icon={'store-mall-directory'} title={suggestion.name} />    
                    )}
                    <View style={{height: 24}}></View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)