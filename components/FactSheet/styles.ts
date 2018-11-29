import { StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native';

type Style = {
    factSheet: ViewStyle;
    factSheetItem: ViewStyle;
    factSheetIcon: ViewStyle;
    factSheetIconImage: ImageStyle;
    factSheetText: ViewStyle;
    factSheetKeyText: TextStyle;
    factSheetValueText: TextStyle;
    smallFactSheetIcon: ViewStyle;
    smallFactSheetIconImage: ImageStyle;
    smallFactSheetKeyText: TextStyle;
    smallFactSheetValueText: TextStyle;
};

export const styles = StyleSheet.create<Style>({
    factSheet: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    factSheetItem: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    factSheetIcon: {
        height: 48, 
        width: 48, 
        borderRadius: 25, 
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.87)',
        marginRight: 8
    },
    factSheetIconImage: {
        height: 24,
        width: 24,
        tintColor: '#fff',
    },
    factSheetText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    factSheetKeyText: {
        fontSize: 11,
        fontWeight: '100',
        fontFamily: 'RobotoRegular',
        color: '#777'
    },
    factSheetValueText: {
        fontWeight: '700',
        fontFamily: 'RobotoMedium',
        color: '#333'
    },
    smallFactSheetIcon: {
        height: 32, 
        width: 32, 
    },
    smallFactSheetIconImage: {
        height: 18,
        width: 18,
        margin: 7
    },
    smallFactSheetKeyText: {
        fontSize: 10,
        fontWeight: '100',
        fontFamily: 'RobotoRegular',
        color: '#777'
    },
    smallFactSheetValueText: {
        fontSize: 11,
        fontWeight: '700',
        fontFamily: 'RobotoMedium',
        color: '#333'
    },
});