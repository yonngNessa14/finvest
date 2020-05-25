import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {config} from '../../../config';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Background from '../../components/helpers/Background';
import {Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


const WIDTH = Dimensions.get('window').width

class Phone extends Component {
  state = {
    email: '',
    password: '',
    visible: false,
    msg: '',
    type: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password2: '',
    password1: '',
    phone: '',
  };

  resendLink = async () => {
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
      .post('http://116.203.85.174:9000/api/v1/rest-auth/registration/', {
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
        this.setState({isLoading: false});
        AsyncStorage.setItem('phone', this.state.phone);
      // AsyncStorage.setItem('email', this.state.email)
        // AsyncStorage.setItem('token', res.data.token);
        // AsyncStorage.setItem('id', res.data.user.id);
        // AsyncStorage.setItem('level', res.data.user.level.stringify());
        // AsyncStorage.setItem('username', res.data.user.username);
        AsyncStorage.setItem('phone', this.state.phone);
      })
      .catch(({response}) => {
        this.setState({isLoading: false});
        console.log(response);
        console.log(response.data.username);
        
        if (response.data.username) {
          this.setState({
            msg: 'A user with that username already exists.',
            type: 'w',
          });
        }
        if (response.data.email) {
          this.setState({
            msg: 'A user is already registered with this e-mail address.',
            type: 'w',
          });
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

  _retrieveData = async () => {
    await AsyncStorage.getItem('token')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          token: valueJson,
        });
        // console.log('Token Data retrieved successfully', this.state.token);
      })
      .catch(error => {
        console.log('There was an error retrieving the data' + error);
      });
  };

  componentDidMount() {
    const {state} = this.props.navigation;
    this._retrieveData();
    // this.setState({
    //   phone: state.params.phone,
    //   username: state.params.username,
    //   email: state.params.email,
    //   password1: state.params.password1,
    //   password2: state.params.password2,
    //   first_name: state.params.first_name,
    //   last_name: state.params.last_name,
    // });
  }

  render() {
    const {navigation} = this.props;
    const {visible, type, msg} = this.state;
   
    return (
      <Network>
        <Background>
          <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: WIDTH - 80}}
            // style={classes.skip}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Subheading style={classes.SkipText}>Skip</Subheading>
            <Icon name="long-arrow-right" size={22} color={colors.grey2} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{justifyContent: 'center'}}
            style={classes.container}>
            <KeyboardAvoidingView style={classes.root}>
              <Image
                style={classes.logo}
                source={require('../../assets/images/verify.png')}
              />

              <View style={classes.welcomTxt}>
                <Text style={classes.finText}>
                  We've sent a verification link to your email. Kindly check it
                  to verify your account.
                </Text>
              </View>
            </KeyboardAvoidingView>


            <TouchableOpacity
              onPress={() => this.sendLink()}
              style={classes.loginBtn}>
              <Text style={classes.loginTxt}>Resend Link</Text>
            </TouchableOpacity>

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
    padding: 12,
    flexDirection: 'column',
  },
  root: {
    marginHorizontal: 30,
    flex: 0.8,
    // alignItems: 'center',
    padding: 12,
  },
  logo: {
    height: 250,
    width: 250,
  },
  welcomTxt: {
    flexDirection: 'row',
    marginTop: 30,
  },
  SkipText: {
    color: 'gray',
    paddingHorizontal: 5,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  finText: {
    color: colors.grey2,
    fontSize: 18,
    textAlign: 'center',
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
    width: 260,
    marginTop: 60,
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    left: 8,
  },
  Phone: {
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
    // justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
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

export default Phone;
