import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {Container, Content, Row} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";


export default class MapComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            region: {
                latitude: 37.565794,
                longitude: 126.992216,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            }
        };
        this.map = null;
    }

    render(){
        let propPosition = this.props.position.latitude ? this.props.position : {};
        let region = Object.assign({...this.state.region}, propPosition);
        return(
            <View pointerEvents={'none'} style={{flex: 1}}>
                <MapView
                    ref={(ref) => {this.map = ref}}
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    initialRegion={region}
                    region={region}>
                    <Marker coordinate={region}/>
                </MapView>
            </View>
        )
    }
}