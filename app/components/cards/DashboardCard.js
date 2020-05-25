import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Card from './Card';
import * as Progress from 'react-native-progress';
import {colors} from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../../config';
import {withNavigation} from 'react-navigation';

class DashboardCard extends Component {
  state = {
    mySecurities: '',
    token: '',
    displayExpectedSecurities: Number('')

  };

  //retrieve token
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
        // console.log('There was an error retrieving the data' + error);
      });
  };

  //Get users securities
  getUserSecurities = async () => {
    // this.setState({
    //   loading: true,
    // });
    await axios({
      method: 'get',
      url: config.mySecurities,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          mySecurities: data,
          loading: false,
        });
        this.getSecuritiesValue();
        //  console.log('investments', this.state.mySecurities);
      })
      .catch(err => {
        //  console.log(`error is`, err.response);
        //  console.log(this.state.token);
      });
    this.getUserSecurities();
  };



  getSecuritiesValue = () => {
    let security = this.state.mySecurities;
    let filteredSecurities = security.filter(data => data.status == 'active');

    // to get total of investment amount
    securitiesAmount = filteredSecurities.map(function(filteredSecurity) {
      return Number(filteredSecurity.amount);
    });
    let securitiesTotal = securitiesAmount.reduce(function(a, b) {
      return a + b;
    }, 0);

    // console.log('sec', securitiesTotal);
    

    // to get total of investment expected return
    expectedSecuritiesAmount = filteredSecurities.map(function(
      filteredSecurity,
    ) {
      // console.log('yeeeh', filteredSecurity.expected_return);
      return Number(filteredSecurity.expected_return);
    });
    let expectedSecuritiesTotal = expectedSecuritiesAmount.reduce(function(
      a,
      b,
    ) {
      return a + b;
    },
    0);
    this.setState({
      displaySecuritiesTotal: securitiesTotal,
      displayExpectedSecurities: expectedSecuritiesTotal,
    });
    return securitiesTotal;
  };

  async componentDidMount() {
    await this._retrieveData();
    await this.getUserSecurities();
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mySecurities !== this.state.mySecurities) {
      this.setState({
        loading: false,
      });
      this.getUserSecurities();
      this.getSecuritiesValue();
    }
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    const {displaySecuritiesTotal, displayExpectedSecurities} = this.state;
    let overallProfit = displayExpectedSecurities - displaySecuritiesTotal;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dashCards}>
        <Card
          bgColor="#CA1A8E"
          logocolor="white"
          iconName="star"
          iconColor="#CA1A8E">
          <View style={styles.cardTxtWrap}>
            <Text style={styles.levelTxt}>Level 1</Text>
            <View style={styles.percent}>
              <View>
                <Text style={{color: colors.whitesmoke}}>0%</Text>
              </View>

              <View>
                <Text style={{color: colors.whitesmoke}}>100%</Text>
              </View>
            </View>
            <Progress.Bar
              progress={0.1}
              width={270}
              color={colors.green}
              unfilledColor="white"
              //  borderColor={colors.whitesmoke}
            />
            <Text style={styles.cardTxt}>
              You are doing great you are currently at 10% keep it up and you
              can level up more.
            </Text>
          </View>
        </Card>

        {/* <Card
          bgColor={colors.blue}
          logocolor="white"
          iconName="bar-chart"
          iconColor={colors.blue}>
          <View style={{marginTop: 20}}>
            <Text style={styles.headTxt}>Total Stock Value</Text>
            <Text
              style={{
                color: colors.whitesmoke,
                fontSize: 22,
                paddingVertical: 12,
                fontWeight: 'bold',
              }}>
              N359, 456, 469.78
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
                marginTop: 16,
              }}>
              <Text style={styles.wordTxt}>Total Bought</Text>
              <Text style={styles.wordTxt}>Overall Profit</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
                marginTop: 16,
              }}>
              <Text style={styles.numTxt}>N255,567,345.88</Text>
              <Text style={styles.numTxt}>N100,445,566.77</Text>
            </View>
          </View>
        </Card> */}

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('MySecurity', {
              data: this.state.mySecurities,
            })
          }>
          <Card
            bgColor={colors.green}
            logocolor="white"
            iconName="trending-up"
            iconColor={colors.green}>
            <View style={{marginTop: 20}}>
              <Text style={styles.headTxt}>Total Securities Value</Text>
              <Text
                style={{
                  color: colors.whitesmoke,
                  fontSize: 22,
                  paddingVertical: 12,
                  fontWeight: 'bold',
                }}>
                {displayExpectedSecurities
                  ? `₦${this.formatNumber(displayExpectedSecurities)}`
                  : '₦0'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                  marginTop: 16,
                }}>
                <Text style={styles.wordTxt}>Total Bought</Text>
                <Text style={styles.wordTxt}>Overall Profit</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                  marginTop: 16,
                }}>
                <Text style={styles.numTxt}>
                  {' '}
                  {displaySecuritiesTotal
                    ? `₦${this.formatNumber(displaySecuritiesTotal)}`
                    : '₦0'}
                </Text>
                <Text style={styles.numTxt}>
                  {overallProfit
                    ? `₦${this.formatNumber(overallProfit)}`
                    : '₦0'}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default withNavigation(DashboardCard);

const styles = StyleSheet.create({
  dashCards: {
    // backgroundColor: 'red'
  },
  cardTxtWrap: {
    position: 'absolute',
    bottom: 8,
    paddingHorizontal: 12,
    // alignItems: "center"
  },
  cardTxt: {
    color: colors.whitesmoke,
    alignSelf: 'center',
    // padding: 12,
    fontSize: 12,
    marginVertical: 12,
  },
  levelTxt: {
    fontSize: 26,
    color: colors.whitesmoke,
    marginBottom: 40,
    marginTop: 40,
    marginRight: 80,
    fontWeight: 'bold',
  },
  percent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headTxt: {
    color: colors.whitesmoke,
    fontSize: 12,
    marginTop: 12,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
  wordTxt: {
    color: colors.whitesmoke,
    fontSize: 12,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
  numTxt: {
    color: colors.whitesmoke,
    fontSize: 14,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
});
