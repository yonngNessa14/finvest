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
} from 'react-native';
import axios from 'axios';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Background from '../../components/helpers/Background';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/helpers/Loader';

const WIDTH = Dimensions.get('window').width;

class Signup extends Component {
  state = {
    email: '',
    visible: false,
    msg: '',
    type: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password2: '',
    password1: '',
    phone: '',
    loading: false,
    disableTouch: false,
  };

  handleSignup = async () => {
    const {
      password1,
      password2,
      email,
      firstname,
      lastname,
      phone,
      username,
    } = this.state;

    if (firstname != '') {
      if (lastname != '') {
        if (username != '') {
          if (email != '') {
            if (this.validateEmail(email)) {
              if (password1 != '') {
                if (password1.length >= 8 && password1.length <= 20) {
                  if (!this.validatePassword(password1)) {
                    if (password1 === password2) {
                      if (phone != '') {
                        if (phone.length === 11) {
                          this.signupUsers();
                        } else {
                          this.setState({
                            type: 'w',
                            visible: true,
                            msg: 'Enter a valid phone number.',
                          });
                        }
                      } else {
                        this.setState({
                          type: 'w',
                          visible: true,
                          msg: 'Please enter your phone number!',
                        });
                      }
                    } else {
                      this.setState({
                        type: 'w',
                        visible: true,
                        msg: 'Password do not match!',
                      });
                    }
                  } else {
                    this.setState({
                      type: 'w',
                      visible: true,
                      msg:
                        'Password is too weak, try using an alphanumeric combination',
                    });
                  }
                } else {
                  this.setState({
                    type: 'w',
                    visible: true,
                    msg:
                      'Password length should be between 7 and 20 characters',
                  });
                }
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
                msg: 'Please enter a valid email address!',
              });
            }
          } else {
            this.setState({
              type: 'w',
              visible: true,
              msg: 'Email Address is required!',
            });
          }
        } else {
          this.setState({
            type: 'w',
            visible: true,
            msg: 'Please enter your Username',
          });
        }
      } else {
        this.setState({
          type: 'w',
          visible: true,
          msg: 'Please enter your Last Name',
        });
      }
    } else {
      this.setState({
        msg: 'Please enter your First Name',
        type: 'w',
        visible: true,
      });
    }
  };

  signupUsers = async () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    const {
      password1,
      password2,
      email,
      firstname,
      lastname,
      phone,
      username,
    } = this.state;
    await axios
      .post('https://dozie.com.ng/api/v1/rest-auth/registration/', {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
        first_name: firstname,
        last_name: lastname,
        phone: phone,
      })
      .then(res => {
        console.log(res);
        this.setState({loading: false, disableTouch: false});
        AsyncStorage.setItem('phone', this.state.phone);
        this.props.navigation.navigate('Otp', {
          phone: this.state.phone,
          username: this.state.username,
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
          first_name: this.state.firstname,
          last_name: this.state.lastname,
        });
        AsyncStorage.setItem('email', this.state.email);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('id', res.data.user.id);
        AsyncStorage.setItem('level', res.data.user.level);
        AsyncStorage.setItem('username', res.data.user.username);
        AsyncStorage.setItem('phone', this.state.phone);
        AsyncStorage.setItem('firstName', res.data.user.first_name);
        AsyncStorage.setItem('lastName', res.data.user.last_name);

      })
      .catch(({response}) => {
        this.setState({loading: false, disableTouch: false});
        console.log(response);
        console.log(response.data.username);

        if (response.data.username) {
          this.setState({
            msg: 'A user with that username already exists.',
            type: 'w',
            visible: true,
          });
        }
        if (response.data.email) {
          this.setState({
            msg: 'A user is already registered with this e-mail address.',
            type: 'w',
            visible: true,
          });
        }
      });
  };

  validateEmail(a) {
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(a).toLowerCase());
  }

  validatePassword = str => {
    re = /^[a-z0-9]+$/i;
    return re.test(String(str).toLowerCase());
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
    const {email, visible, type, msg, loading, account} = this.state;

    return (
      <Network>
        <Background>
          {/* <Header /> */}
          <ScrollView
            contentContainerStyle={{justifyContent: 'space-between'}}
            style={classes.container}>
            <KeyboardAvoidingView style={classes.root}>
              <Image
                style={classes.logo}
                source={require('../../assets/images/fin-logo.png')}
              />

              <View style={classes.welcomTxt}>
                <Text style={classes.text}>Welcome to</Text>
                <Text style={classes.finText}>{``} FinVestor</Text>
                <Text style={classes.text}>, sign up to </Text>
              </View>
              <Text style={classes.text}>continue.</Text>

              <View style={classes.inputContainer}>
                <Feather name="user" color={colors.grey2} size={20} />
                <TextInput
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="first name"
                  value={this.state.firstname}
                  onChangeText={firstname => this.setState({firstname})}
                />
              </View>
              <View style={classes.inputContainer}>
                <Feather name="user" color={colors.grey2} size={20} />
                <TextInput
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="last name"
                  value={this.state.lastname}
                  onChangeText={lastname => this.setState({lastname})}
                />
              </View>

              <View style={classes.inputContainer}>
                <Feather name="user" color={colors.grey2} size={20} />
                <TextInput
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="username"
                  value={this.state.username}
                  onChangeText={username => this.setState({username})}
                />
              </View>

              <View style={classes.inputContainer}>
                <Feather name="mail" color={colors.grey2} size={20} />
                <TextInput
                  keyboardType={'email-address'}
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="email address"
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                />
              </View>

              <View style={classes.inputContainer}>
                <Feather name="phone" color={colors.grey2} size={20} />
                <TextInput
                  keyboardType={'phone-pad'}
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="phone number"
                  value={this.state.phone}
                  onChangeText={phone => this.setState({phone})}
                />
              </View>
              <View style={classes.inputContainer}>
                <Feather name="lock" color={colors.grey2} size={20} />
                <TextInput
                  secureTextEntry
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="password"
                  value={this.state.password1}
                  onChangeText={password1 => this.setState({password1})}
                />
              </View>

              <View style={classes.inputContainer}>
                <Feather name="lock" color={colors.grey2} size={20} />
                <TextInput
                  secureTextEntry
                  placeholderTextColor={colors.grey2}
                  style={classes.inputStyle}
                  autoCorrect={false}
                  placeholder="retype password"
                  value={this.state.password2}
                  onChangeText={password2 => this.setState({password2})}
                />
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
               onPress={this.handleSignup}
              // onPress={() => this.props.navigation.navigate('Otp')}
              disabled={this.state.disableTouch}
              style={[
                classes.loginBtn,
                this.state.loading ? {backgroundColor: 'lightgray'} : null,
              ]}>
              <Text style={[classes.loginTxt]}>Sign Up</Text>
            </TouchableOpacity>
            {loading ? <Loader /> : null}
            <View style={classes.signupWrapper}>
              <Text style={classes.signupTxt}>Already have an account?</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={classes.signupColor}> Sign in to continue...</Text>
              </TouchableOpacity>
            </View>
            <Snackbar
              visible={visible}
              handleClose={this.handleClose}
              msg={msg}
              type={type}
            />
          </ScrollView>
        </Background>
      </Network>
    );
  }
}

const classes = StyleSheet.create({
  container: {
    flex: 1,
    padding: 9,
    marginTop: -100,
  },
  root: {
    marginHorizontal: 20,
    flex: 0.8,
    alignItems: 'center',
    padding: 12,
  },
  logo: {
    height: 100,
    width: 80,
    marginTop: 60,
  },

  welcomTxt: {
    flexDirection: 'row',
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  finText: {
    color: colors.baseColor,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.baseBorder,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: WIDTH - 40,
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    left: 8,
  },
  forgotPassword: {
    paddingRight: 20,
  },

  forgotText: {
    color: colors.baseBorder,
    fontSize: 12,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    paddingRight: 20,
    marginTop: -25,
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
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 100,
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
});

export default Signup;
