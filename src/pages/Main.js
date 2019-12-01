import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {Container, Content, Row} from 'native-base';
import {create} from 'apisauce';
import {BASE_URL} from '../settings/urls';


export default class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props){
        super(props);
        this.state = {};
        this.api = create({baseURL: BASE_URL});
        this.window = Dimensions.get('window')
    }

    render(){
        return (
            <Container>
                <Content>
                    <Row style={{justifyContent: 'space-between', padding: 10}}>
                        <Text style={{color: '#000'}}>반갑습니다.</Text>
                        <TouchableOpacity
                            onPress={()=>this.api.get('v1/log-out').then(res=>{
                                console.log(res);
                                this.props.navigation.replace('Login')
                            })}
                        >
                            <Text style={{color: '#999'}}>로그아웃</Text>
                        </TouchableOpacity>
                    </Row>
                    <Image source={require('../images/text_main_title.png')} resizeMode={'contain'} style={{width: '100%'}}/>
                    <FlatList
                        data={[
                            require('../images/top1.png'), require('../images/top2.png'), require('../images/top3.png'),
                            require('../images/mid1.png'), require('../images/mid2.png'), require('../images/mid3.png'),
                            require('../images/bot2.png'), require('../images/bot2.png'), require('../images/about.png'),
                        ]}
                        numColumns={3}
                        columnWrapperStyle={{justifyContent: 'space-around'}}
                        renderItem={({item, index}) => (
                            <TouchableOpacity
                                onPress={()=>{
                                    if(index !== 8){return}
                                    this.props.navigation.navigate('OrderList');
                                }}
                                >
                                <Image source={item} style={{width: 100, height: 100}} />
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('../images/computer.png')} resizeMode={'contain'} style={{marginTop: 20, width: 200, height: 357 * (200 / 1391)}}/>
                    </View>
                </Content>
            </Container>
        )
    }
}
