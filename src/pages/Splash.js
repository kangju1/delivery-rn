import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {create} from 'apisauce';
import {BASE_URL} from '../settings/urls';


export default class Splash extends Component{
    constructor(props){
        super(props);
        this.api = create({baseURL: BASE_URL});
    }
    componentDidMount(): void {
        // this.api.get('v1/log-out');
        this.api.get('v1/users/me').then(res=>{
            if(!res.ok){this.props.navigation.replace('Login'); return}
            this.props.navigation.replace('OrderList')
        });
    }

    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize: 34, fontWeight: '700', color: '#A02422'}}>
                    배달 커뮤니티
                </Text>
            </View>
        )
    }

};

