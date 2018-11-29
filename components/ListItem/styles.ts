import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle;
    leftContent: ViewStyle;
    textContent: ViewStyle;
    rightContent: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        height: 48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16
    },
    leftContent: {
        
    },
    textContent: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        height: 48,
        marginHorizontal: 8,
        overflow: 'hidden'
    },
    rightContent: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        justifyContent: 'center',
        height: 48
    }
});
