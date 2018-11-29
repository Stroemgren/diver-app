import React from 'react';
import { View, Image, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo';

export interface CarouselCardProps {
    backgroundImage?: string;
    style?: ViewStyle;
    onPress?: () => void;
}

export class CarouselCard extends React.Component<CarouselCardProps> {
    constructor(props: CarouselCardProps) {
        super(props);
        this._handlePress = this._handlePress.bind(this);
    }

    _handlePress(): void {
        if (this.props.onPress !== undefined) {
            this.props.onPress();
        }
    }

    render() {
        const { backgroundImage } = this.props;
        const cardStyle = [styles.cardStyle, this.props.style];

        return (
            <TouchableWithoutFeedback onPress={this._handlePress}>
                <View style={styles.container}>
                    <View style={cardStyle}>
                        {backgroundImage !== undefined && (
                            <View style={styles.backgroundImageContaier}>
                                <Image
                                    style={styles.backgroundImage}
                                    source={{ uri: backgroundImage }}
                                />
                                <LinearGradient style={styles.backgroundImageOverlay} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}></LinearGradient>
                            </View>
                        )}
                        {this.props.children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}