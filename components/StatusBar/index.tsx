import React from 'react';
import { View, StatusBarIOS } from 'react-native';
import { styles } from './styles';


export interface StatusBarProps {
    backgroundColor?: string;
}

export class StatusBar extends React.Component<StatusBarProps> {
    constructor(props: StatusBarProps) {
        super(props);
    }

    render() {
        const backgroundColor = this.props.backgroundColor !== undefined ? this.props.backgroundColor : '#fff';
        
        return (
            <View style={[styles.container, {backgroundColor}]}></View>
        );
    }
}
