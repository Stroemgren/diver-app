import * as React from 'react';
import { createStackNavigator, createNavigationContainer } from 'react-navigation';
import Explore from '../containers/Explore';
import Site from '../containers/Site';
import Map from '../containers/Map';
import Search from '../containers/Search';
import { Button } from 'react-native';
import Center from '../containers/Center';

const MainStack = createStackNavigator(
    {
        Explore: Explore,
        Site: Site,
        Map: Map,
        Center: Center
    },
    {
        initialRouteName: 'Explore',
        navigationOptions: {
            headerTransparent: true
        }
    }
);

const ModalStack = createStackNavigator(
    {
        Search: {
            screen: Search
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            const params = navigation.state.params || {};
        
            return {
                headerLeft: (
                    <Button
                        onPress={() => navigation.navigate('MyModal')}
                        title="Info"
                        color="#fff"
                    />
                )
            };
        }
    }
)

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack
        },
        Modals: {
            screen: ModalStack
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default RootStack;