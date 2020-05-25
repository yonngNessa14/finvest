import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../constants/colors';
import SmallCard from '../cards/SmallCard';
import {withNavigation} from 'react-navigation';

class Grid extends React.Component {
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('StockDetails', {
                data: 'Wema Bank',
              })
            }>
            <SmallCard bgColor={colors.green} logocolor="white">
              <Text style={styles.wordTxt}>WEMA BANK</Text>
            </SmallCard>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('StockDetails', {
                data: 'Wema Bank',
              })
            }>
            <SmallCard bgColor={colors.green} logocolor="white">
              <Text style={styles.wordTxt}>WEMA BANK</Text>
            </SmallCard>
          </TouchableOpacity>

          <TouchableOpacity
      onPress={() => this.props.navigation.navigate('StockDetails', {data: 'Wema Bank'})}
      >
          <SmallCard bgColor={colors.green} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <SmallCard bgColor={colors.blue} logocolor="white">
            <Text style={styles.wordTxt}>ZENITH BANK</Text>
          </SmallCard>

          <SmallCard bgColor={colors.blue} logocolor="white">
            <Text style={styles.wordTxt}>ZENITH BANK</Text>
          </SmallCard>

          <SmallCard bgColor={colors.blue} logocolor="white">
            <Text style={styles.wordTxt}>ZENITH BANK</Text>
          </SmallCard>
        </View>
        <View style={{flexDirection: 'row'}}>
          <SmallCard bgColor={colors.orange} logocolor="white">
            <Text style={styles.wordTxt}>MTN</Text>
          </SmallCard>

          <SmallCard bgColor={colors.orange} logocolor="white">
            <Text style={styles.wordTxt}>MTN</Text>
          </SmallCard>

          <SmallCard bgColor={colors.orange} logocolor="white">
            <Text style={styles.wordTxt}>MTN</Text>
          </SmallCard>
        </View>

        <View style={{flexDirection: 'row'}}>
          <SmallCard bgColor={colors.pink} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>

          <SmallCard bgColor={colors.pink} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>

          <SmallCard bgColor={colors.pink} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>
        </View>

        <View style={{flexDirection: 'row'}}>
          <SmallCard bgColor={colors.yellow} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>

          <SmallCard bgColor={colors.yellow} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>

          <SmallCard bgColor={colors.yellow} logocolor="white">
            <Text style={styles.wordTxt}>WEMA BANK</Text>
          </SmallCard>
        </View>
      </View>
    );
  }
}

export default withNavigation(Grid);

const styles = StyleSheet.create({
  stockTxt: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  wordTxt: {
    color: colors.whitesmoke,
    fontSize: 14,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
});
