//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../../components/helpers/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../config';
import moment from 'moment';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const WIDTH = Dimensions.get('window').width;

// create a component

class SecurityDetails extends Component {
  state = {
    securities: '',
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

  async componentDidMount() {
    await this._retrieveData();
    await axios({
      method: 'get',
      url: `${config.getInvestment}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          securities: data,
        });
        console.log('investments', this.state.securities);
      })
      .catch(err => {
        console.log(`error is ${err}`);
        console.log(this.state.token);
      });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    const date = moment();

    const {state} = this.props.navigation;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <View>
              <Header headerName={state.params.title} />

              <View style={styles.securityHeader}>
                <Image
                  style={styles.securityImage}
                  source={{uri: state.params.logo}}
                />
                <View style={{marginLeft: 20}}>
                  <Text style={[styles.securityName, {color: value.mode.text}]}>
                    {state.params.title}
                  </Text>
                  <Text
                    style={[styles.securitySubtitle, {color: value.mode.text}]}>
                    by {state.params.title}
                  </Text>
                  <View style={styles.securityDetail}>
                    <MaterialIcons
                      name="credit-card"
                      size={18}
                      color={colors.blue}
                    />
                    <Text
                      style={[styles.securityTxt, {color: value.mode.text}]}>
                      N{this.formatNumber (state.params.price)} per unit/share
                    </Text>
                  </View>
                  {/* <View style={styles.securityDetail}>
                    <FontAwesome name="users" size={18} color={colors.green} />
                    <Text
                      style={[styles.securityTxt, {color: value.mode.text}]}>
                      {state.params.members}
                      {state.params.members == 1 ? ' investor' : ' investors'}
                    </Text>
                  </View> */}
                  <View style={styles.securityDetail}>
                  <MaterialCommunityIcons
                                    name="coins"
                                    size={18}
                                    color={colors.green}
                                  />
                    <Text
                      style={[styles.securityTxt, {color: value.mode.text}]}>
                      {state.params.unit <= 0 ? 0 : state.params.unit} total units left 
                    </Text>
                  </View>
                  {/* <View style={styles.securityAvail}>
                    <Text style={{color: value.mode.text}}>
                      {state.params.status}
                    </Text>
                  </View> */}
                </View>
              </View>
              {state.params.unit <= 0 ? (
                <TouchableOpacity
                  disabled
                  style={[styles.buySecurity, {backgroundColor: 'lightgray'}]}>
                  <Text style={[styles.buyTxt]}>
                    Buy Units
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('BuySecurities', {
                      id: state.params.id,
                      logo: state.params.logo,
                      title: state.params.title,
                      price: state.params.price,
                      status: state.params.status,
                      roi: state.params.roi,
                      mature: state.params.maturityPeriod,
                    })
                  }
                  style={styles.buySecurity}>
                  <Text style={[styles.buyTxt]}>
                    Buy Units
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.secListWrapper}>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Expected Returns
                </Text>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Current Value/Unit
                </Text>
              </View>

              <View style={styles.secListValue}>
                <Text style={[styles.listValue, {color: value.mode.text}]}>
                  {state.params.roi}% in {state.params.maturityPeriod} months
                </Text>
                <Text style={[styles.listValue, {color: value.mode.text}]}>
                  N{this.formatNumber (state.params.price)} per share
                </Text>
              </View>

              <View style={styles.secListWrapper}>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Start Date
                </Text>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Maturity Date
                </Text>
              </View>

              <View style={styles.secListValue}>
                <Text
                  style={[
                    styles.listValue,
                    {color: value.mode.text},
                  ]}>
                  {moment(state.params.start_date).format('LL')}
                </Text>
                <Text
                  style={[
                    styles.listValue,
                    {color: value.mode.text,},
                  ]}>
                  {' '}
                  {moment(state.params.end_date).format('LL')}
                </Text>
              </View>

              <View style={styles.secListWrapper}>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Investment Type
                </Text>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Insurance Partner
                </Text>
              </View>

              <View style={styles.secListValue}>
                <Text style={[styles.listValue, {color: value.mode.text}]}>
                  {state.params.investmentType}
                </Text>
                <Text style={[styles.listValue, {color: value.mode.text}]}>
                  {state.params.insurancePartner}
                </Text>
              </View>

              <View style={styles.secListWrapper}>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Payout Type
                </Text>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Unit Type
                </Text>
              </View>

              <View style={styles.secListValue}>
                <View style={{width: WIDTH / 2}}>
                  <Text
                    style={[
                      styles.listValue,
                      {color: value.mode.text, width: WIDTH / 2.5},
                    ]}>
                    {state.params.payoutType}.{' '}
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={[
                      styles.listValue,
                      {color: value.mode.text, },
                    ]}>
                    {state.params.unit_type}
                  </Text>
                </View>
              </View>

              <View style={styles.secListWrapper}>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Extra Information
                </Text>
              </View>

              <View style={styles.secListValue}>
                <View style={{width: WIDTH / 2}}>
                  <Text
                    style={[
                      styles.listValue,
                      {color: value.mode.text, width: WIDTH / 2.5},
                    ]}>
                    {state.params.extraInfo}
                  </Text>
                </View>
              </View>

              <View style={styles.moreInfo}>
                <Text style={[styles.listName, {color: value.mode.text}]}>
                  Want to know more about this investment.
                  <Text
                    style={[
                      styles.listName,
                      {color: colors.baseBorder, fontWeight: 'bold'},
                    ]}>
                    {' '}
                    Read more here.
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {},
  securityHeader: {
    margin: 20,
    flexDirection: 'row',
    paddingTop: 0,
  },
  securityImage: {
    height: 135,
    width: 135,
    borderRadius: 10,
  },
  securityName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
    color: colors.grey2,
    width: WIDTH / 2,
  },
  securitySubtitle: {
    color: colors.grey2,
    marginTop: 5,
    width: WIDTH / 2,
  },
  securityDetail: {
    flexDirection: 'row',
    marginVertical: 4,
    width: WIDTH / 3,
  },
  securityAvail: {
    backgroundColor: colors.green,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  securityTxt: {
    color: colors.grey2,
    marginLeft: 10,
    fontFamily: 'quicksand',
  },
  buySecurity: {
    backgroundColor: colors.baseBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 18,
    margin: 22,
  },
  buyTxt: {
    fontFamily: 'quicksand',
    color: colors.whitesmoke,
  },
  secListWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 16,
  },
  secListValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  listName: {
    color: colors.grey2,
    marginBottom: 5,
    fontFamily: 'quicksand',
    fontSize: 15,
  },
  listValue: {
    color: colors.grey2,
    marginBottom: 5,
    fontFamily: 'quicksand',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  moreInfo: {
    marginVertical: 80,
    marginHorizontal: 16,
  },
});

//make this component available to the app
export default SecurityDetails;
