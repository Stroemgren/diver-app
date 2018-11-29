import { StyleSheet, ViewStyle, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

interface Style {
    container: ViewStyle;
    map: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        height: 200,
        marginBottom: 24,
        width: viewportWidth
    }
});
