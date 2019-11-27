import React, {Component} from 'react';
import {View, Text, SafeAreaView, FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Container, Content, Row, Card, Icon} from 'native-base';
import {create} from 'apisauce';
import {BASE_URL} from '../settings/urls';


export default class OrderList extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '공동주문',
    });
    constructor(props){
        super(props);
        this.state = {
            orders: [],
        };
        this.api = create({baseURL: BASE_URL})
    }

    componentDidMount(): void {
        this.fetchOrders();
    }

    fetchOrders = () => {
        this.api.get('v1/delivery/groups').then(res=>{
            console.log(res.data);
            if(!res.ok){alert('문제가 있습니다'); return}
            this.setState({orders: res.data})
        })
    };

    render(){
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.state.orders}
                        renderItem={({item})=>(
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('OrderDetail', {order: item, onComplete: this.fetchOrders})}>
                            <Card style={{padding: 10}}>
                                <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={{fontSize: 17}}>{item.shop_name}</Text>
                                    <Text style={{fontSize: 14, color: '#388E8E'}}>주문자 {item.orders.length}/{item.quota}명</Text>
                                </Row>
                            </Card>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item, index)=>index.toString()}
                    />
                </Content>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('OrderRegister', {onComplete: this.fetchOrders})}
                    style={{
                        width: 50, height: 50, backgroundColor: '#FF6103', borderRadius: 25, justifyContent: 'center', alignItems: 'center',
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                    }}
                >
                    <Icon type={'AntDesign'} style={{color: '#fff'}} name={'plus'}/>
                </TouchableOpacity>
            </Container>
        )
    }
}
