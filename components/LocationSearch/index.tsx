import React from 'react';
import { TextInput, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { IAutoCompleteSuggestion } from '../../models/GooglePlaces';
import { Icon } from 'react-native-elements';

export interface LocationSearchProps {
    placeSuggestions: IAutoCompleteSuggestion[];
    onChange: (text: string) => void;
    onLocationSelect?: (placeId: string, location: string) => void;
}

export class LocationSearch extends React.Component<LocationSearchProps> {
    constructor(props: LocationSearchProps) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._handleLocationSelect = this._handleLocationSelect.bind(this);
    }

    private _handleChange(text: string) {
        this.props.onChange(text)
    }

    private _handleLocationSelect(placeId: string, location: string) {
        if (this.props.onLocationSelect) {
            this.props.onLocationSelect(placeId, location);
        }
    }

    render() {
        return (
            <View>
                <View style={{paddingHorizontal: 16}}>
                    <TextInput 
                        onSubmitEditing={() => {}}
                        onChangeText={this._handleChange}
                        placeholder={'Search a destination'} 
                        placeholderTextColor={'#999'}
                        style={{fontFamily: 'AirbnbCerealBold', fontSize: 24, marginBottom: 16}} 
                    />
                </View>
                <View style={{height: 1, backgroundColor: '#999'}}></View>
                <ScrollView style={{padding: 16}}>
                    {this.props.placeSuggestions.map((suggestion, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => {this._handleLocationSelect(suggestion.place_id, suggestion.description)}}>
                                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 16}}>
                                    <Icon name="place" size={24} color={'#333'} iconStyle={{marginRight: 12}} />
                                    <Text style={{fontSize: 18, fontFamily: 'AirbnbCerealMedium', color: '#333'}}>{suggestion.description}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}
