import { StyleSheet, ViewStyle, Platform } from 'react-native';

interface Style {
    container: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        height: (Platform.OS === 'ios') ? 18 : 0
    }
});
