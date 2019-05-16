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

class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavigationBar navigation={this.props.navigation} isBack={false} title={"辛巴支付"} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        color: "#202020",
        fontSize: 30
    },
    banner_img: {
        width: '100%',
        height: '100%',
    },
    bannerView: {
        width: '100%',
        height: 180,
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: "center",
        //shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 2,
        borderRadius: 5,
        height: 100,
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
