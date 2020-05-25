import React, {useState, useEffect, Fragment, Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {history2} from '../../constants/data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/helpers/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../../config';
import axios from 'axios';
import moment from 'moment';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

class TransactionHistory extends Component {
  state = {
    transaction: '',
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
    this.setState({
      loading: true,
    });
    await this._retrieveData();
    await this.getUserTransaction();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.transaction !== this.state.transaction) {
      this.getUserTransaction();
      console.log('did update', prevState);
    }
  }

  getUserTransaction = async () => {
    await axios({
      method: 'get',
      url: config.transactionsHistory,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.state.token}`,
      },
    })
      .then(({data}) => {
        this.setState({
          transaction: data,
          loading: false,
        });
        console.log('transaction', this.state.transaction);
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        console.log(`error is ${err}`);
        console.log(this.state.token);
      });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  render() {
    const {transaction} = this.state;
    var maxlimit = 26;
    return (
      <ThemeConsumer>
        {value => (
          <Fragment>
            <Header headerName="Transaction History" />
            <View
              style={[
                styles.container,
                {backgroundColor: value.mode.background},
              ]}>
              {transaction ? (
                transaction.map(history => {
                  return (
                    <View
                      key={history.name}
                      style={{
                        // flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 0.4,
                        // padding: 16
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={[styles.iconWrapper, {backgroundColor: history.item_type == "payout" ? colors.green : colors.pink }]}>
                          <FontAwesome name="history" size={20} color="white" />
                        </View>
                        <View style={styles.historyWrapper}>
                          <View>
                            <Text
                              style={[
                                styles.nameTxt,
                                {color: value.mode.text},
                              ]}>
                              {' '}
                              {history.name.length > maxlimit
                                ? history.name.substring(0, maxlimit - 3) +
                                  '...'
                                : history.name}
                            </Text>
                            <Text
                              style={[
                                styles.dateTxt,
                                {color: value.mode.text},
                              ]}>
                              {' '}
                              {moment(history.created_at).format(
                                'dddd Do MMMM, YYYY',
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          alignContent: 'flex-end',
                        }}>
                        <Text
                          style={[styles.amountTxt, {color: value.mode.text}]}>
                          {' '}
                          ₦{this.formatNumber(history.amount)}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={{padding: 12}}>
                  <Text style={[styles.nameTxt, {color: value.mode.text}]}>
                   
                  </Text>
                </View>
              )}
              <View style={{height: 50}} />
            </View>
          </Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // height: 300
    padding: 12,
  },
  historyTxt: {
    marginLeft: 18,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
  },
  historyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  iconWrapper: {
    backgroundColor: colors.green,
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: 12,
  },
  nameTxt: {
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
  },
  dateTxt: {
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 10,
  },
  amountTxt: {
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    textAlign: 'right',
    alignItems: 'flex-end',
    // paddingRight:
  },
});
