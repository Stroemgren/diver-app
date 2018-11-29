import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Icon } from 'react-native-elements';
import { StatusBar } from '../StatusBar';

export interface SlideUpViewProps {}

export class SlideUpView extends React.Component<SlideUpViewProps> {
    public state: {
        isHidden: boolean;
    }

    constructor(props: SlideUpViewProps) {
        super(props);
        this.state = {
            isHidden: true
        }
    }

    public show() {
        this.setState({ isHidden: false })
    }

    public hide() {
        this.setState({ isHidden: true })
    }

    render() {
        const containerStyle = [styles.container, (this.state.isHidden ? styles.containerHidden : {})]

        return (
            <View style={containerStyle}>
                <StatusBar></StatusBar>
                <View style={{flexDirection: 'row', padding: 16}}>
                    <Icon onPress={() => this.setState({isHidden: true})} name='clear' size={32} color={'#333'} iconStyle={{marginLeft: -6}} />
                </View>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
