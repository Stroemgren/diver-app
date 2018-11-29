import * as React from 'react';
import { View } from 'react-native';

export interface ContainerProps {
    style?: {};
}

export class Container extends React.Component<ContainerProps> {
    constructor(props: ContainerProps) {
        super(props);
    }

    render() {
        return (
            <View
                style={[{paddingHorizontal: 16, marginBottom: 24}, this.props.style || {}]}
            >
                {this.props.children}
            </View>
        )
    }
}