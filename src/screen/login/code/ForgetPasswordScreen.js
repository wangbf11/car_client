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

class ForgetPasswordScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            phoneText: "",
            password: "",
            token: "",
            canClick: true,
            countTime: 60
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    componentDidMount() {
        this._countDownAction()
    }

    //倒计时
    _countDownAction() {
        let codeTime = this.state.countTime
        this.interval = setInterval(() => {
            if (codeTime == 1) {
                this.setState({ countTime: 60, isCountTime: false })
                clearInterval(this.interval)
            }
            else {
                codeTime = codeTime - 1
                this.setState({ countTime: codeTime, isCountTime: true })
            }
        }, 1000)
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
                                       placeholder={"请输入手机号"} keyboardType={"numeric"}
                                       onChangeText={text => this.setState({
                                           phoneText: text
                                       })} />
                        </View>

                        <View style={{height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                        <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>
                            <TextInput style={{ padding : 0, color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                                       placeholder={"请输入验证码"} keyboardType={"numeric"}
                                       selectionColor={'#4A90E2'}
                                       onChangeText={text => this.setState({
                                           password: text
                                       })} />
                            <View style={{ marginTop: this.state.isCountTime ? 17 : 35,width: 100, height: 30,alignItems: "center", borderRadius: 3,
                                borderWidth: 1,
                                borderColor: "#4A90E2",  justifyContent: "center",}}>

                                {this.state.isCountTime ?
                                    <Text style={{ color: "#4A90E2", fontSize: 12 }}>
                                        {this.state.countTime}s
                                    </Text>
                                    :
                                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}
                                                      onPress={this.getMessageCode.bind(this)}>
                                        <Text style={{ color: "#4A90E2", fontSize: 12 }}>重新发送</Text>
                                    </TouchableOpacity>}

                            </View>
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


    setCodeValue(value) {
        if (value.length > 4) {
            return
        }
        this.setState({ code: value })
        if (value.length == 4) {
            this.loginAction(value)
        }
    }

    getMessageCode() {
        this.setState({ countTime: 60 })
    }
    resetPassword() {
        clearInterval(this.interval)
        NavigationService.navigate("ResetPassword")

        // this.setState({
        //     canClick: false
        // })
        // let phone = this.state.phoneText
        // if (phone.length == 0) {
        //     this.refs.toast.show("请输入手机号", 1000)
        //     this.setState({
        //         canClick: true
        //     })
        //     return
        // }
        // if (phone.length == 11) {
        //     if (phone.slice(0, 1) == '1') {
        //         if (!(phone.slice(0, 2) == '12')) {
        //             this.props.getUserMessgaeCode({ mobile: phone })
        //                 .then((res) => {
        //                     if (res && res.error_code == 0) {
        //                         this.setState({
        //                             canClick: true
        //                         })
        //                         this.props.navigation.dispatch(
        //                             StackActions.push({
        //                                 routeName: "code",
        //                                 params: phone
        //                             })
        //                         )
        //                     }
        //                     else {
        //                         this.setState({
        //                             canClick: true
        //                         })
        //                         this.refs.toast.show(res.msg, 1000)
        //                     }
        //                 }).catch(err => {
        //                     this.setState({
        //                         canClick: true
        //                     })
        //                     this.refs.toast.show("网络问题，请重试", 1000)
        //                 })
        //             return
        //         }
        //     }
        // }
        // this.setState({
        //     canClick: true
        // })
        // this.refs.toast.show(this.state.phoneText + "不是正确的手机号", 1000)
    }

    //验证码登陆
    loginAction(value) {
        let code = value
        let mobile = this.state.phoneText
        this.props.getLoginToken({
            mobile: mobile,
            code: code
        }).then((res) => {
            if (res && res.error_code == 0) {
                this.saveDataToStorage(res.data.token)
                //跳转重制密码页面
                NavigationService.navigate('Drawer');
            }
            else {
                this.refs.toast.show(res.msg + "[" + res.error_code + "]", 1000)
            }
        }).catch(err => {
            alert(JSON.stringify(err))
        })
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
        getUserMessgaeCode: actions.getUserMessgaeCode,
        getLoginToken: actions.getLoginToken
    }
)(ForgetPasswordScreen)

