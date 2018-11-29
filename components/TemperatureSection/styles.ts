import { StyleSheet, ViewStyle } from 'react-native';

type Style = {
    container: ViewStyle;
    infoLine: ViewStyle;
    infoLineDivider: ViewStyle;
    dot: ViewStyle;
};

export const styles = StyleSheet.create<Style>({
    container: {
    
    },
    infoLine: {
        display: 'flex', 
        flexDirection: 'row', 
        marginVertical: 16, 
        alignItems: 'center'
    },
    infoLineDivider: {
        width: 12
    },
    dot: {
        height: 12, 
        width: 12, 
        borderRadius: 6, 
        marginRight: 4
    }
});