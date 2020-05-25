import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import {colors} from '../../constants/colors';
import Network from '../../components/helpers/Network';
import Background from '../../components/helpers/Background';
import Snackbar from '../../components/helpers/Snackbar';
import Loader from '../../components/helpers/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../config';

class Otp extends React.Component {
  state = {
    visible: false,
    msg: '',
    type: '',
    phone: '',
    otpcode: '',
    loading: false,
    disableTouch: false,
  };

  verifyCode = () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    axios
      .post(config.verifyEmail, {
        token: this.state.otpcode,
      })
      .then(({data}) => {
        this.setState({loading: false, disableTouch: false});

        console.log(data);
        this.props.navigation.navigate('Home');
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('id', res.data.user.id);
      })
      .catch(err => {
        this.setState({loading: false, disableTouch: false});
        console.log(err);
        this.setState({
          msg: 'Invalid code, please check and try again!.',
          type: 'w',
          visible: true,
          disableTouch: false,
          loading: false
        });
      });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  resendCode = () => {
    const {navigation} = this.props;
    const userEmail = navigation.getParam('email', '');
    axios
      .post(config.resendEmailVerification, {
        email: userEmail,
      })
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const {state} = this.props.navigation;
    const {visible, msg, type, loading} = this.state;
    return (
      <Network>
        <Background>
          <SafeAreaView style={styles.root}>
            <ScrollView
              contentContainerStyle={{justifyContent: 'space-between'}}
              style={styles.container}>
              <KeyboardAvoidingView style={styles.root}>
                <Image
                  //  style={styles.logo}
                  source={require('../../assets/images/phone.png')}
                />
                <Text style={styles.providePhone}>Please provide OTP Code</Text>
                <View style={styles.welcomTxt}>
                  <Text style={styles.finText}>
                    Kindly input the 6 digit OTP code sent to your email.
                  </Text>
                </View>
              </KeyboardAvoidingView>
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry
                  style={styles.inputStyle}
                  autoCorrect={false}
                  value={this.state.otpcode}
                  onChangeText={otpcode => this.setState({otpcode})}
                />
              </View>
              <TouchableOpacity
                disabled={this.state.disableTouch}
                style={[
                  styles.loginBtn,
                  this.state.loading ? {backgroundColor: 'lightgray'} : null,
                ]}
                onPress={this.verifyCode}>
                <Text style={styles.loginTxt}>Verify</Text>
              </TouchableOpacity>
              {loading ? <Loader /> : null}

              <View style={styles.signupWrapper}>
                <Text style={styles.signupTxt}>Didn't Receive a code? </Text>

                <TouchableOpacity onPress={this.resendCode}>
                  <Text style={styles.signupColor}> Resend Code</Text>
                </TouchableOpacity>
              </View>

              <Snackbar
                visible={visible}
                handleClose={this.handleClose}
                msg={msg}
                type={type}
              />
            </ScrollView>
          </SafeAreaView>
        </Background>
      </Network>
    );
  }
}

export default Otp;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20, alignItems: 'center'},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 35,
    lineHeight: 28,
    fontSize: 24,
    borderWidth: 1,
    borderColor: colors.baseColor3,
    textAlign: 'center',
    borderRadius: 6,
  },
  focusCell: {
    borderColor: '#000',
  },
  logo: {
    height: 250,
    width: 250,
  },

  welcomTxt: {
    marginTop: 30,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  finText: {
    color: colors.grey2,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  providePhone: {
    color: colors.grey1,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '900',
    fontFamily: 'Quicksand-Medium',
  },
  loginBtn: {
    backgroundColor: colors.baseBorder,
    borderRadius: 6,
    width: 140,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  loginTxt: {
    color: colors.whitesmoke,
  },
  signupWrapper: {
    // position: "absolute",
    // bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
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
  SkipText: {
    color: 'gray',
    paddingHorizontal: 5,
  },
  skip: {
    justifyContent: 'flex-end',
    top: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  // inputStyle: {

  //   color: 'black',
  //   fontSize: 30,
  //   fontWeight: 'bold'
  //   // left: 8,
  // },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 200,
    alignSelf: 'center',
    height: 40,
    justifyContent: 'center',
  },
});
