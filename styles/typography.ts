import { StyleSheet, TextStyle } from 'react-native';

interface Style {
    headline: TextStyle;
    subheader: TextStyle;
    sectionHeader: TextStyle;
}

export const typography = StyleSheet.create<Style>({
    headline: {
        color: '#333',
        fontFamily: 'AirbnbCereal',
        fontSize: 28,
        fontWeight: "700"
    },
    subheader: {
        color: '#777',
        fontFamily: 'AirbnbCereal',
        fontSize: 14,
        fontWeight: "700"   
    },
    sectionHeader: {
        color: '#333',
        fontFamily: 'AirbnbCereal',
        fontSize: 14,
        fontWeight: "700"   
    }
});