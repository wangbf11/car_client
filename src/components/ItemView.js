/**
 * 图片
 */
import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

export default class ItemView extends PureComponent {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isSelect: props.isSelect
        };
    }
    componentDidMount() {

    }


    componentWillUnmount() {

    }

    render() {
        const {dic, onPress,style} = this.props
        return (
            <TouchableOpacity
                style={[{alignItems: 'center',
                    justifyContent:'center',
                    paddingLeft:10,
                    paddingRight:10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#4A90E2",
                    backgroundColor:this.state.isSelect ? '#4A90E2' : '#fff'},style]}
                onPress={() => {
                    onPress && onPress()
                    this.setState({
                        isSelect: true
                    })
                }}
            >
                <Text style={{color: this.state.isSelect ? '#fff' : '#4A90E2',fontSize: 14}}>{dic}</Text>
            </TouchableOpacity>
        )
    }

    //取消选中
    _unSelect() {
        this.setState({
            isSelect: false
        })
    }
};

const styles = StyleSheet.create({
});
