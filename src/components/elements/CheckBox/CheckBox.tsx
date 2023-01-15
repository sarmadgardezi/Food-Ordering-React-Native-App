import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import Container from '../Container';
import Text from '../Text';

type CheckBoxProps = {
  label: string;
  onPress: (checked: boolean) => void;
  rightElement?: React.ReactElement;
};

const CheckBox: React.FC<CheckBoxProps> = ({label, onPress, rightElement}) => {
  const {
    colors: {primary, text, card},
  } = useTheme();
  const [checked, setChecked] = React.useState<boolean>(false);
  const _onPress = () => {
    setChecked(!checked);
    onPress(!checked);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={_onPress}>
      <Container style={styles.checkBoxContainer}>
        <View>
          <BouncyCheckbox
            disableBuiltInState
            isChecked={checked}
            size={25}
            fillColor={primary}
            unfillColor={card}
            iconStyle={{
              borderColor: primary,
            }}
            textStyle={{
              color: text,
            }}
            onPress={_onPress}
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
  );
};

export default CheckBox;
