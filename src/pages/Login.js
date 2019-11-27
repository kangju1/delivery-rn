import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {Container, Content} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import {BASE_URL} from '../settings/urls';
import {create} from 'apisauce';


export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props){
        super(props);
        this.state = {
            signUp: false,
        };
        this.api = create({baseURL: BASE_URL})
    }

    async login(values) {
        let res = await this.api.post('/v1/sign-in/email', { username: values.email, password: values.password });
        console.log(res);
        if(!res.ok) return false;

        this.props.navigation.replace('Splash');
    }

    signup = async (values) => {
        let res = await this.api.post('/v1/sign-up/email', {name: values.name, username: values.email, password: values.password });
        console.log(res);
        if(!res.ok) return false;

        this.props.navigation.replace('Splash');
    };

    renderLogin = () => {
        return (
            <Container>
            <Content style={{padding:20}}>
                <Text style={{marginTop:20, fontSize:40}}> 로그인 </Text>
                <Formik
                    enableReinitialize
                    initialValues={{email: '', password: '', }}
                    onSubmit={(values, {resetForm}) => {
                        this.login(values);
                    }}
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .required('필수 입력 사항입니다.'),
                        password: yup
                            .string()
                            .required('필수 입력 사항입니다.'),
                    })}>
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue, resetForm }) => (
                        <View>
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>학번</Text>
                                <TextInput
                                    style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                    value={values.email}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {touched.email && errors.email &&
                                <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.email}</Text>}
                            </View>
                            <View style={{marginVertical: 20}}>
                                <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>비밀번호</Text>
                                <TextInput
                                    style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                    value={values.password}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                />
                                {touched.password && errors.password &&
                                <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.password}</Text>}
                            </View>
                            <TouchableOpacity
                                style={{backgroundColor: '#1E6738', color: '#fff', justifyContent: 'center', padding: 10,}}
                                onPress={isValid ? handleSubmit : null}
                            >
                                <Text style={{color: '#fff', textAlign: 'center'}}>로그인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{backgroundColor: '#fff', color: '#fff', justifyContent: 'center', padding: 10, marginTop: 10,}}
                                onPress={() => this.setState({signUp:true})}
                            >
                                <Text style={{color: '#000', textAlign: 'center'}}>회원가입</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </Content>
            </Container>
        )
    };

    renderSignUp = () => {
        return (
            <Container>
                <Content style={{padding: 20}}>
                <Text style={{marginTop:20, fontSize:40}}>회원가입</Text>
                <Formik
                    initialValues={{email: '', password: '', passwordCheck: '', name: '',}}
                    onSubmit={(values, {resetForm}) => {
                        this.signup(values);
                    }}
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .required('필수 입력 사항입니다.'),
                        password: yup
                            .string()
                            .required('필수 입력 사항입니다.'),
                        passwordCheck: yup
                            .string()
                            .oneOf([yup.ref('password'), null], 'Passwords must match'),
                        name: yup
                            .string()
                            .required('필수 입력 사항입니다.'),
                    })}>
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue, resetForm }) => (
                        <View>
                            {console.log(errors)}
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>이름</Text>
                                <TextInput
                                    style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                    value={values.name}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                />
                                {touched.name && errors.name &&
                                <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.name}</Text>}
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>학번</Text>
                                <TextInput
                                    style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                    value={values.email}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {touched.email && errors.email &&
                                <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.email}</Text>}
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>비밀번호</Text>
                                <TextInput
                                    style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                    value={values.password}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                />
                                {touched.password && errors.password &&
                                <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.password}</Text>}
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: 16, color: '#323232', marginRight: 10}}>비밀번호 확인</Text>
                                <TextInput
                                    style={{backgroundColor: '#fff', fontSize: 18, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 3}}
                                    value={values.passwordCheck}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('passwordCheck')}
                                    onBlur={() => setFieldTouched('passwordCheck')}
                                />
                                {touched.passwordCheck && errors.passwordCheck &&
                                <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', marginTop: 5 }}>{errors.passwordCheck}</Text>}
                            </View>
                            <TouchableOpacity
                                style={{backgroundColor: '#1E6738', color: '#fff', justifyContent: 'center', padding: 10, marginTop: 10}}
                                onPress={isValid ? handleSubmit : null}
                            >
                                <Text style={{color: '#fff', textAlign: 'center'}}>회원가입</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{backgroundColor: '#fff', color: '#fff', justifyContent: 'center', padding: 10, marginTop: 10}}
                                onPress={() => this.setState({signUp: false})}
                            >
                                <Text style={{color: '#000', textAlign: 'center'}}>로그인</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                </Content>
            </Container>
        )
    };

    render() {
        if(this.state.signUp) {
            return this.renderSignUp();
        } else {
            return this.renderLogin();
        }
    }
}
