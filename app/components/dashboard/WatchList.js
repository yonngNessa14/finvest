import React, {useState, useEffect, Fragment} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SmallCard from '../cards/SmallCard';
import {colors} from '../../constants/colors';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const DashboardCard = () => {
  return (
    <ThemeConsumer>
      {value => (
        <View style={styles.container}>
          <Fragment>
            <Text style={[styles.watchList, {color: value.mode.text}]}>
              Your Watchlist
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.dashCards}>
              <SmallCard
                bgColor={colors.green}
                logocolor="white"
                iconName="star"
                iconColor="#CA1A8E">
                <Text style={styles.wordTxt}>ACCESS BANK</Text>
              </SmallCard>

              <SmallCard
                bgColor={colors.green}
                logocolor="white"
                iconName="star"
                iconColor="#CA1A8E">
                <Text style={styles.wordTxt}>WEMA BANK</Text>
              </SmallCard>

              <SmallCard
                bgColor={colors.blue}
                logocolor="white"
                iconName="star"
                iconColor="#CA1A8E">
                <Text style={styles.wordTxt}>CAP</Text>
              </SmallCard>
            </ScrollView>
          </Fragment>
        </View>
      )}
    </ThemeConsumer>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 12,
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
  watchList: {
    marginLeft: 12,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
  },
});
