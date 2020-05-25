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
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/helpers/Header';
import {config} from '../../../config';
import Loader from '../../components/helpers/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';


const WIDTH = Dimensions.get('window').width;

class Feedback extends Component {
  state = {
    fullname: '',
    email: '',
    message: '',
    loading: false,
  };

  componentDidMount() {
    this._retrieveData();
  }
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

  sendFeedback = async () => { 
    const {fullname, email, message} = this.state;
    if (this.validateEmail(email)) {
      if (fullname != '') {
        if (message != '') {
    this.setState({
      loading: true,
      disableTouch: true,
    });
   
    await axios
      .post(
        config.sendFeedback,
        {
          full_name: fullname,
          message: message,
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${this.state.token}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        this.setState({isLoading: false, disableTouch: false});
        alert('Thanks for sending your feedback!')
        this.props.navigation.navigate('Account');
      })
      .catch(({response}) => {
        this.setState({loading: false, disableTouch: false});
        console.log(response);

        if (response.data.non_field_errors) {
          this.setState({
            msg: 'Unable to send feedback, please try again later.',
            type: 'w',
            visible: true,
            disableTouch: false,
          });
        }
      });
    } else {
      this.setState({
        msg: 'Message cannot be empty.',
        type: 'w',
        visible: true,
        disableTouch: false,
      });
    }
    } else {
      this.setState({
        msg: 'Name cannot be empty.',
        type: 'w',
        visible: true,
        disableTouch: false,
      });
    }
    } else {
      this.setState({
        msg: 'Please enter a valid email address.',
        type: 'w',
        visible: true,
        disableTouch: false,
      });
    }
  };

  validateEmail(a) {
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(a).toLowerCase());
  }

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  
  render() {
    const {navigation} = this.props;
    const {fullname, email, message, loading, msg, type, visible} = this.state;

    return (
      <ThemeConsumer>
      {value => (
      <Network>
        <ScrollView
          contentContainerStyle={{justifyContent: 'space-between'}}
          style={[styles.container, {backgroundColor: value.mode.background}]}>
          <Header headerName="Feedback" />

          <KeyboardAvoidingView>
            <View style={styles.root}>
              <View style={{margin: 12, alignItems: 'center'}}>
                <Image
                  style={{height: 150, width: 150}}
                  source={require('../../assets/images/feedback.png')}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.bioTxt, {textAlign: 'center', fontSize: 15, color: value.mode.text}]}>
                  {' '}
                  Have any feedback for us? Kindly fill the form below
                </Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={[styles.bioTxt, {color: value.mode.text}]}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.inputStyle, {color: value.mode.text}]}
                    autoCorrect={false}
                    value={fullname}
                    onChangeText={fullname => this.setState({fullname})}
                  />
                </View>

                <Text style={[styles.bioTxt, {color: value.mode.text}]}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.inputStyle, {color: value.mode.text}]}
                    autoCorrect={false}
                    value={email}
                    onChangeText={email => this.setState({email})}
                  />
                </View>

                <Text style={[styles.bioTxt, {color: value.mode.text}]}>Your Message</Text>
                <View style={styles.inputLarge}>
                  <TextInput
                    style={[styles.inputStyle, {color: value.mode.text, width: '100%'}]}
                    autoCorrect={false}
                    value={message}
                    onChangeText={message => this.setState({message})}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={this.sendFeedback}
            disabled={this.state.disableTouch}
            style={[
              styles.loginBtn,
              this.state.loading ? {backgroundColor: 'lightgray'} : null,
            ]}>
            <Text style={styles.loginTxt}>Send Feedback</Text>
          </TouchableOpacity>
          {loading ? <Loader /> : null}

          <View style={{height: 50}} />
        </ScrollView>
        <Snackbar
          visible={visible}
          handleClose={this.handleClose}
          msg={msg}
          type={type}
        />
      </Network>
      )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    height: '100%',
  },
  root: {
    marginHorizontal: 20,
    flex: 0.8,
    alignItems: 'center',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
    alignItems: 'center',
  },

  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    // alignItems: 'center',ff
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 45,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    // alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 95,
  },
  loginTxt: {
    color: colors.whitesmoke,
  },
  loginBtn: {
    backgroundColor: colors.baseBorder,
    borderRadius: 6,
    width: '90%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  bioData: {
    fontWeight: 'bold',
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontSize: 18,
  },
  bioTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 18,
  },
  inputStyle: {
    flex: 1,
    color: colors.grey2,
    fontSize: 17,
    left: 8,
  },
});

export default Feedback;
