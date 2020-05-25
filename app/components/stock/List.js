import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import FlatCard from "../cards/FlatCard";

const Grid = () => {
  return (
    
      <View style={{flex: 1}}>
        <FlatCard bgColor={colors.green} logocolor="white">
          <Text style={styles.wordTxt}>WEMA BANK</Text>
        </FlatCard>

        <FlatCard bgColor={colors.blue} logocolor="white">
          <Text style={styles.wordTxt}>WEMA BANK</Text>
        </FlatCard>

        <FlatCard bgColor={colors.orange} logocolor="white">
          <Text style={styles.wordTxt}>WEMA BANK</Text>
        </FlatCard>
        <FlatCard bgColor={colors.pink} logocolor="white">
          <Text style={styles.wordTxt}>WEMA BANK</Text>
        </FlatCard>

        <FlatCard bgColor={colors.green} logocolor="white">
          <Text style={styles.wordTxt}>WEMA BANK</Text>
        </FlatCard>


      </View>
    
  );
};

export default Grid;

const styles = StyleSheet.create({
  stockTxt: {
    marginLeft: 6,
    fontFamily: "quicksand",
    color: colors.grey2,
    fontWeight: "bold",
    fontSize: 14
  },
  wordTxt: {
    color: colors.whitesmoke,
    fontSize: 14,
    fontFamily: "quicksand",
    fontWeight: "bold"
  }
});
