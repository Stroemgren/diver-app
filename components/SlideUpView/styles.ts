import { StyleSheet, ViewStyle, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

interface Style {
    container: ViewStyle;
    containerHidden: ViewStyle;
    content: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        position: 'absolute',
        bottom: 0,
        height: viewportHeight,
        width: viewportWidth,
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        zIndex: 500
    },
    containerHidden: {
        height: 0
    },
    content: {
        
    }
});
