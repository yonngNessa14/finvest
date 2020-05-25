import React from 'react';
import {
  Text,
  StatusBar,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../constants/colors';
import Background from '../components/helpers/Background';

const HEIGHT = Dimensions.get('window').height;

export default class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
      this._bootstrapAsync();
  }


  
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    // console.log('ggg', userToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.baseBorder}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <StatusBar
            backgroundColor={colors.baseBorder}
            barStyle={colors.baseBorder}
          />
          <Background>
            <View style={styles.container}>
              <Image
                style={{height: 180, width: 180, marginLeft: 20}}
                source={require('../assets/images/Fin.png')}
              />
              <Text style={styles.finTxt}>FinVestor</Text>
            </View>
          </Background>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: HEIGHT / 4,
  },
  finTxt: {
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginLeft: 10,
    marginTop: -30
  },
});
