import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {withNavigation} from 'react-navigation';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

class Header extends Component {
  render() {
    return (
      <ThemeConsumer>
        {value => (
          <View style={[styles.container, {backgroundColor: value.mode.background}]}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack(null)}>
                <Ionicons
                  name="ios-arrow-round-back"
                  size={30}
                  color= {value.mode.text}
                />
              </TouchableOpacity>
              <Text style={[styles.headerTxt, {color:  value.mode.text}]}> {this.props.headerName} </Text>
             <TouchableOpacity
             onPress={this.props.handleHeaderIcon}
             >
             <Ionicons
                size={30}
                color= {value.mode.text}
                name={this.props.headerIcon}
              />
             </TouchableOpacity>
            </View>
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 12,
    // top: 20
  },
  header: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 19,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
});
