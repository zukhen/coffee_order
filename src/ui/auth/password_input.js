import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export default PasswordInput = ({ value, onChangeText }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
  
    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
  
    return (
      <View style={styles.passwordInputContainer}>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Password"
          leftIcon={<Icon name="lock" type="font-awesome" color="green" />}
          secureTextEntry={secureTextEntry}
          inputContainerStyle={[styles.input, { flex: 1 }]}
          inputStyle={{ marginLeft: 10 }}
        />
        <Button
          onPress={toggleSecureEntry}
          title={secureTextEntry ? 'Show' : 'Hide'}
          buttonStyle={styles.eyeButton}
          titleStyle={styles.eyeButtonText}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      button: {
        backgroundColor: 'red',
        borderRadius: 10,
        height: 50,
      },
      signupContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      signupText: {
        fontSize: 15,
        marginRight: 5,
      },
      eyeButton: {
        height: '100%',
        backgroundColor: 'transparent',
        marginRight: 5,
      },
      eyeButtonText: {
        fontSize: 12,
        color: 'green',
      },
  })