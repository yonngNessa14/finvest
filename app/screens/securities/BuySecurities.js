import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header';
import axios from 'axios';
import {config} from '../../../config';
import Loader from '../../components/helpers/Loader';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import Snackbar from '../../components/helpers/Snackbar';

const WIDTH = Dimensions.get('window').width;
export default class BuyStock extends Component {
  state = {
    modalVisible: false,
    amountCounter: 0,
    state: '',
    secId: '',
    secUnit: '',
    loading: false,
    accessCode: '',
    secPrice: '',
    amount: '',
    visible: false,
    msg: '',
    type: '',
    showInput: false,
  };

  async componentDidMount() {
    await this._retrieveData();
    const {navigation} = this.props;
    const price = navigation.getParam('price', '');
    this.setState({
      secPrice: price,
    });
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

  buySecurities = async () => {
    this.setState({
      loading: true,
      disableTouch: true,
    });
    const {secId, amountCounter} = this.state;
    const {navigation} = this.props;
    // const amount = navigation.getParam('price', '');
    const title = navigation.getParam('title', '');
    const price = navigation.getParam('price', '');

    console.log('before', secId);
    await axios({
      method: 'post',
      url: config.buySecurities,
      data: {
        investment_id: this.state.secId,
        payment_type: 'card',
        units: Number(amountCounter),
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
          accessCode: data.access_code,
        });
        console.log('buy securities', data);
        this.props.navigation.navigate('ChooseSecPayment', {
          id: this.state.secId,
          access: this.state.accessCode,
          price: this.state.amount,
          name: title,
          title: title,
          price: price,
          
        }),
          console.log('sec Id', this.state.secId);
      })
      .catch(err => {
        this.setState({
          loading: false,
          disableTouch: false,
          msg: `Couldn't create transaction`,
          type: 'w',
          visible: true,
        });
        console.log(`buy sec error is ${err}`);
        console.log('error sec Id', this.state.secId);
        console.log('error sec Id', this.state.token);
      });
  };

  increaseAmount = () => {
    this.setState({
      amountCounter: ++this.state.amountCounter,
    });
  };

  decreaseAmount = () => {
    this.setState(prevState => ({
      amountCounter: Math.max(prevState.amountCounter - 1, 0),
    }));
  };

  showSuccessBuy = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideSuccess = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
    this.props.navigation.navigate('Securities');
  };

  handleClose = () => {
    this.setState({
      visible: false,
      msg: '',
      type: '',
    });
  };

  showInput = () => {
    this.setState({
      showInput: !this.state.showInput,
    });
  };
  render() {
    const {
      amountCounter,
      modalVisible,
      loading,
      visible,
      msg,
      type,
      showInput,
    } = this.state;
    const {state} = this.props.navigation;
    console.log('secprice', this.state.secPrice);
    let amountNaira = amountCounter * this.state.secPrice;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <Fragment>
              <Header headerName={state.params.title} />

              <View style={{margin: 30}}>
                <Text style={styles.buyTxt}>Nice Move!!!</Text>

                <Text style={[styles.chooseAmount, {color: value.mode.text}]}>
                  Choose the total amount of units you want to buy.
                </Text>
              </View>

              <View style={{margin: 30}}>
                <Text style={[styles.chooseAmount, {color: value.mode.text}]}>
                  {' '}
                  Select Amount Units
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={this.decreaseAmount}
                    style={styles.counterContainer}>
                    <Text style={styles.counterTxt}> - </Text>
                  </TouchableOpacity>

                  {showInput ? (
                    <TextInput
                      keyboardType={'numeric'}
                      placeholderTextColor={colors.grey2}
                      style={styles.inputStyle}
                      autoCorrect={false}
                      // placeholder="0"
                      value={amountCounter}
                      onChangeText={amountCounter =>
                        this.setState({amountCounter})
                      }
                    />
                  ) : (
                    <TouchableOpacity onPress={() => this.showInput()}>
                      <Text style={styles.buyTxt}> {amountCounter}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={this.increaseAmount}
                    style={styles.counterContainer}>
                    <Text style={[styles.counterTxt, {fontSize: 30}]}> + </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{alignItems: 'center', marginVertical: 40}}>
                <Text style={[styles.chooseAmount, {color: value.mode.text}]}>
                  {' '}
                  Your total in naira is NGN {amountNaira}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 18,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      secId: state.params.id,
                      amount: amountNaira,
                      loading: true,
                      disableTouch: true,
                    });
                    setTimeout(() => {
                      this.buySecurities();
                    }, 1000);
                  }}
                  disabled={this.state.disableTouch}
                  style={[
                    styles.buyBtn,
                    this.state.loading ? {backgroundColor: 'lightgray'} : null,
                  ]}>
                  <AntDesign
                    name="arrowdown"
                    size={20}
                    color={colors.whitesmoke}
                  />
                  <Text style={{marginLeft: 12, color: colors.whitesmoke}}>
                    Buy
                  </Text>
                </TouchableOpacity>
              </View>
              {loading ? <Loader /> : null}
              <Modal isVisible={modalVisible}>
                <View style={{flex: 1, justifyContent: 'center', padding: 18}}>
                  <View style={{backgroundColor: 'white', borderRadius: 6}}>
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
                      <Text style={styles.successTxt}>
                        You have successfully bought {state.params.title} at NGN
                        {amountNaira}
                      </Text>
                    </View>
                    <View style={{marginVertical: 20}}>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 15,
                          bottom: 2,
                        }}
                        onPress={() => this.hideSuccess()}>
                        <Text style={[styles.creditDetails]}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </Fragment>
            <Snackbar
              visible={visible}
              handleClose={this.handleClose}
              msg={msg}
              type={type}
            />
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
    marginVertical: 20,
    alignItems: 'center',
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
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    // paddingBottom: 10,
    // marginTop: 35,
    // marginHorizontal: 20,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 40,
    height: 40,
    alignItems: 'center',
  },
});
