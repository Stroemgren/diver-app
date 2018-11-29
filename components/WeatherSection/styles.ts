import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Style = {
    weatherSection: ViewStyle;
    dayText: TextStyle;
    degresstext: TextStyle;
    weatherIcon: ImageStyle;
};

export const styles = StyleSheet.create<Style>({
    weatherSection: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    dayText: {
        color: '#777',
        fontSize: 11
    },
    degresstext: {
        color: '#777',
        fontSize: 14
    },
    weatherIcon: {
        height: 36,
        width: 36,
        marginVertical: 8,
        tintColor: '#ffbf43'
    }
});