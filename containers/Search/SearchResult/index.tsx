import * as React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Title } from '../../../components/Typography';
import { styles } from './styles';

export interface SearchResultProps {
    title: string;
    icon: string;
    onPress?: () => void;
}

export class SearchResult extends React.Component<SearchResultProps> {
    constructor(props: SearchResultProps) {
        super(props);
        this._handleOnPress = this._handleOnPress.bind(this);
    }

    _handleOnPress() {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._handleOnPress}>
                <View style={styles.container}>
                    <Icon name={this.props.icon} size={24} color={'rgba(255, 255, 255, 0.87)'} iconStyle={{marginRight: 12}} />
                    <Title theme={'light'}>{this.props.title}</Title>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}