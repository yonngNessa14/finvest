import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import axios from 'axios';
import {config} from '../../../config';
import Loader from '../../components/helpers/Loader';
import AsyncStorage from '@react-native-community/async-storage';

const HEIGHT = Dimensions.get('window').height;

export default class BankTeller extends Component {
  state = {
    visible: false,
    amount: '',
    token: '',
    loading: false,
    disableTouch: false,
    reference: '',
    amountUnit: '',
  };

  async componentDidMount() {
    await AsyncStorage.getItem('token')
      .then(value => {
        return value;
      })
      .then(valueJson => {
        this.setState({
          token: valueJson,
        });
        // console.log('ID Data retrieved successfully', this.state.token);
      })
      .catch(error => {
        console.log('There was an error retrieving the data' + error);
      });
  }

  getRef = async () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    const {amountUnit} = this.state;
    const {navigation} = this.props;
    const secId = navigation.getParam('id', '');
    await axios({
      method: 'post',
      url: config.secBankTransfer,
      data: {
        investment_id: secId,
        units: Number(amountUnit),
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(res => {
        console.log('bank trnasfer', res.data);
        this.setState({
          loading: false,
          disableTouch: false,
          reference: res.data.reference,
          amount: res.data.amount,
        });
      })
      .catch(err => {
        console.log(err.response);
        console.log('token', this.state.token);
        console.log('id', secId);
        console.log('amount', amountUnit);

        this.setState({
          loading: false,
          disableTouch: false,
          loading: false,
          visible: true,
          msg: 'Can not update your profile at the moment,please try again',
          type: 'w',
        });
      });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    const {loading, reference, amountUnit, amount} = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <View style={styles.container}>
              <Header headerName="Bank Teller" />

              <View style={styles.welcome}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.nameTxt,
                      {fontSize: 20, color: value.mode.text},
                    ]}>
                    Account Details
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Account Name
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    FinVest Forums
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Account Number
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    000123450
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Bank
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    First Bank Nigeria Plc
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Amount to Pay
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    ₦{this.formatNumber(amount)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 0.4,
                  borderColor: value.mode.text,
                  marginTop: 14,
                }}
              />

              <View>
                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Account Name
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    FinVest Forums
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Account Number
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    000123450
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Bank
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    Stanbic IBTC Bank
                  </Text>
                </View>

                <View style={styles.accountDetails}>
                  <Text style={[styles.welcomeTxt, {color: value.mode.text}]}>
                    Amount to Pay
                  </Text>

                  <Text style={[styles.welcomeTxt, {color: colors.baseBorder}]}>
                    ₦{this.formatNumber(amount)}
                  </Text>
                </View>
              </View>

              <View style={styles.welcome}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.nameTxt,
                      {fontSize: 20, color: value.mode.text},
                    ]}>
                    Instructions
                  </Text>
                </View>

                <Text
                  style={[
                    styles.emailInstructions,
                    {marginTop: 20, color: value.mode.text},
                  ]}>
                  You can use your reference number to make payment into the
                  bank accounts above. Then contact
                  <Text style={{color: colors.baseBorder, fontWeight: 'bold'}}>
                    {' '}
                    support@invest.com{' '}
                  </Text>{' '}
                  with your reference number and proof of payment.
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: value.mode.text,
                    fontWeight: 'bold',
                    marginTop: 20,
                  }}>
                  Input amount unit to get a Reference Number
                </Text>
                <TextInput
                  keyboardType={'numeric'}
                  placeholderTextColor={colors.grey2}
                  style={styles.inputStyle}
                  autoCorrect={false}
                  placeholder="Input units"
                  value={amountUnit}
                  onChangeText={amountUnit => this.setState({amountUnit})}
                />
              </View>

              {reference == '' ? (
                <TouchableOpacity
                  onPress={() => this.getRef()}
                  disabled={this.state.disableTouch}
                  style={[
                    styles.getRef,
                    this.state.loading ? {backgroundColor: 'lightgray'} : null,
                  ]}>
                  <Text style={[styles.refTxt]}>Get Ref No.</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={[styles.getRef]}>
                  <Text style={[styles.refTxt]}>Exit</Text>
                </TouchableOpacity>
              )}
              {loading ? <Loader /> : null}
              <View
                style={{
                  backgroundColor: value.mode.card,
                  padding: 12,
                  alignItems: 'center',
                }}>
                <Text style={{color: value.mode.text, fontSize: 18}}>
                  Ref No.: {reference}
                </Text>
              </View>
              <View style={{height: 50}} />
            </View>
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
    alignItems: 'center',
  },

  getRef: {
    backgroundColor: colors.baseBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 18,
    margin: 22,
  },
  refTxt: {
    fontFamily: 'quicksand',
    color: colors.whitesmoke,
  },
  buyTxt: {
    fontSize: 25,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.baseBorder,
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  buyBtn: {
    backgroundColor: colors.baseBorder,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  chooseAmount: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  counterContainer: {
    backgroundColor: colors.baseColor3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterTxt: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.grey2,
  },
  welcome: {
    marginTop: 40,
    padding: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 0.9,
    borderColor: colors.baseBorder,
    // paddingBottom: 10,
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 12,
    width: '90%',
    height: 40,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    left: 8,
    alignItems: 'center',
  },
  phoneNum: {
    backgroundColor: '#CA1A8E',
    padding: 12,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  welcomeTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  nameTxt: {
    fontFamily: 'quicksand',
    fontSize: 30,
    fontWeight: 'bold',
    // marginLeft: 6,
    color: colors.grey2,
  },
  salutation: {
    fontFamily: 'quicksand',
    fontSize: 26,
    color: colors.grey2,
  },
  inputCode: {
    fontFamily: 'quicksand',
    fontSize: 20,
    color: colors.grey2,
    fontWeight: 'bold',
  },
  instructions: {
    fontFamily: 'quicksand',
    textAlign: 'center',
    color: colors.grey2,
    fontSize: 14,
    padding: 14,
  },
  footerWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconWrapper: {
    borderWidth: 0.1,
    borderColor: colors.baseBorder,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  footerTxt: {
    color: colors.grey2,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'quicksand',
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  emailInstructions: {
    fontFamily: 'quicksand',
    color: colors.grey1,
    fontSize: 15,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    // paddingBottom: 10,
    marginTop: 35,
    // marginHorizontal: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    // width: WIDTH - 40,
    height: 60,
    alignItems: 'center',
  },
});
