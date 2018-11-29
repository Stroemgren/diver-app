import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import { Text } from 'react-native-elements';

export interface SearchFieldProps {
    value?: string;
    onPress?: () => void;
}

export class SearchField extends React.Component<SearchFieldProps> {
    constructor(props: SearchFieldProps) {
        super(props);
        this._handlePress = this._handlePress.bind(this);
    }

    _handlePress() {
        if (this.props.onPress !== undefined) {
            this.props.onPress();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._handlePress} >
                    {this.props.value !== undefined ? (
                        <Text style={{fontFamily: 'AirbnbCerealBold', fontSize: 14, padding: 16, color: '#333'}}>{this.props.value}</Text>
                    ) : (
                        <Text style={{fontFamily: 'AirbnbCerealBold', fontSize: 14, padding: 16, color: '#999'}}>Search a destination</Text>
                    )}
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
