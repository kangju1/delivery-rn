import React from 'react';
import {Easing, Animated, SafeAreaView} from 'react-native';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import StackViewStyleInterpolator from  'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../pages/Splash';
import OrderList from '../pages/OrderList';
import Login from '../pages/Login';
import OrderDetail from '../pages/OrderDetail';
import OrderRegister from '../pages/OrderRegister';
import MapSelect from '../pages/MapSelect';



const StackNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: Login,
    },
    OrderList: {
        screen: OrderList,
    },
    OrderDetail: {
        screen: OrderDetail,
    },
    OrderRegister: {
        screen: OrderRegister,
    },
    MapSelect: {
        screen: MapSelect,
    }
},{
    initialRouteName: 'Splash',
    transitionConfig: (navigation) => {
        return {
            transitionSpec: {
                duration: 500,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator: (screenProps) => {
                return StackViewStyleInterpolator.forHorizontal(screenProps)
            }
        }
    },
    headerLayoutPreset: 'center',
});


export default createAppContainer(StackNavigator)
