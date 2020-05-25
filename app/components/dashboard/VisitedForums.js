import React, {useState, useEffect, Component, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {colors} from '../../constants/colors';
import axios from 'axios';
import {config} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

class VisitedForums extends Component {
  state = {
    myForums: [],
    loading: false,
  };

  async componentDidMount() {
    await this._retrieveData();
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
        // console.log('There was an error retrieving the data' + error);
      });
  };

 

  render() {
    const {userforums,} = this.props;
    return (
      <ThemeConsumer>
      {(value) => (
      <View style={styles.container}>
        <Fragment>
          <Text style={[styles.forumTxt, {color: value.mode.text}]}>Most Visited Forums</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dashCards}>
            {userforums === [] ? (
              <View style={{marginTop: 12}}>
                <Text style={styles.forumTxt}>
                  You have not visited any Forums yet
                </Text>
              </View>
            ) : (
              userforums.map(forums => {
                return (
                  <View
                    key={forums.id}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{height: 60, width: 60, borderRadius: 30}}
                      source={{uri: forums.logo}}
                    />
                    <Text style={[styles.forumsTxt, {color: value.mode.text}]}>{forums.name}</Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        </Fragment>
      </View>
      )}
      </ThemeConsumer>
    );
  }
}

export default VisitedForums;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 12,
  },
  forumTxt: {
    marginLeft: 12,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
  },
  forumsTxt: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 8,
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
    fontSize: 14,
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
