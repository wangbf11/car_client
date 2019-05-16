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

class LoginScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            phoneText: "",
            password: "",
            token: "",
            canClick: true
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavigationBar navigation={this.props.navigation} isBack={true}/>
                <KeyboardAwareScrollView>
                    <TouchableOpacity onPress={this.hiddenKeyborad.bind(this)} activeOpacity={1} style={{ height: screenHeight - safeAreaBottomHeight - statusBarHeight - 44 - 10}}>
                        <Text style={{ color: "#202020",marginTop: 32, fontSize: 35, fontWeight: "bold", marginLeft:15 }}>登录</Text>
                        <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, marginTop : 35,paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>
                            <TextInput style={{ padding : 0, color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                                       placeholder={"请输入手机号"} keyboardType={"numeric"}
                                       onChangeText={text => this.setState({
                                            phoneText: text
                                       })} />
                        </View>

                        <View style={{marginLeft :15,height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                        <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>
                            <TextInput style={{ padding : 0, color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                                       placeholder={"请输入密码"} keyboardType={"numeric"}
                                       secureTextEntry = {true}
                                       selectionColor={'#4A90E2'}
                                       onChangeText={text => this.setState({
                                           password: text
                                       })} />
                        </View>

                        <View style={{marginLeft :15,height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                        <View style={{flexDirection: "row",marginTop: 10,height: 30, alignItems: "center"}}>
                            <Image style={{marginLeft :30,height: 12,width : 12,
                                borderRadius: 3,
                                borderWidth: 1,
                                borderColor: "#222",backgroundColor: "#fff"}}/>
                            <Text style={{ marginLeft: 15,color: "#222", fontSize: 14 }}>同意</Text>
                            <TouchableOpacity style={{ marginLeft: 10,justifyContent: "center", alignItems: "center" }}
                                              onPress={this.openAgreement.bind(this)} disabled={!this.state.canClick}>
                                <Text style={{ color: "#4A90E2", fontSize: 14 }}>《用户服务协议》</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10, marginLeft: 20, marginRight: 20, height: 45, borderRadius: 3, backgroundColor: "#4A90E2", justifyContent: "center", alignItems: "center" }}
                                          onPress={this.getMessageCode.bind(this)} disabled={!this.state.canClick}>
                            <Text style={{ color: "#fff", fontSize: 14 }}>登陆</Text>
                        </TouchableOpacity>

                        <View style={{flexDirection: "row",marginTop: 10,height: 30, justifyContent :"center",alignItems: "center"}}>
                            <TouchableOpacity style={{ marginLeft: 10,justifyContent: "center", alignItems: "center" }}
                                              onPress={this.openForgetPassword.bind(this)}>
                                <Text style={{ color: "#4A90E2", fontSize: 14 }}>忘记密码？</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                <View style={{ height: safeAreaBottomHeight }} />
            </View>
        )
    }

    hiddenKeyborad() {
        Keyboard.dismiss();
    }

    openAgreement() {
        //跳转服务协议
        NavigationService.navigate('Drawer');
    }

    openForgetPassword() {
        //跳转服务协议
        NavigationService.navigate('ForgetPassword');
    }

    getMessageCode() {
        NavigationService.reset('Drawer');
        return

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
)(LoginScreen)

