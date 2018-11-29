import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: '#ccc', 
        paddingVertical: 16
    }
});
