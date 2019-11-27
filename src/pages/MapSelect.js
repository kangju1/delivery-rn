import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';


export default class MapSelect extends Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: '위치설정',
        headerRight: (
            <TouchableOpacity onPress={()=>{navigation.getParam('onComplete', ()=>{})(); navigation.goBack()}}>
                <Text style={{color: '#333', fontSize: 18, marginRight: 20}}>완료</Text>
            </TouchableOpacity>)
    });
    constructor(props){
        super(props);
        this.state = {
            region: {
                latitude: 37.565794,
                longitude: 126.992216,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        };
        this.map = null;
    }

    bindLocations(){
        // geolocation.getCurrentPosition((position)=>{
        //     console.log(position);
        //     let region = Object.assign({...this.state.region}, this.props.navigation.getParam('position', {}));
        //     this.map.fitToCoordinates([region, position.coords])
        // })
    }

    render(){
        let region = Object.assign({...this.state.region}, this.props.navigation.getParam('position', {}));
        return(
            <View style={{flex: 1}}>
                <MapView
                    ref={(ref) => {this.map = ref}}
                    provider={PROVIDER_GOOGLE}
                    onMapReady={this.bindLocations.bind(this)}
                    onRegionChangeComplete={this.props.navigation.getParam('onRegionChangeComplete', ()=>{})}
                    showsUserLocation={true}
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    initialRegion={region}
                    region={region}>
                </MapView>
                <MapIcon/>
            </View>
        )
    }
}

const MapIcon = (props) => {
    return(
        <View style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 50,
            height: 50,
            marginTop: -25,
            marginLeft: -25,
            backgroundColor: '#fff',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Icon
                name={'location'} type={'Entypo'}
                style={{
                    fontSize: 30,
                    color: '#C21807',
                }}/>
        </View>
    )
};
