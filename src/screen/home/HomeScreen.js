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
    TextInput
} from 'react-native';
import actions from "../../models/actions";
import NavigationBar from "../../components/navigationBar";
import ImageView from "../../components/ImageView";
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper';
import image from '../../assets/image'
import { NavigationEvents } from 'react-navigation';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { screenWidth, screenHeight } from '../../util/AdapterUtil'
import { PasswordModal } from 'react-native-pay-password'
class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            password:""
        };
    }

    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavigationBar navigation={this.props.navigation} isBack={false} title={"辛巴支付"} />
                <TouchableOpacity onPress={this.payMoney.bind(this)}
                                  style={{ height: 36, width: 100, borderColor: "#748088", borderWidth: 1, borderRadius: 3, marginTop: 18, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#748088", fontSize: 12 }}>支付</Text>
                </TouchableOpacity>

                <PasswordModal ref='modal' onDone={(data) => { this.setState({ password: data }) }} />
            </View>
        )
    }

    payMoney() {
        this.refs.modal.show();
    }
}

const styles = StyleSheet.create({
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
});

export default connect(
    ({ userInfo }) => ({
        userInfo
    }), {
        getAllCategoryListData: actions.getAllCategoryListData
    }
)(HomeScreen);
