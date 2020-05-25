import React, {Component, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constants/colors';
import Grid from '../../components/stock/Grid';
import List from '../../components/stock/List';
import Modal from 'react-native-modal';
import {ThemeConsumer} from '../../components/theme/ThemeContextProvider';

const WIDTH = Dimensions.get('window').width;

const Stock = () => {
  const [grid, setGrid] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleStock = () => {
    setGrid(!grid);
  };

  const showSortModal = () => {
    setModalVisible(true);
  };
  return (
    <ThemeConsumer>
      {value => (
        <ScrollView style={[
          styles.container,
          {backgroundColor: value.mode.background},
        ]}>
          <SafeAreaView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.header, {color: value.mode.text}]}>Stocks</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => showSortModal()}>
                  {/* <MaterialIcons color={colors.grey2} size={24} name="sort" /> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{marginLeft: 20}}
                  onPress={() => toggleStock()}>
                  <SimpleLineIcons
                    color={value.mode.text}
                    size={20}
                    name="equalizer"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginVertical: 20}}>
              <Text style={[styles.stockTxt, {color: value.mode.text}]}>Todays top NSE stocks</Text>
            </View>
            {!grid ? <Grid /> : <List />}
          </SafeAreaView>
          <Modal
            // onBackdropPress={setModalVisible(false)}
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
                  <Text style={styles.modalText}>Sort by Watchlist</Text>
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
                  <Text style={styles.modalText}>Sort by NSE Rank</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{flexDirection: 'row', marginBottom: 12}}>
                  <FontAwesome
                    color={colors.baseBorder}
                    name="sort-alpha-asc"
                    size={20}
                  />
                  <Text style={styles.modalText}>Sort by Change(%)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{flexDirection: 'row', marginBottom: 12}}>
                  <FontAwesome
                    color={colors.baseBorder}
                    name="sort-amount-desc"
                    size={20}
                  />
                  <Text style={styles.modalText}>Sort by Purchased</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </ScrollView>
      )}
    </ThemeConsumer>
  );
};

export default Stock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
    padding: 12,
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
    color: colors.whitesmoke,
    fontSize: 14,
    fontFamily: 'quicksand',
    fontWeight: 'bold',
  },
  sortMenu: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
