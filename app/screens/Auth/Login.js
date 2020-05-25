import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {config} from '../../../config';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Background from '../../components/helpers/Background';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/helpers/Loader';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
console.disableYellowBox = true;

class Login extends Component {
  state = {
    username: '',
    password: '',
    visible: false,
    msg: '',
    type: '',
    account: 'driver',
    loading: false,
    disableTouch: false

  };

  handleLogin = async () => {
    const {password, username} = this.state;

    if (username != '') {
      if (password != '') {
        this.loginUsers();
      } else {
        this.setState({
          type: 'w',
          visible: true,
          msg: 'Password required!!!',
        });
      }
    } else {
      this.setState({
        type: 'w',
        visible: true,
        msg: 'Please enter your Username',
      });
    }
  };

  loginUsers = async () => {
    this.setState({
      loading: true,
      disableTouch: true
    });
    const {password, username} = this.state;
    await axios
      .post('https://dozie.com.ng/api/v1/rest-auth/login/', {
        username: username,
        password: password,
      })
      .then(res => {
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('id', res.data.user.id);
        AsyncStorage.setItem('firstName', res.data.user.first_name);
        AsyncStorage.setItem('lastName', res.data.user.last_name);

        console.log(res);
        this.setState({isLoading: false});
         this.props.navigation.navigate('Home');
        
      })
      .catch(err => {
        this.setState({loading: false, disableTouch: false});
        console.log(err.response.data.non_field_errors);
        if (err.response.data.non_field_errors == "Unable to log in with provided credentials.") {
          this.setState({
            msg: 'Unable to log in with provided credentials.',
            type: 'w',
            visible: true,
            disableTouch: false
          });
          } else  if (err.response.data.non_field_errors == "E-mail is not verified.") {
            this.setState({
              msg: 'Email is not verified.',
              type: 'w',
              visible: true,
              disableTouch: false
            });

            setTimeout(() => {
              this.props.navigation.navigate('Otp')  
            }, 2000);
          }
      });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  render() {
    const {navigation} = this.props;
    const {
      username,
      visible,
      type,
      msg,
      password,
      loading,
      account,
    } = this.state;
    return (
      <Network>
        <ScrollView style={{height: HEIGHT}}>
          <Background>
            <ScrollView
              contentContainerStyle={{justifyContent: 'center'}}
              style={[styles.container, {height: HEIGHT}]}>
              <KeyboardAvoidingView style={styles.root}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/fin-logo.png')}
                />
                <View style={styles.welcomTxt}>
                  <Text style={[styles.text, {  fontFamily: 'OpenSans-ExtraBold'}]}>Welcome to</Text>
                  <Text style={styles.finText}>{``} FinVestor</Text>
                  <Text style={styles.text}>, login to </Text>
                </View>
                <Text style={styles.text}>continue.</Text>

                <View style={styles.inputContainer}>
                  <Feather name="user" color={colors.grey2} size={20} />
                  <TextInput
                    placeholderTextColor={colors.grey2}
                    style={styles.inputStyle}
                    autoCorrect={false}
                    placeholder="username"
                    value={username}
                    onChangeText={username => this.setState({username})}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather name="lock" color={colors.grey2} size={20} />

                  <TextInput
                    secureTextEntry
                    placeholderTextColor={colors.grey2}
                    style={styles.inputStyle}
                    autoCorrect={false}
                    placeholder="password"
                    value={password}
                    onChangeText={password => this.setState({password})}
                  />
                </View>

                <TouchableOpacity
                 style={styles.forgotPassword}
                  onPress={() => this.props.navigation.navigate('Forgot')}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
              <TouchableOpacity
                onPress={this.handleLogin}
                disabled={this.state.disableTouch}
                style={[
                  styles.loginBtn,
                  this.state.loading ? {backgroundColor: 'lightgray'} : null,
                ]}
                >
                <Text style={styles.loginTxt}>Login</Text>
              </TouchableOpacity>
              {loading ? <Loader /> : null}
            </ScrollView>
            <View style={styles.signupWrapper}>
              <Text style={styles.signupTxt}>Don't have an account?</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={styles.signupColor}>
                  {' '}
                  Sign up to get started...
                </Text>
              </TouchableOpacity>
            </View>
            <Snackbar
              visible={visible}
              handleClose={this.handleClose}
              msg={msg}
              type={type}
            />
          </Background>
        </ScrollView>
      </Network>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  root: {
    flex: 1,
    marginHorizontal: 30,
    // flex: 0.8,
    alignItems: 'center',
    padding: 12,
  },
  logo: {
    height: 100,
    width: 80,
    marginTop: 50,
  },

  welcomTxt: {
    flexDirection: 'row',
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans-ExtraBold'
    
  },
  finText: {
    color: colors.baseColor,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.baseBorder,
    // paddingBottom: 10,
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: WIDTH - 40,
    height: 60,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    left: 8,
  },
  forgotPassword: {
    // marginRight: 120,
    // position: 'absolute',
    right: 10,
  },
  forgotsPassword: {
    marginTop: 20,
    position: 'absolute',
    // right: 10
  },

  forgotText: {
    color: colors.baseBorder,
    fontSize: 14,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    paddingRight: 20,
    marginTop: 10,
  },
  loginBtn: {
    backgroundColor: colors.baseBorder,
    borderRadius: 6,
    width: 140,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  loginTxt: {
    color: colors.whitesmoke,
  },
  signupWrapper: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  signupTxt: {
    color: colors.grey1,
    fontSize: 15,
  },
  signupColor: {
    color: colors.baseBorder,
    fontSize: 15,
    textDecorationLine: 'underline',
  },

  typeRoot: {
    justifyContent: 'flex-start',
    // flexDirection: 'row',
    alignItems: 'flex-start',
  },
  type: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    marginVertical: 40,
  },
  TextInput: {
    marginVertical: 5,
  },
  button: {
    // width: 100,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 20,
  },
  innerButton: {
    height: 45,
    fontSize: 20,
  },
  skip: {
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    marginTop: 10,
    // marginBottom: 10,
  },
  account: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
  },
});

export default Login;
