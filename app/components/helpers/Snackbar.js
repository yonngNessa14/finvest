import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Snackbar } from 'react-native-paper';
import {colors} from '../../constants/colors'

const screen = Dimensions.get('screen');

export default function SnackbarComponent(props) {
	const { visible, msg, type, handleClose } = props;
	return (
    <Snackbar
			visible={visible}
			style={type === "w" ? classes.warning : classes.success}
      onDismiss={() => handleClose()}
      // action={{
      //   label: 'Undo',
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
    >
      {msg}
    </Snackbar>
  );
}


const classes = StyleSheet.create({
  warning: {
    borderRadius: 40,
    //  width: screen.width,
    backgroundColor: colors.pink,
  },
  success: {
    borderRadius: 40,
    //  width: screen.width,
    backgroundColor: colors.green,
  },
});