import React, { PureComponent } from 'react'

import {
    Image,
    Platform,
    View,
    StatusBar,
    Animated,
    Easing
} from 'react-native'

import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator, StackActions
} from 'react-navigation'

import image from "./assets/image"

import LoginScreen from './screen/login/phone/LoginScreen'

import ForgetPasswordScreen from './screen/login/code/ForgetPasswordScreen'

import WelcomeScreen from './screen/welcome/WelcomeScreen'
import BindPhoneScreen from './screen/login/bindphone'
import ResetPassword from './screen/login/resetpassword/ResetPassword'
import BackTwiceExitApp from './components/BackTwiceExitApp'
import Toast from './components/Toast'
import Loading from './components/Loading'
import NavigationService from './components/NavigationService';
import CodePush from 'react-native-code-push'
import {MyDrawer} from './screen/drawer'
const navigator = createStackNavigator(
    {
        welcome: {
            screen: WelcomeScreen
        },
        Drawer: {
            screen: MyDrawer
        },
        login: {
            screen: LoginScreen,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        ForgetPassword: {
            screen: ForgetPasswordScreen,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        bindphone: {
            screen: BindPhoneScreen
        },
        ResetPassword: {
            screen: ResetPassword
        },
    },
    {
        initialRouteName: 'welcome',
        headerMode: 'screen',
        defaultNavigationOptions: {
            header: null,
        },
        // 页面切换动画
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const width = layout.initWidth;
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateX }] };
            },
        }),
    }
)

const RootRouter = createAppContainer(navigator)

class Route extends PureComponent {
    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle={this.props.barStyle || 'dark-content'}
                    backgroundColor={this.props.statusBarBgColor || 'transparent'}
                    translucent={true} />
                <RootRouter ref={(e) => { NavigationService.setTopLevelNavigator(e) }}/>
                <Toast ref={(e) => { e && (global.Toast = e) }} position={'center'} />
                <Loading ref={(e) => { e && (global.Loading = e) }} />
                <BackTwiceExitApp />
            </View>
        );
    }
}
let codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency : CodePush.CheckFrequency.MANUAL
};
//这一行是必须的
export default CodePush( codePushOptions )( Route );
