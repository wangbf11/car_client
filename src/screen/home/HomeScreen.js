/**
 * 首页
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';
import actions from "../../models/actions";
import NavigationBar from "../../components/navigationBar";
import ImageView from "../../components/ImageView";
import { connect } from 'react-redux'
import image from '../../assets/image'
import {screenWidth,statusBarHeight,safeAreaBottomHeight} from '../../util/AdapterUtil'
import { PasswordModal } from 'react-native-pay-password'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { FlatGrid } from 'react-native-super-grid';
import ItemView from "../../components/ItemView";
class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phoneText:"",
            password:"",
            index : 0, //支付方式
        };
    }

    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={styles.statusBar}/>
                <View style={{width : "100%",flexDirection: "row", alignItems: "center",height: 50 }}>
                    <TouchableOpacity style={{  marginLeft: 15}}
                                      onPress={this.personSetting.bind(this)}>
                        <Image source={image.avatar_default} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>

                    <View style={{ flex:1, marginLeft:-55,justifyContent: "center", alignItems: "center", flexDirection: "row",
                        height: 50 }}>
                        <Text style={styles.titleStyle}>辛巴支付</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60,paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>

                    <Text style={{ color: "#606060", fontSize: 18, fontWeight: "bold"}}>
                        收款方
                    </Text>

                    <TextInput style={{ padding : 0, textAlign: 'right', color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                               placeholder={"请输入汽配商名称"}
                               onChangeText={text => this.setState({
                                   phoneText: text
                               })} />
                </View>

                <View style={{marginLeft :15,height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, paddingLeft: 20, paddingRight: 15, alignItems: "center" ,justifyContent: "center",}}>

                    <Text style={{ color: "#606060", fontSize: 18, fontWeight: "bold"}}>
                        总金额
                    </Text>

                    <TextInput style={{ padding : 0, textAlign: 'right', color: "#202020", fontSize: 16,  flex:1,height: 40 ,alignItems: "center",justifyContent: "center",}}
                               placeholder={"￥"} keyboardType={"decimal-pad"}
                               selectionColor={'#4A90E2'}
                               onChangeText={text => this.setState({
                                   password: text
                               })} />
                </View>

                <View style={{marginLeft :15,height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                <View style={{ backgroundColor: "#fff",flexDirection: "row", height: 60, paddingLeft: 20, paddingRight: 15, alignItems: "center" }}>

                    <Text style={{ color: "#606060", fontSize: 18, fontWeight: "bold"}}>
                        支付方式
                    </Text>

                    <View  style={{flex : 1}}/>

                    <ItemView
                        style={{width: 80 ,height : 34, marginLeft: 10}}
                        ref={(ItemView1) => { this.ItemView1 = ItemView1; }}
                        isSelect={this.state.index == 0}
                        itemHeight={34}
                        itemWidth={60}
                        dic={"直接支付"}
                        onPress={() => {
                            this.ItemView2 && this.ItemView2._unSelect()
                            this.setState({
                                index: 0
                            })
                        }}
                    />
                    <ItemView
                        style={{width: 80 ,height : 34, marginLeft: 10}}
                        ref={(ItemView2) => { this.ItemView2 = ItemView2; }}
                        isSelect={this.state.index == 1}
                        itemHeight={34}
                        itemWidth={60}
                        dic={"货到付款"}
                        onPress={() => {
                            this.ItemView1 && this.ItemView1._unSelect()
                            this.setState({
                                index: 1
                            })
                        }}
                    />
                </View>

                <View style={{marginLeft :15,height: 1,backgroundColor: "#ccc",transform: [{ scaleY: 0.5 }]}}/>

                <TouchableOpacity style={{ marginTop: 10, marginLeft: 20, marginRight: 20, height: 45, borderRadius: 3, backgroundColor: "#4A90E2", justifyContent: "center", alignItems: "center" }}
                                  onPress={this.payMoney.bind(this)}>
                    <Text style={{ color: "#fff", fontSize: 14 }}>支付</Text>
                </TouchableOpacity>

                <View style={{flexDirection: "row",marginTop: 10,height: 30, justifyContent :"center",alignItems: "center"}}>
                    <TouchableOpacity style={{ marginLeft: 10,justifyContent: "center", alignItems: "center" }}
                                      onPress={this.findStore.bind(this)}>
                        <Text style={{ color: "#606060", fontSize: 14 }}>查看已入驻汽配商</Text>
                    </TouchableOpacity>
                </View>

                <PasswordModal ref='modal' onDone={(data) => { this.setState({ password: data }) }} />

                <View style={{ height: safeAreaBottomHeight }} />
            </View>
        )
    }

    //个人设置
    personSetting() {
        this.refs.modal.show();
    }
    //吊起支付
    payMoney() {
        this.refs.modal.show();
    }

    //查看入驻汽配商
    findStore() {
        this.refs.modal.show();
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: statusBarHeight,
        backgroundColor: 'transparent'
    },
    titleStyle: {
        color: "#202020",
        fontSize: 15
    },
    textInputMsg:{
        zIndex:99,
        position:'absolute',
    },
    textInputView:{
        height:85/2,
        width:85/2,
        borderWidth:1,
        borderColor:'#c9c7c7',
        justifyContent:'center',
        alignItems:'center',
    },
    itemName: {
        fontSize: 16,
        color: 'black',
    }
});

export default connect(
    ({ userInfo }) => ({
        userInfo
    }), {
        getAllCategoryListData: actions.getAllCategoryListData
    }
)(HomeScreen);
