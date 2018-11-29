import React from 'react';
import { AppLoading, Font } from 'expo';
import NavigationStack from './navigation/NavigationStack';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import thunkMiddleware from 'redux-thunk'
import { StatusBar, View } from 'react-native';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

export default class App extends React.Component {
    public state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete) {
            return (
            <AppLoading
                startAsync={this._loadResourcesAsync}
                onError={this._handleLoadingError}
                onFinish={this._handleFinishLoading}
            />
            );
        } else {
            return ( 
                <Provider store={store}>
                    <View style={{flex: 1}}>
                        <NavigationStack />
                    </View>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async (): Promise<void> => {
        return Font.loadAsync({
            'AirbnbCereal': require('./assets/fonts/AirbnbCereal-Medium.ttf'),
            'AirbnbCerealBlack': require('./assets/fonts/AirbnbCereal-Black.ttf'),
            'AirbnbCerealBold': require('./assets/fonts/AirbnbCereal-Bold.ttf'),
            'AirbnbCerealBook': require('./assets/fonts/AirbnbCereal-Book.ttf'),
            'AirbnbCerealMedium': require('./assets/fonts/AirbnbCereal-Medium.ttf'),
            'AirbnbCerealLight': require('./assets/fonts/AirbnbCereal-Light.ttf'),
            'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
            'RobotoLight': require('./assets/fonts/Roboto-Light.ttf'),
            'RobotoMedium': require('./assets/fonts/Roboto-Medium.ttf')
        });
    };
    
    _handleLoadingError = (error: any) => {
        console.warn(error);
    };
    
    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}
