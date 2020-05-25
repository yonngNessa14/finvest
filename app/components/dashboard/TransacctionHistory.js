import React, {useState, useEffect, Fragment, Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../constants/colors';
import {history} from '../../constants/data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../../config';
import axios from 'axios';
import moment from 'moment';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import {withNavigation} from 'react-navigation'

class TransactionHistory extends Component {
  state = {
    transaction: '',
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    var maxlimit = 20;
    const {transaction} = this.props;
    return (
      <ThemeConsumer>
        {value => (
          <View style={styles.container}>
            <Fragment>
              <Text style={[styles.historyTxt, {color: value.mode.text}]}>
                Transaction History
              </Text>

              {transaction ? (
                transaction.map(history => {
                  return (
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Transactions')}
                      key={history.id}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.iconWrapper}>
                          <FontAwesome name="history" size={20} color="white" />
                        </View>
                        <View style={styles.historyWrapper}>
                          <View>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={0.2}
                              style={[
                                styles.nameTxt,
                                {color: value.mode.text},
                              ]}>
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
                          ₦{this.formatNumber(history.amount)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={{padding: 12}}>
                  <Text style={styles.nameTxt}>No transaction yet...</Text>
                </View>
              )}
              <View style={{height: 50}} />
            </Fragment>
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

export default withNavigation( TransactionHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // height: 300,
    paddingLeft: 12,
    paddingRight: 10,
  },
  historyTxt: {
    marginLeft: 12,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
  },
  historyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: colors.green,
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: 6,
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
  },
});
