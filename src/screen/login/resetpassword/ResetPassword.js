import React, { PureComponent } from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Platform,
    TouchableOpacity,
    Keyboard, StyleSheet
} from 'react-native'
import { statusBarHeight, safeAreaBottomHeight, LoginToken,screenHeight } from '../../../util/AdapterUtil'
import NavigationService from '../../../components/NavigationService'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import actions from "../../../models/actions";
import { connect } from 'react-redux'
import NavigationBar from "../../../components/navigationBar";
import {StackActions} from "react-navigation";
import DeviceInfo from "react-native-device-info";

class ResetPassword extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            password1: "",
            password2: "",
            token: "",
            canClick: true,
        }
    }
    componentWillUnmount() {

    }
    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavigationBar navigation={this.props.navigation} isBack={true} />
                <KeyboardAwareScrollView>
                    <TouchableOpacity onPress={this.hiddenKeyborad.bind(this)} activeOpacity={1} style={{ height: screenHeight - safeAreaBottomHeight - statusBarHeight - 44 - 10}}>
                        <Text style={{ color: "#202020",marginTop: 32, fontSize: 35, fontWeight: "bold", marginLeft:15 }}>找回密码</Text>
                        <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, marginTop : 35,paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>
                            <TextInput style={{ padding : 0, color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                                       placeholder={"请输入新密码"} keyboardType={"numeric"}
                                       secureTextEntry = {true}
                                       selectionColor={'#4A90E2'}
                                       onChangeText={text => this.setState({
                                           password1: text
                                       })} />
                        </View>

                        <View style={{height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                        <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>
                            <TextInput style={{ padding : 0, color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                                       placeholder={"请再次输入新密码"} keyboardType={"numeric"}
                                       secureTextEntry = {true}
                                       selectionColor={'#4A90E2'}
                                       onChangeText={text => this.setState({
                                           password2: text
                                       })} />
                        </View>

                        <TouchableOpacity style={{ marginTop: 30, marginLeft: 20, marginRight: 20, height: 45, borderRadius: 3, backgroundColor: "#3591FF", justifyContent: "center", alignItems: "center" }}
                                          onPress={this.resetPassword.bind(this)} disabled={!this.state.canClick}>
                            <Text style={{ color: "#fff", fontSize: 14 }}>下一步</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                <View style={{ height: safeAreaBottomHeight }} />
            </View>
        )
    }

    hiddenKeyborad() {
        Keyboard.dismiss();
    }

    resetPassword() {
        clearInterval(this.interval)
        NavigationService.reset('Drawer');
        return

    }

    //保存数据
    saveDataToStorage = async (token) => {
        global.storage.save({
            key: LoginToken,
            data: token,
            expires: null
        })
    }
}

const styles =  StyleSheet.create({
    loginTitle: {
        marginLeft: 15,
        marginTop: 25,
        color: "#202020",
        fontSize: 30,
        fontWeight: "bold"
    }
})

export default connect(
    ({ userInfo }) => ({
        userInfo
    }), {
        getLoginToken: actions.getLoginToken
    }
)(ResetPassword)

