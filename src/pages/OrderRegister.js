import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Row, Toast} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import MapComponent from '../components/MapComponent';
import {create} from 'apisauce';
import {BASE_URL} from '../settings/urls';

export default class OrderRegister extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '주문 생성',
    });

    constructor(props){
        super(props);
        this.state = {};
        this.api = create({baseURL: BASE_URL});
    }

    render(){
        return (
            <Container>
                <Content>
                    <Formik
                        enableReinitialize
                        initialValues={{lat: 0, lng: 0, name: '', quota: '1'}}
                        onSubmit={async (values, {resetForm}) => {
                            let res = await this.api.post('v1/delivery/groups/', {shop_name: values.name, quota: values.quota, lat: values.lat, lng: values.lng});
                            console.log(res);
                            this.props.navigation.goBack();
                            this.props.navigation.getParam('onComplete', ()=>{})()
                        }}
                        validationSchema={yup.object().shape({
                            name: yup
                                .string()
                                .max(30, '최대 30자')
                                .required('필수 항목입니다.'),
                            quota: yup.number().required('필수 항목입니다.'),
                            lat: yup
                                .string()
                                .required('필수 항목입니다.'),
                            lng: yup
                                .string()
                                .required('필수 항목입니다.'),
                        })}>
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue, resetForm }) => (
                            <View>
                                <TouchableOpacity
                                    onPress={()=>this.props.navigation.navigate('MapSelect',{
                                        onComplete: ()=>{},
                                        onRegionChangeComplete: (position)=>{setFieldValue('lat', position.latitude); setFieldValue('lng', position.longitude)},
                                        position: values.lat ? {latitude: values.lat, longitude: values.lng} : {},
                                    })}
                                    style={{height: 200}}>
                                    <MapComponent position={{latitude: values.lat, longitude: values.lng}}/>
                                    <View style={{position: 'absolute', right: 0, bottom: 0, left: 0, justifyContent: 'flex-end', backgroundColor: 'rgba(255,255,255, 0.9)'}}>
                                        <Text style={{padding: 10, textAlign: 'center', color: '#000'}}>위치를 설정하려면 클릭하세요</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{padding: 10}}>
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>가게이름</Text>
                                    <TextInput
                                        style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={() => setFieldTouched('name')}
                                    />
                                    {touched.name && errors.name &&
                                    <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.name}</Text>}
                                </View>
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>정원</Text>
                                    <TextInput
                                        style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                        value={values.quota}
                                        onChangeText={handleChange('quota')}
                                        onBlur={() => setFieldTouched('quota')}
                                    />
                                    {touched.quota && errors.quota &&
                                    <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.quota}</Text>}
                                </View>
                                <TouchableOpacity
                                    onPress={isValid ? handleSubmit : null}
                                    style={{backgroundColor:  isValid ?'#FFB00F' : '#666', paddingVertical: 20, marginTop: 10}}>
                                    <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>완료</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </Content>
            </Container>
        )
    }
}
