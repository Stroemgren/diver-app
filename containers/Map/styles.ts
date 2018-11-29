import { StyleSheet, ViewStyle, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

interface Style {
    container: ViewStyle;
    map: ViewStyle
}

export const styles = StyleSheet.create<Style>({
    container: {
        flex: 1
    },
    map: {
        width: viewportWidth,
        height: viewportHeight
    }
});