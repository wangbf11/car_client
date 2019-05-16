import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from '../home/HomeScreen'
import MessageScreen from '../messages/MyMessageScreen'
import MyScreen from '../mine/MineScreen'
import React from "react";
import image from "../../assets/image";

const setIcon = function ({ ...set }) {
    return (
        <Image
            source={set.focused ? set.selectSource : set.source}
            style={{
                width: 20,
                height: 20
            }}
        />
    )
}

const setMyIcon = function ({ ...set }) {
    return (
        <Image
            source={set.focused ? set.selectSource : set.source}
            style={{
                width: 42,
                height: 40,
                marginTop: -18
            }}
        />
    )
}

export const TabRoot = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "首页",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: image.home_g,
                            selectSource: image.home_c,
                        })
                    }
                }
            }
        },
        message: {
            screen: MessageScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "消息",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: image.video_g,
                            selectSource: image.video_c
                        })
                    }
                }
            }
        },
        My: {
            screen: MyScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "我的",
                    tabBarIcon: state => {
                        return setMyIcon({
                            ...state,
                            source: image.my_g,
                            selectSource: image.my_c
                        })
                    }
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#FFCD07",
            inactiveTintColor: "#808080",
            labelStyle: {
                fontSize: 10,
            },
            // style: {
            //     marginLeft: 10,
            //     marginRight: 10
            // },//位置是可以设置的
            // indicatorStyle: {backgroundColor: "red" } // 设置线无效
        }
    }
)

const styles = StyleSheet.create({
    iconbox: {
        position: "relative"
    },
    text: {
        position: "absolute",
        right: -5,
        top: 0,
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: "red"
    }
});
