import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Switch
} from 'react-native';
import Snackbar from '../../components/helpers/Snackbar';
import Network from '../../components/helpers/Network';
import {colors} from '../../constants/colors';
import Header from '../../components/helpers/Header'

const WIDTH = Dimensions.get('window').width;


export default function Security() {
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
      <Network>
           <Header headerName = "Security Settings"  />

         
        <ScrollView contentContainerStyle={{}} style={styles.container}>
          <View style={styles.root}>
            <View>
              <Text style={styles.securityTxt}>Biometric Unlock</Text>

              <Text style={styles.referralTxt}>
                You can set up your fingerprint to 
              </Text>
              <Text style={styles.referralTxt}>
              grant access to your account.
              </Text>
            </View>

            <Switch
              trackColor={{false: '#767577', true: colors.baseColor3}}
              thumbColor={isEnabled ? colors.baseBorder : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
               value={isEnabled}
            />
          </View>
        </ScrollView>
      </Network>
    );
  
    }


const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  root: {
    padding: 12,
flexDirection: 'row',
justifyContent: 'space-between',
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

 
  referralTxt: {
    color: colors.grey2,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'quicksand',
  },
 
  securityTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 18,
    fontFamily: 'quicksand',
  },
  
});


