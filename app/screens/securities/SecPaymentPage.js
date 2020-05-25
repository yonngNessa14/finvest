import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import Header from '../../components/helpers/Header';
import {colors} from '../../constants/colors';
import Loader from '../../components/helpers/Loader';
import {config} from '../../../config';
import RNPaystack from 'react-native-paystack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from '../../components/helpers/Snackbar';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

RNPaystack.init({
  publicKey: 'pk_test_707b132b0745ce619d373689f6a97a0baf6ec862',
});

const WIDTH = Dimensions.get('window').width;

export default class SecPaymentPage extends Component {
  state = {
    loading: false,
    disableTouch: false,
    token: '',
    accessCode: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardExpiry: '',
    cardCvc: '',
    visible: false,
    msg: '',
    type: '',
    successModal: false,
    failModal: false,
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

  payOnPaystack = () => {
    const {navigation} = this.props;

    this.setState({
      disableTouch: true,
      loading: true,
    });
    const {cardNumber, cardCvc, cardMonth, cardYear} = this.state;
    const accessCode = navigation.getParam('access', '');
    RNPaystack.chargeCardWithAccessCode({
      cardNumber: this.state.cardNumber,
      expiryMonth: cardMonth,
      expiryYear: cardYear,
      cvc: cardCvc,
      accessCode: accessCode,
    })
      .then(response => {
        console.log(response); // do stuff with the token
        this.setState({
          refCode: response.reference,
          disableTouch: false,
          loading: false
        });
        this.paySecurities();
      })
      .catch(error => {
        this.setState({
          type: 'w',
          visible: true,
          msg: error.message,
          disableTouch: false,
          loading: false
        });
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      });
  };

  paySecurities = async () => {
    const {navigation} = this.props;
    const secId = navigation.getParam('id', '');

    console.log('ref code', this.state.refCode);

    this.setState({
      loading: true,
      disableTouch: true,
    });
    console.log('before', secId);
    await axios({
      method: 'post',
      url: config.paySecurities,
      data: {
        investment_id: secId,
        reference: this.state.refCode,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          loading: false,

          disableTouch: false,
        });
        this.showSuccessModal(), console.log('buy sec', data);
        console.log('sec Id', this.state.secId);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        this.showFailModal();
        console.log(`pay sec error is ${err}`);
        console.log('error sec Id', secId);
        console.log('error sec Id', this.state.token);
      });
  };

  _onChange = form => {
    this.setState({
      cardNumber: form.values.number,
      cardExpiry: form.values.expiry,
      cardCvc: form.values.cvc,
    });

    if (this.state.cardExpiry) {
      var setMonth = this.state.cardExpiry.slice(0, 2);
      var setYear = this.state.cardExpiry.slice(3, 5);
    } else {
      return null;
    }

    this.setState({
      cardMonth: setMonth,
      cardYear: setYear,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  //Modal
  showSuccessModal = () => {
    this.setState({
      successModal: true,
    });
  };

  showFailModal = () => {
    this.setState({
      failModal: true,
    });
  };

  hideFailure = () => {
    this.setState({
      failModal: false,
    });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }


  render() {
    const {state} = this.props.navigation;
    const {loading, type, visible, msg, successModal, failModal} = this.state;

    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <Header headerName={state.params.name} />

            <View style={styles.payTitle}>
              <Image source={require('../../assets/images/paystack.png')} />

              <View>
                <Text style={[styles.payTxt, {color: value.mode.text}]}>
                  support@finvest.com
                </Text>

                <Text style={[styles.payTxt, {color: value.mode.text}]}>
                  Pay{' '}
                  <Text style={styles.amountTxt}>₦ {this.formatNumber(state.params.price)}</Text>
                </Text>
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  styles.payTxt,
                  {color: colors.baseBorder, fontSize: 16},
                ]}>
                {' '}
                Enter your card details to pay
              </Text>
            </View>
            <View style={{marginTop: 40}}>
              <CreditCardInput
                labelStyle={[styles.cardLabelStyle, {color: value.mode.text}]}
                inputStyle={styles.cardInputStyle}
                onChange={this._onChange}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.payOnPaystack()}
              disabled={this.state.disableTouch}
              style={[
                styles.payMoney,
                this.state.loading ? {backgroundColor: 'lightgray'} : null,
              ]}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
                Pay ₦ {this.formatNumber(state.params.price)}
              </Text>
            </TouchableOpacity>
            {loading ? <Loader /> : null}
            <Snackbar
              visible={visible}
              handleClose={this.handleClose}
              msg={msg}
              type={type}
            />

            <Modal isVisible={successModal}>
              <View style={{flex: 1, justifyContent: 'center', padding: 18}}>
                <View style={{backgroundColor: value.mode.background, borderRadius: 6}}>
                  <View
                    style={{
                      padding: 12,
                      marginVertical: 30,
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="ios-checkmark-circle"
                      size={100}
                      color={colors.green}
                    />
                    <Text style={[styles.successTxt, {color: value.mode.text}]}>
                      You have successfully bought {state.params.name}
                    </Text>
                  </View>
                  <View style={{marginVertical: 20}}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 15,
                        bottom: 2,
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('Home')
                      }>
                      <Text style={[styles.creditDetails]}>CONTINUE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal isVisible={failModal}>
              <View style={{flex: 1, justifyContent: 'center', padding: 18}}>
                <View style={{backgroundColor: value.mode.background, borderRadius: 6}}>
                  <View
                    style={{
                      padding: 12,
                      marginVertical: 30,
                      alignItems: 'center',
                    }}>
                    <Entypo name="cross" size={100} color={colors.pink} />
                    <Text style={styles.successTxt}>
                      Fail to buy {state.params.name}, please try again!
                    </Text>
                  </View>
                  <View style={{marginVertical: 20}}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 15,
                        bottom: 2,
                      }}
                      onPress={this.hideFailure}>
                      <Text style={styles.creditDetails}>CONTINUE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  payMoney: {
    backgroundColor: colors.green,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH - 100,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
  },
  payTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.6,
    padding: 8,
    marginBottom: 12,
  },
  payTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  amountTxt: {
    color: colors.green,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  cardLabelStyle: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  cardInputStyle: {
    color: colors.baseBorder,
  },
  creditDetails: {
    fontWeight: 'bold',

    fontSize: 18,
    color: colors.pink,
  },

  successTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
