import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {withNavigation} from 'react-navigation';
import { ThemeConsumer } from '../../components/theme/ThemeContextProvider';
import { ProductConsumer } from '../../../ProductProvider';

class SingleChatHeader extends Component {
  state = {
    toggleMore: false
  }
  chatDetails = () => {
    this.props.navigation.navigate('ChatDetails', {
      name: this.props.title,
      id: this.props.forumId,
      logo: this.props.logo,
      description: this.props.description,
      details: this.props.forumDetails,
    });
  };

  toggleMore = () => {
    this.setState({
      toggleMore: true,
    });
  };

  banUser = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to Ban this user from sending you direct message?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };


  render() {
    const {state} = this.props.navigation;
    const {toggleMore} = this.state
    return (
      <View>
      <ThemeConsumer>
          {value => (
            <View
              style={[
                styles.container,
                { backgroundColor: value.mode.background },
              ]}>
              <View
                style={[styles.header, { backgroundColor: value.mode.background }]}>
                <TouchableOpacity
                  style={{ marginTop: 6 }}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Ionicons
                    name="ios-arrow-round-back"
                    size={30}
                    color={value.mode.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.chatDetails()}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      marginLeft: 10,
                    }}
                    source={{ uri: this.props.logo }}
                  />
                  <ProductConsumer>
                    {(chatValue) => {
                      return <View style={{ marginLeft: 6 }}>
                        <Text style={[styles.headerTxt, { color: value.mode.text }]}>
                          {this.props.navigation.getParam('login')}
                        </Text>
                        
                      </View>
                    }}
                  </ProductConsumer>

                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{ position: 'absolute', right: 18, marginTop: 24 }}
                  onPress={() => this.toggleMore()}>
                  <Ionicons name="md-more" size={30} color={value.mode.text} />
                </TouchableOpacity> */}
              </View>
              {this.props.children}

              {/* <Modal
                onBackdropPress={() => this.setState({ toggleMore: false })}
                isVisible={toggleMore}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      onPress={() => this.enterPersonalChats()}
                      style={{ flexDirection: 'row', marginBottom: 12 }}>
                      <Text style={styles.modalText}>Personal Chats</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: 'row', marginBottom: 12 }}>
                      <Text style={styles.modalText}>Settings</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                      onPress={() => this.exitForum()}
                      style={{ flexDirection: 'row', marginBottom: 12 }}>
                      <Text style={styles.modalText}>Exit Forum</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </Modal> */}
            </View>
          // <View
          //   style={[
          //     styles.container,
          //     {backgroundColor: value.mode.background},
          //   ]}>
          //   <View
          //     style={[styles.header, {backgroundColor: value.mode.background}]}>
          //     <TouchableOpacity
          //       style={{marginTop: -8, marginRight: 10}}
          //       onPress={() => this.props.navigation.goBack(null)}>
          //       <Ionicons
          //         name="ios-arrow-round-back"
          //         size={30}
          //         color={value.mode.text}
          //       />
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       // onPress={() => this.chatDetails()}
          //       style={{flexDirection: 'row', alignItems: 'center'}}>
          //       <Image
          //         style={{
          //           height: 50,
          //           width: 50,
          //           borderRadius: 25,
          //           marginLeft: 10,
          //         }}
          //         source={require('../../assets/images/header.png')}
          //       />
          //       <View style={{marginLeft: 6}}>
          //         <Text style={[styles.headerTxt, {color: value.mode.text}]}>
          //           {' '}
          //           {state.params.login}
          //         </Text>
          //         {/* <Text style={styles.subtitleTxt}>
          //           {' '}
          //           {this.props.onlineUsers == 1
          //             ? ' 1 person online'
          //             : `${this.props.onlineUsers} people online`}{' '}
          //         </Text> */}
          //       </View>
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       style={{position: 'absolute', right: 18, marginTop: 24}}
          //       onPress={() => this.toggleMore()}>
          //       <Ionicons name="md-more" size={30} color={value.mode.text} />
          //     </TouchableOpacity>
          //   </View>
          //     {this.props.children}
          // </View>
        )}
        </ThemeConsumer>
        
        {/* <Modal
          onBackdropPress={() => this.setState({toggleMore: false})}
          isVisible={toggleMore}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <TouchableOpacity
                onPress={() => this.banUser()}
                style={{flexDirection: 'row', marginBottom: 12}}>
                <Text style={styles.modalText}>Ban</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
      </View>
      
    );
  }
}

export default withNavigation(SingleChatHeader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
  },
  header: {
    fontFamily: 'quicksand',
    color: colors.grey2,
    fontWeight: 'bold',
    fontSize: 19,
    elevation: 2,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    padding: 14,
    marginTop: 3,
    paddingVertical: 40
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  subtitleTxt: {
    color: colors.green,
    fontSize: 10,
  },
  centeredView: {
    flex: 1,
    position: 'absolute',
    top: 10,
    width: 200,
    right: -15,
   
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderColor: colors.baseBorder,
    borderWidth: 0.6,
    padding: 5,
    // alignItems: 'center',
    elevation: 0,
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
