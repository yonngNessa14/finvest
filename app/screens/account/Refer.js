import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header'


const WIDTH = Dimensions.get('window').width;

class Refer extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <Network>
       <Header 
       headerName= "Refer and Earn"
       />
        <ScrollView contentContainerStyle={{}} style={styles.container}>
          <View style={styles.root}></View>
          <View>
            <View style={{marginTop: -60, alignItems: 'center'}}>
              <Image source={require('../../assets/images/slider4.png')} />
              <Text style={styles.bioData}>Earn N300 for every referral</Text>
            </View>
          </View>
          <View
            style={styles.refer}>
            <Text style={{fontWeight: 'bold', color: colors.grey2}}>
              Your Referral Code
            </Text>
            <TouchableOpacity>
              <Text style={{fontWeight: 'bold', color: colors.baseBorder}}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.referralBtn}>
            <Text style={styles.referralTxt}>OLA300</Text>
          </TouchableOpacity>
          <View style={{height: 50}} />
        </ScrollView>
      </Network>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    padding: 12,
    alignSelf: 'center',
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
    alignItems: 'center',
    padding: 12,
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
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 45,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: colors.baseBorder,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    width: WIDTH - 50,
    height: 95,
  },
  referralTxt: {
    color: colors.whitesmoke,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
  referralBtn: {
    backgroundColor: colors.baseBorder,
    borderRadius: 6,
    width: '90%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  bioData: {
    fontWeight: 'bold',
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontSize: 18,
    textAlign: 'center',
  },
  bioTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 18,
  },
  refer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 60,
  }
});

export default Refer;
