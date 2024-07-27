import React, { useMemo, useState } from "react";
import { StyleSheet, TextInput, View, } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { EnumInputType } from "../../utils/common";

function FormInput(props: IProps) {
  const {
    value,
    onChange,
    placeholder,
    iconType,
    inputType = EnumInputType.common,
  } = props;

  const [hidden, setHidden] = useState(inputType === EnumInputType.password);

  const handleInputChange = (val: string) => {
    const inputVal = val.trim();
    let newVal = value;
    if (inputVal.length < value.length) {
      newVal = newVal.slice(0, newVal.length - 1);
    } else {
      newVal = newVal + val[val.length - 1];
    }
    onChange(newVal.trim());
  }

  const displayValue = useMemo(() => {
    if (hidden) {
      const arr = new Array(value.length).fill('*');
      return arr.join('');
    } else {
      return value;
    }
  }, [value, hidden])


  return (
    <View style={style.container}>
      <Ionicons
        name={iconType}
        size={28}
        color="#222222"
      />
      <TextInput
        style={style.input}
        placeholder={placeholder}
        value={displayValue}
        onChangeText={handleInputChange}
        maxLength={20}
      />

      {
        inputType === EnumInputType.password &&
        <Ionicons
          name={hidden ? 'eye-off-outline' : 'eye-outline'}
          size={28}
          color="#222222"
          style={style.suffix}
          onPress={() => setHidden(pre => !pre)}
        />
      }
    </View>
  );
}

type IProps = {
  iconType: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputType?: EnumInputType;
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  input: {
    height: 40,
    width: '100%',
    marginLeft: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    position: 'relative',
  },

  suffix: {
    position: 'absolute',
    right: 0,
  },
})

export default FormInput;
