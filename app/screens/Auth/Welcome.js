import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {Title, Caption, Subheading} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constants/colors';
import Background from '../../components/helpers/Background';

const Welcome = props => {
  const {navigation} = props;
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Background>
        <Swiper
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 16,
                height: 16,
                borderRadius: 8,
                marginLeft: 10,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 50,
              }}
            />
          }
          activeDot = {
            <View
            style={{
              backgroundColor: colors.baseBorder,
              width: 16,
              height: 16,
              borderRadius: 8,
              marginLeft: 10,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 50,
            }}
          />
          }
          autoplay
          autoplayTimeout={5}
          dotStyle={classes.dotStyle}
          dotColor="transparent"
          activeDotColor={colors.baseColor}
          style={classes.wrapper}>
          <View style={classes.rootSlider}>
            <TouchableOpacity
              style={classes.skip}
              onPress={() => navigation.navigate('Login')}>
              <Subheading style={classes.SkipText}>Skip</Subheading>
              <Icon name="long-arrow-right" size={22} color={colors.grey2} />
            </TouchableOpacity>
            <View style={classes.slide}>
              <Image
                // style={{ height: 300, width: 300 }}
                source={require('../../assets/images/slider1.png')}
              />
              <Title style={classes.text}>Invest like a Pro</Title>
              <Caption style={classes.Caption}>
                Choose between Stocks, Bonds, ETFs and lots more.
              </Caption>
            </View>
          </View>
          <View style={classes.rootSlider}>
            <TouchableOpacity
              style={classes.skip}
              onPress={() => navigation.navigate('Login')}>
              <Subheading style={classes.SkipText}>Skip</Subheading>
              <Icon name="long-arrow-right" size={22} color={colors.grey2} />
            </TouchableOpacity>
            <View style={classes.slide}>
              <Image
                //  style={{ height: 300, width: 300 }}

                source={require('../../assets/images/slider2.png')}
              />
              <Title style={classes.text}>Buy bits of Companies</Title>
              <Caption style={classes.Caption}>
                Buy bits of companies you love with the aid of fractional
                shares.
              </Caption>
            </View>
          </View>
          <View style={classes.rootSlider}>
            <TouchableOpacity
              style={classes.skip}
              onPress={() => navigation.navigate('Login')}>
              <Subheading style={classes.SkipText}>Skip</Subheading>
              <Icon name="long-arrow-right" size={22} color={colors.grey2} />
            </TouchableOpacity>
            <View style={classes.slide}>
              <Image
                //  style={{ height: 300, width: 300 }}

                source={require('../../assets/images/slider3.png')}
              />
              <Title style={classes.text}>Connect with Investors</Title>
              <Caption style={classes.Caption}>
                Connect with like minded investors in various chatrooms and get
                investment advice.
              </Caption>
            </View>
          </View>

          <View style={classes.rootSlider}>
            <View style={classes.slide}>
              <Image
                //  style={{ top: 0 }}

                source={require('../../assets/images/slider4.png')}
              />
              <Title style={classes.text}>Earn Rewards</Title>
              <Caption style={classes.Caption}>
                Get rewarded for referrals, shares and lots more.
              </Caption>
            </View>

            <View style={classes.beginWrapper}>
              <TouchableOpacity
                style={classes.begin}
                onPress={() => navigation.navigate('Login')}>
                <Subheading style={classes.beginText}>Lets's Begin</Subheading>
                <Icon name="arrow-right" color="white" size={15} />
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
      </Background>
    </ScrollView>
  );
};

export default Welcome;

const classes = StyleSheet.create({
  rootSlider: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  slide: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'center',
  },
  text: {
    paddingBottom: 10,
    paddingTop: 40,
    color: colors.baseColor,
    fontSize: 25,
  

  },
  Caption: {
    color: 'gray',
    textAlign: 'center',
    // marginTop: 30,
    fontWeight: 'bold',
  },
  SkipText: {
    color: 'gray',
    paddingHorizontal: 5,
  },
  skip: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // marginTop: 50
  },
  dot: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: -30,
    marginBottom: 3,
  },
  begin: {
    backgroundColor: colors.baseColor,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 6,
  },

  beginWrapper: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  beginText: {
    color: colors.whitesmoke,
    marginRight: 8,
  },
  dotStyle: {
    borderColor: colors.baseColor1,
    borderWidth: 1,
  },
});
