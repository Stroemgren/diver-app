import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import { Title, Subtitle } from '../Typography';

export interface ListItemProps {
    primaryText: JSX.Element | string;
    secondaryText?: JSX.Element | string;
    leftContent?: JSX.Element;
    rightContent?: JSX.Element;
    onPress?: () => void;
}

export class ListItem extends React.Component<ListItemProps> {
    constructor(props: ListItemProps) {
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
                    {this.props.leftContent ?
                        <View style={styles.leftContent}>
                            {this.props.leftContent}
                        </View> : null
                    }
                    <View style={styles.textContent}>
                        {typeof this.props.primaryText === 'string' ? (
                            <Title style={{fontSize: 16}}>{this.props.primaryText}</Title>
                        ) : (this.props.primaryText)}
                        {typeof this.props.secondaryText === 'string' ? (
                            <Subtitle style={{fontSize: 13}}>{this.props.secondaryText}</Subtitle>
                        ) : (this.props.secondaryText)}
                    </View>
                    {this.props.rightContent ?
                        <View style={styles.rightContent}>
                            {this.props.rightContent}
                        </View> : null
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}