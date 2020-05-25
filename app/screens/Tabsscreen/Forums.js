import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import CardView from 'react-native-cardview';
import {securities, yoursecurities} from '../../constants/data';
import {withNavigation} from 'react-navigation';
import Modal from 'react-native-modal';
import Loader from '../../components/helpers/Loader';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class Securities extends React.Component {
  state = {
    grid: true,
    activeIndex: 0,
    modalVisible: false,
    investments: [],
    myForums: [],
    token: '',
    loading: false,
  };

  pageClicked = index => {
    this.setState({
      activeIndex: index,
    });
  };

  toggleStock = () => {
    this.setState({
      grid: !this.state.grid,
    });
  };

  showSortModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.myForums !== this.state.myForums) {
      this.getUsersForum();
      // console.log(prevState);
    }
  }

  renderPage = () => {
    const {activeIndex, investments, myForums} = this.state;
    const {forums, userforums} = this.props;
    if (activeIndex == 0) {
      return forums.map(security => {
        return (
          <ThemeConsumer>
            {value => (
              <View key={security.name} style={{padding: 18}}>
                <TouchableOpacity
                  activeOpacity={0}
                  onPress={() =>
                    security.is_member
                      ? this.props.navigation.navigate('ChatPage', {
                          id: security.id,
                          name: security.name,
                          logo: security.logo,
                        })
                      : !security.free
                      ? this.props.navigation.navigate('JoinForum', {
                          id: security.id,
                          name: security.name,
                          logo: security.logo,
                          price: security.price,
                          description: security.description,
                          number_of_members: security.number_of_members,
                        })
                      : this.props.navigation.navigate('JoinOpenForum', {
                          id: security.id,
                          name: security.name,
                          logo: security.logo,
                          status: security.free,
                          description: security.description,
                        })
                  }>
                  <CardView
                    style={{backgroundColor: value.mode.card}}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <View
                        style={{
                          borderRightWidth: 0.6,
                          borderRightColor: 'lightgray',
                          padding: 2.6,
                        }}>
                        <Image
                          style={{
                            height: 120,
                            width: 100,
                            resizeMode: 'contain',
                          }}
                          source={{uri: security.logo}}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 12,
                          marginLeft: 12,
                          width: WIDTH / 2,
                        }}>
                        <Text style={styles.wordTxt}>{security.name}</Text>

                        <View
                          style={{
                            marginTop: 8,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginRight: 10,
                              marginBottom: 6,
                            }}>
                            <FontAwesome
                              name="users"
                              size={18}
                              color={colors.green}
                            />
                            <Text style={styles.secureTxt}>
                              {security.number_of_members} members{' '}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 3,
                            }}>
                            <MaterialIcons
                              name="credit-card"
                              size={18}
                              color={colors.blue}
                            />
                            <Text style={styles.secureTxt}>
                              {security.free ? 'Free Group' : 'Paid Group'}
                            </Text>
                          </View>
                        </View>
                        <View style={{position: 'absolute', bottom: 4}}>
                          <Text style={{color: colors.grey2, fontSize: 12}}>
                            Stocks, Bonds, Mutual Funds...
                          </Text>
                        </View>
                      </View>
                    </View>
                  </CardView>
                </TouchableOpacity>
              </View>
            )}
          </ThemeConsumer>
        );
      });
    } else if (activeIndex == 1) {
      return userforums.map(security => {
        return (
          <ThemeConsumer>
            {value => (
              <View key={security.name} style={{padding: 10}}>
                <TouchableOpacity
                  activeOpacity={0}
                  onPress={() =>
                    this.props.navigation.navigate('ChatPage', {
                      id: security.id,
                      name: security.name,
                      logo: security.logo,
                      status: security.free,
                      description: security.description,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-around',
                      borderBottomWidth: 0.6,
                      borderBottomColor: 'lightgray',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{height: 120, width: 100, resizeMode: 'contain'}}
                      source={{uri: security.logo}}
                    />

                    <View style={{marginTop: 12, marginLeft: 6}}>
                      <Text style={[styles.wordTxt, {color: value.mode.text}]}>
                        {security.name}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 6,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <FontAwesome
                            name="users"
                            size={18}
                            color={colors.green}
                          />
                          <Text
                            style={[
                              styles.myForumTxt,
                              {color: value.mode.text},
                            ]}>
                            {security.number_of_members} members{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 10,
                            width: 100,
                          }}>
                          <MaterialIcons
                            name="credit-card"
                            size={18}
                            color={colors.blue}
                          />
                          <Text
                            style={[
                              styles.myForumTxt,
                              {color: value.mode.text},
                            ]}>
                            {security.free ? 'Free Group' : 'Paid Group'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{position: 'absolute', right: 10}}>
                      <Ionicons
                        name="ios-arrow-forward"
                        size={20}
                        color={value.mode.text}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </ThemeConsumer>
        );
      });
    }
  };

  render() {
    const {activeIndex, grid, modalVisible} = this.state;
    return (
      <ThemeConsumer>
        {value => (
          <ScrollView
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <SafeAreaView
              style={[
                styles.container,
                {backgroundColor: modalVisible ? '#00000066' : null},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 12,
                }}>
                <Text style={styles.header}>Forums</Text>
                <View style={{flexDirection: 'row'}}>
                  {/* <TouchableOpacity onPress={() => this.showSortModal()}>
                    <MaterialIcons color={colors.grey2} size={24} name="sort" />
                  </TouchableOpacity> */}
                </View>
              </View>

              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 30,
                }}>
                <TouchableOpacity
                  onPress={() => this.pageClicked(0)}
                  active={activeIndex == 0}
                  style={[
                    activeIndex == 0
                      ? {
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 1,
                          width: '50%',
                        }
                      : null,
                  ]}>
                  <Text
                    style={[
                      activeIndex == 0
                        ? styles.exploreSecuritiesFocus
                        : styles.exploreSecurities,
                    ]}>
                    Find Rooms
                  </Text>
                </TouchableOpacity>

                <View>
                  <TouchableOpacity
                    onPress={() => this.pageClicked(1)}
                    active={activeIndex == 1}
                    style={[
                      activeIndex == 1
                        ? {
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 1,
                            // width: '30%',
                          }
                        : null,
                    ]}>
                    <Text
                      style={[
                        activeIndex == 1
                          ? styles.yourSecuritiesFocus
                          : styles.yourSecurities,
                      ]}>
                      Your Rooms
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.renderPage()}
              </ScrollView>
            </SafeAreaView>
            <Modal
              onBackdropPress={() => this.setState({modalVisible: false})}
              isVisible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <FontAwesome
                      color={colors.baseBorder}
                      name="sort-amount-desc"
                      size={20}
                    />
                    <Text style={styles.modalText}>Sort by Status</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <FontAwesome
                      color={colors.baseBorder}
                      name="sort-alpha-asc"
                      size={20}
                    />
                    <Text style={styles.modalText}>Sort by Alphabet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <FontAwesome
                      color={colors.baseBorder}
                      name="sort-alpha-asc"
                      size={20}
                    />
                    <Text style={styles.modalText}>Sort by Share Value</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                    });
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            {this.state.loading ? <Loader /> : null}
          </ScrollView>
        )}
      </ThemeConsumer>
    );
  }
}

export default withNavigation(Securities);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
    // padding: 12,
  },
  header: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 19,
  },
  stockTxt: {
    marginLeft: 6,
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  wordTxt: {
    color: colors.grey2,
    fontSize: 16,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
  sortMenu: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureTxt: {
    color: colors.grey2,
    // fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 13,
  },
  myForumTxt: {
    color: colors.grey2,
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 10,
  },
  exploreSecuritiesFocus: {
    marginLeft: 30,
    fontWeight: 'bold',
    color: colors.grey2,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },

  exploreSecurities: {
    marginLeft: 30,
    fontWeight: 'bold',
    color: colors.grey3,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },
  yourSecuritiesFocus: {
    marginRight: 30,
    fontWeight: 'bold',
    color: colors.grey2,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },

  yourSecurities: {
    marginRight: 30,
    fontWeight: 'bold',
    color: colors.grey3,
    marginBottom: 4,
    fontFamily: 'quicksand',
  },
  centeredView: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
    width: WIDTH,
    marginLeft: -20,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: colors.baseBorder,
    borderWidth: 0.6,
    padding: 35,
    // alignItems: 'center',

    shadowColor: 'red',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 3.84,
    elevation: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: -20,
  },
  textStyle: {
    color: 'whitesmoke',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: colors.grey2,
    fontWeight: 'bold',
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'quicksand',
  },
});
