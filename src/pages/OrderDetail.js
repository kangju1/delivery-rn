import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Row} from 'native-base';
import MapComponent from '../components/MapComponent';
import {LabelInput} from '../components/Inputs';
import {create} from 'apisauce';
import {BASE_URL} from '../settings/urls';


export default class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            product: '',
        };
        this.api = create({baseURL: BASE_URL});
        this.order = this.props.navigation.getParam('order');
    }

    onSubmit = () => {
        if(!this.state.name || !this.state.product){alert('정보를 모두 임력해주세요'); return}
        if(this.order.orders.length >= this.order.quota){alert('정원이 다 찼습니다.'); return}
        console.log(this.order);
        this.api.post('v1/delivery/orders/', {name: this.state.name, product: this.state.product, group: this.order.id}).then(res=>{
            console.log(res);
            alert('등록이 완료되었습니다.');
            this.props.navigation.goBack();
            this.props.navigation.getParam('onComplete', ()=>{})();
        })
    };

    render(){
        let order = this.order;
        return (
            <Container>
                <Content padder>
                    <Text style={{color: '#000', fontSize: 16, marginBottom: 10}}>주문정보</Text>
                    <Text>가게 이름: {order.shop_name}</Text>
                    <Text>정원: {order.quota}</Text>
                    <Text style={{color: '#000', fontSize: 16, marginTop: 20}}>공동 주문자({order.orders.length}명)</Text>
                    {order.orders.map((e, i)=>(
                        <Row key={i.toString()} style={{alignItems: 'center', paddingHorizontal: 10, marginTop: 5}}>
                            <Text>{e.name}</Text>
                            <Text style={{marginLeft: 10}}>{e.product}</Text>
                        </Row>
                    ))}
                    <Text style={{color: '#000', fontSize: 16, marginBottom: 10, marginTop: 20}}>위치</Text>
                    <View style={{height: 200}}>
                        <MapComponent position={{latitude: order.lat, longitude: order.lng, latitudeDelta: 0.003, longitudeDelta: 0.003}}/>
                    </View>
                    <LabelInput
                        label={'이름'} value={this.state.name}
                        onChangeText={name=>this.setState({name})}/>
                    <LabelInput
                        label={'메뉴'} value={this.state.product}
                        onChangeText={product=>this.setState({product})}/>
                    <TouchableOpacity
                        onPress={this.onSubmit}
                        style={{backgroundColor:  '#FFB00F', paddingVertical: 20, marginTop: 10}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>공동 주문하기</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}
