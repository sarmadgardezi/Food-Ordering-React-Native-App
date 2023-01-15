import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Container from '../Container';
import Text from '../Text';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './styles';

export type RadioOption = {
  value: string;
  label: string;
  rightElement?: React.ReactElement;
};

type RadioButtonProps = {
  data: RadioOption[];
  defaultValue?: string;
  onItemPressed: (option: RadioOption) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  data,
  onItemPressed,
  defaultValue,
}) => {
  const {
    colors: {primary, border, text, card},
  } = useTheme();
  const [selectedValue, setSelectedValue] = React.useState<string>();
  const _onPress = (item: RadioOption) => {
    return () => {
      setSelectedValue(item.value);
      onItemPressed(item);
    };
  };

  const _handleOnCheckboxPress = () => {};

  return (
    <>
      {data.map((item) => {
        const {value, label, rightElement} = item;
        let isChecked = value === defaultValue;
        if (selectedValue) {
          isChecked = value === selectedValue;
        }
        return (
          <Container
            key={value}
            style={[styles.container, {borderBottomColor: border}]}>
            <TouchableOpacity style={styles.button} onPress={_onPress(item)}>
              <Container style={styles.checkBoxContainer}>
                <View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={isChecked}
                    size={25}
                    fillColor={primary}
                    unfillColor={card}
                    iconStyle={{
                      borderColor: primary,
                    }}
                    textStyle={{
                      color: text,
                    }}
                    onPress={_handleOnCheckboxPress}
                  />
                </View>
                <View>
                  <Text>{label}</Text>
                </View>
              </Container>
              {rightElement && (
                <Container style={styles.rightElementContainer}>
                  {rightElement}
                </Container>
              )}
            </TouchableOpacity>
          </Container>
        );
      })}
    </>
  );
};

export default RadioButton;
