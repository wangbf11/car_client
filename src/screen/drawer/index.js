import { Component } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
    createDrawerNavigator,
    DrawerItems, NavigationActions,
    SafeAreaView, StackActions
} from "react-navigation";
import React from "react";
import HomeScreen from "../home/HomeScreen";
import NavigationBar from "../../components/navigationBar";

//抽屉里面第一个页面是TabRoot  这是第二个页面MyNotificationsScreen
class MyNotificationsScreen extends Component {
    static navigationOptions = {
        //{ focused: boolean, tintColor: string }
        drawerLabel: '第一页',
        //{ focused: boolean, tintColor: string }
        drawerIcon: ({ tintColor }) => (
            <Image
                source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                style={{width: 24,height: 24,borderRadius: 12 }}
            />
        ),
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <NavigationBar navigation={this.props.navigation} isBack={true} title={"消息"}
                               isDrawer = {()=>{
                                   this.props.navigation.dispatch(
                                       StackActions.reset({
                                           index: 0,
                                           actions: [
                                               NavigationActions.navigate({
                                                   routeName: "Drawer"
                                               })
                                           ]
                                       })
                                   );
                               }}/>
                <View  style={{ flex: 1, justifyContent: "center",alignItems:"center" }}>
                    <TouchableOpacity
                        onPress={this.goBack.bind(this)}>
                        <Image
                            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                            style={{ width: 80, height: 80,borderRadius: 40 }} />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
    goBack(){
       this.props.navigation.openDrawer();
    }
}

export const MyDrawer = createDrawerNavigator({
        TabRoot: {
            screen: HomeScreen,
        },
        Notifications: {
            screen: MyNotificationsScreen,
        },
    },{
        // order: ['TabRoot', 'Notifications'],//routeNames数组，用于定义抽屉项目的顺序。
        // drawerWidth:100, //一般用默认
        drawerBackgroundColor:"#ffffff",
        initialRouteName: 'TabRoot',//初始路由的routeName。
        drawerLockMode: 'unlocked',//设置是否响应手势
        //'unlocked'   可以通过手势和代码 打开关闭抽屉
        //'locked-closed' 抽屉关闭状态  不能通过手势打开  只能通过代码实现
        //'locked-open'  抽屉打开状态  不能通过手势关闭  只能通过代码实现
        drawerPosition: 'left', //选项是left或right。默认是left位置。
        useNativeAnimations: true, //启用原生动画。默认是true。
        contentOptions:{
            activeTintColor: '#e91e63',
            itemsContainerStyle: {
                marginVertical: 0,
            },
            iconContainerStyle: {
                opacity: 1
            }
        },
        //左边菜单栏样式自定义 默认下面的写法 自定义跳转 的地方props已经传进来
        contentComponent: (props) => (
            <ScrollView>
                <SafeAreaView style={{ flex: 1}}
                              forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.dispatch(
                                StackActions.push({
                                    routeName: 'Balance',
                                })
                            )
                        }}>
                        <Image
                            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                            style={{ width: 30, height: 30,borderRadius: 15 }} />
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }
);
