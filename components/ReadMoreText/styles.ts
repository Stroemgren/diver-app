import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type Style = {
    text: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
};

export const styles = StyleSheet.create<Style>({
    text: {
        fontFamily: 'AirbnbCerealBook'
    },
    button: {

    },
    buttonText: {
        color: '#3c96ff',
        paddingTop: 2
    }
});