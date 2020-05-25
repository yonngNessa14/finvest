import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {withNavigation} from 'react-navigation';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';
import Modal from 'react-native-modal';
import { config } from '../../../config';
import axios from 'axios';
import { ProductConsumer } from '../../../ProductProvider';

class ChatHeader extends Component {
  state = {
    toggleMore: false,
  };
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

  exitForum = async () => {
    this.setState({
      toggleMore: false
    })
    const {forumId, token} = this.props
    await axios({
      method: 'post',
      url: config.exitForum,
      headers: {
        Authorization: `JWT ${token}`,
      },
      data: {
        forum_id: forumId,
      },
    })
      .then(({data}) => {
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate("Home")
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        this.exitForum()
        // console.log(`exit group error is ${err}`);
        // console.log('exit group forum Id', forumId);
        // console.log('exit group forum Id', this.state.token);
      });
  }

  enterPersonalChats = () => {
    this.setState({
      toggleMore: false
    })
    this.props.navigation.navigate('PersonalChats')
  }
  
  
  render() {
    const {toggleMore} = this.state
    return (
      <ThemeConsumer>
        {value => (
          <View
            style={[
              styles.container,
              {backgroundColor: value.mode.background},
            ]}>
            <View
              style={[styles.header, {backgroundColor: value.mode.background}]}>
              <TouchableOpacity
                style={{marginTop: 6}}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Ionicons
                  name="ios-arrow-round-back"
                  size={30}
                  color={value.mode.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.chatDetails()}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    marginLeft: 10,
                  }}
                  source={{uri: this.props.logo}}
                />
                <ProductConsumer>
                  {(chatValue) => {
                    let arr = [];
                    chatValue.chats.map(el => {
                      if (arr.includes(el.senderId)) {
                        
                      }
                      else {
                        arr.push(el.senderId);
                      }
                    });
                    // console.log(arr);
                    
                    return <View style={{ marginLeft: 6 }}>
                      <Text style={[styles.headerTxt, { color: value.mode.text }]}>
                        {' '}
                        {this.props.title}{' '}
                      </Text>
                      <Text style={styles.subtitleTxt}>
                        {' '}
                        {this.props.login ? null : `${arr.length} people online`}{' '}
                      </Text>
                    </View>
                  }}
                </ProductConsumer>
                
              </TouchableOpacity>
              <TouchableOpacity
                style={{position: 'absolute', right: 18, marginTop: 24}}
                onPress={() => this.toggleMore()}>
                <Ionicons name="md-more" size={30} color={value.mode.text} />
              </TouchableOpacity>
            </View>
            {this.props.children}

            <Modal
              onBackdropPress={() => this.setState({toggleMore: false})}
              isVisible={toggleMore}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                  onPress={() => this.enterPersonalChats()}
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <Text style={styles.modalText}>Personal Chats</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <Text style={styles.modalText}>Settings</Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => this.exitForum()}
                    style={{flexDirection: 'row', marginBottom: 12}}>
                    <Text style={styles.modalText}>Exit Forum</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

export default withNavigation(ChatHeader);

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
  },
  headerTxt: {
    fontSize: 18,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
    color: colors.grey2,
  },
  subtitleTxt: {
    color: colors.baseBorder,
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
