import { StyleSheet, ViewStyle, Dimensions, ImageStyle, TextStyle } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');
const width = viewportWidth - 48;
const height = width / (16/9);

interface Style {
    container: ViewStyle;
    cardStyle: ViewStyle;
    backgroundImageContaier: ViewStyle;
    backgroundImage: ImageStyle;
    backgroundImageOverlay: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        backgroundColor: 'transparent',
        marginBottom: 12,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.25,
        paddingHorizontal: 6
    },
    cardStyle: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        height: height
    },
    backgroundImageContaier: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    backgroundImageOverlay: {
        position: 'absolute',
        height: height / 2,
        right: 0,
        bottom: 0,
        left: 0
    }
});