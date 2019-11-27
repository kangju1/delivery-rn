import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
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
            this.props.navigation.replace('Main')
        });
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/intro.png')} style={{width: '100%'}}/>
            </View>
        )
    }

};

