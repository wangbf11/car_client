import React, { PureComponent } from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { StackActions, NavigationActions } from "react-navigation"
import { screenWidth, ArticleTime, VideoTime, safeAreaBottomHeight, screenHeight, statusBarHeight, LoginToken } from '../../util/AdapterUtil'
import image from '../../assets/image'
import DeviceInfo from 'react-native-device-info'
import SplashScreen from "react-native-splash-screen";
import MD5 from "react-native-md5"
import * as OpenNative from '../../native/OpenNative'
import AlertView from '../../components/AlertView'
import CodePush from "react-native-code-push"
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import actions from "../../models/actions";
// let Code_Push_Key = "Y0yM5lrPkEKUGjJvhaPQX6pwRUv74ksvOXqog"
let Code_Push_Key = "Y0yM5lrPkEKUGjJvhaPQX6pwRUv74ksvOXq2222og"
class WelcomeScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isShowAccountErrorView: false,
            isShowUpVersion: false,
            isShowProgress: false,
            version: "",
            progress: "",
            isCountTime: false,
            token: ""
        }
    }

    //读取数据
    getDataFromStorage = async () => {
        global.storage.load({
            key: LoginToken,
        }).then(ret => {
            this.setState({ token: ret })
            this.upDeviceInfo(ret)
        }).catch(err => {
            this.setState({ token: "" })
            this.upDeviceInfo("")
        })
    }

    upDeviceInfo(token) {
        let device_name = DeviceInfo.getBrand()
        let device_model = DeviceInfo.getDeviceName()
        let device_version = DeviceInfo.getSystemVersion()
        let uuid = DeviceInfo.getUniqueID()
        let uuid_type = Platform.OS == "ios" ? "2" : "1"
        let parmas
        if (token == "") {
            parmas = {
                device_name: device_name,
                device_model: device_model,
                device_version: device_version,
                uuid: uuid,
                uuid_type: uuid_type,
            }
        }
        else {
            parmas = {
                device_name: device_name,
                device_model: device_model,
                device_version: device_version,
                uuid: uuid,
                uuid_type: uuid_type,
                token: token
            }
        }
        this.props.upDeviceInfo(parmas).then(res => {
            if (res && res.error_code == 0) {
                let data = res.data
                this.saveArticleTimeToStorage(data.article_time)
                this.saveVideoTimeToStorage(data.video_time)
            }
        })
    }

    componentDidMount() {
        SplashScreen.hide();
        this.getDataFromStorage()
        let isEmulator = DeviceInfo.isEmulator()
        if (isEmulator) {
            //不需要更新 3秒后跳转登录页面
            this.setState({ isShowAccountErrorView: true })
            return
        }
        //检测更新
        CodePush.checkForUpdate(Code_Push_Key).then((update) => {

            if (update) {
                this.setState({
                    isShowUpVersion: true,
                    version: update.appVersion,
                    timerCount: "",
                    isCountTime: false
                })
            }
            else {
                this.setState({
                    timerCount: "5",
                    isCountTime: true
                })
                //不需要更新 3秒后跳转登录页面
                setTimeout(() => {
                    this.toHome()
                }, 3000);
            }
        }).catch((e)=>{
            //不需要更新 3秒后跳转登录页面
            setTimeout(() => {
                this.toHome()
            }, 3000);
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.showPhoneErrorView()}
                {this.showUpVersionView()}
            </View>
        )
    }

    showPhoneErrorView() {
        return (
            <AlertView isShow={this.state.isShowAccountErrorView}
                       position={{ justifyContent: "center" }}
                       contentStyle={{ alignItems: "center" }}
                       backgroundColor={{ backgroundColor: "#fff" }}>
                <Image source={image.account_error} />
                <Text style={{ color: "#748088", fontSize: 15, fontWeight: "bold", marginTop: 27 }}>检测到手机异常，可能有如下原因：</Text>
                <Text style={{ color: "#748088", fontSize: 12, marginTop: 22 }}>1.未插SIM卡，建议插卡后使用</Text>
                <Text style={{ color: "#748088", fontSize: 12, marginTop: 9 }}>2.手机ROOT（刷机）过</Text>
                <Text style={{ color: "#748088", fontSize: 12, marginTop: 9 }}>3.非手机用户，包括模拟器</Text>
                <TouchableOpacity onPress={this.toHome.bind(this)}
                                  style={{ backgroundColor: "#FFCC00", height: 36, width: 100, borderRadius: 18, marginTop: 28, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#202020", fontSize: 12 }}>联系客服</Text>
                </TouchableOpacity>
                <Text style={{ color: "#505050", fontSize: 12, marginTop: 12 }}>请备注：异常用户</Text>
            </AlertView>
        )
    }

    showUpVersionView() {
        return (

            <AlertView isShow={this.state.isShowUpVersion}
                position={{ justifyContent: "center" }}
                contentStyle={{ alignItems: "center" }}>
                <View style={{ borderRadius: 8, width: screenWidth - 58, backgroundColor: "#fff", alignItems: "center" }}>
                    <Image source={image.account_error} style={{ marginTop: -43 }} />
                    <Text style={{ color: "#5292FF", fontSize: 19, marginTop: 24 }}>新版本升级</Text>
                    <View style={{ width: screenWidth - 58, marginTop: 30 }}>
                        <Text style={{ color: "#202020", fontSize: 14, fontWeight: "bold", marginLeft: 20, marginRight: 20 }}>指尖资讯V{this.state.version}更新了</Text>
                        <Text style={{ color: "#808080", fontSize: 12, marginLeft: 20, marginRight: 20, marginTop: 13 }}>1.返奖率更高，金币拿到手软</Text>
                        <Text style={{ color: "#808080", fontSize: 12, marginLeft: 20, marginRight: 20, marginTop: 6 }}>2.邀请得现金，躺着也能赚钱</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <TouchableOpacity style={{ width: 150, marginLeft: 12, marginRight: 20, marginBottom: 35,
                            backgroundColor: "#FFCC00", justifyContent: "center",
                            alignItems: "center", height: 36, borderRadius: 18 }}
                                          onPress={this.upVersionAction.bind(this)}>
                            <Text style={{ color: '#202020', fontSize: 14 }}>更新</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View />
            </AlertView >
        )
    }

    upVersionAction() {
        this.syncImmediate()
        this.setState({ isShowUpVersion: false })
    }

    //如果有更新的提示
    syncImmediate() {
        CodePush.sync({
            installMode: CodePush.InstallMode.IMMEDIATE,
            updateDialog: null,
        },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                //("检查更新");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                //("下载安装包");
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                //("等待用户协作");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                //("安装中");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                //("已经是最新版本了");
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                //("取消更新");
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                //("更新完成");
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                //("未知错误");
                break;
        }
        //更新完成跳转 首页
        this.toHome()
    }

    codePushDownloadDidProgress(progress) {
        if (!progress.receivedBytes) {
            this.refs.toast.show('更新出错了，请稍后重试', 1000)
            this.setState({ isShowProgress: false })
            return
        }
        if (!progress.totalBytes) {
            this.refs.toast.show('更新出错了，请稍后重试', 1000)
            this.setState({ isShowProgress: false })
            return
        }
        if (progress) {
            this.setState({ isShowProgress: true })
            let currProgress = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2)
            if (currProgress >= 1) {
                this.setState({ isShowProgress: false })
            }
            else {
                this.setState({ progress: currProgress })
            }
        }
    }


    toHome() {
        this.setState({
            isShowAccountErrorView: false,
            isShowProgress: false,
            isShowUpVersion: false
        })
        // 跳转首页
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "Drawer"
                    })
                ]
            })
        )
    }
}

const styles = StyleSheet.create({
})

export default connect(
    ({ deviceInfo }) => {
        return { deviceInfo }
    }, {
        upDeviceInfo: actions.upDeviceInfo
    }
)(WelcomeScreen)
