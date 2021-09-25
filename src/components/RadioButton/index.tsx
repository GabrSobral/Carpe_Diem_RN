import React from "react";
import { TouchableOpacity, View, TouchableOpacityProps, Text } from 'react-native'
import { theme } from "../../styles/theme";
import { styles } from "./style";

interface RadioButtonProps extends TouchableOpacityProps {
  selected?: boolean;
  value: number
}

export function RadioButton({ selected = false, value, ...rest }: RadioButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.buttonContainer} activeOpacity={0.8}>
      <View style={styles.button}>
        {
          selected ?
            <View style={styles.selected}/>
            : null
        }
      </View>
      <Text style={styles.text}>{`${value}`}</Text>
    </TouchableOpacity>
  );
}