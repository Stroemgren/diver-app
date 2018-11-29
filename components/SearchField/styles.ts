import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        backgroundColor: '#fff', 
        height: 48, 
        display: 'flex', 
        borderRadius: 4, 
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.25,
    }
});