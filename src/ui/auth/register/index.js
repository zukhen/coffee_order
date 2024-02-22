import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  SafeAreaViewBase,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Icon, Input } from "react-native-elements";
import { BASE_URL } from "../../../constant/strings";
import { text1, text2, text3, text4 } from "../../../constant/dimens";
import {
  colorDark,
  colorGray,
  colorOrange,
  colorWhite,
} from "../../../constant/colors";
import { Assets } from "../../../constant/assets";
import { emailRegex } from "../../../utils/regex_utils";
import { SharePrefs } from "../../../data/share_prefs";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [secureEntryPassword, setSecureEntryPassword] = useState(true);
  const [secureEntryRePassword, setSecureEntryRePassword] = useState(true);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePass, setErrorRePass] = useState("");
  const onValidateText = (text) => {
    setEmail(text);
    if (emailRegex.test(text)) {
      setErrorEmail("");
    } else {
      setErrorEmail("Invalid Email");
    }
  };
  const onPressLearnMore = () => {
    if (username.length == 0) {
      setErrorName("a");
    } else {
      if (password.length == 0) {
        setErrorPassword("Password is empty!");
      } else {
        if (rePassword !== password) {
          setErrorRePass("Re-entered password is incorrect");
        } else {
          setErrorRePass("");
          SharePrefs.SET_USER_DATA({
            name: username,
            email,
            password,
          }).then((e)=>navigation.pop())
        }
      }
    }

    //   nav.navigate("Manager");
  };
  const onToggleVisible = () => {
    setSecureEntryPassword(!secureEntryPassword);
  };
  const onToggleRepassVisible = () => {
    setSecureEntryRePassword(!secureEntryRePassword);
  };
  const onValidateUsername = (text) => {
    setUsername(text);
    if (text.length != 0) {
      setErrorName("");
    }
  };
  const onValidatePassword = (text) => {
    setPassword(text);
    if (password.length != 0) {
      setErrorPassword("");
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorDark }}>
      <View style={[styles.logoContainer, { paddingTop: insets.top }]}>
        <Image style={{ width: 142 }} source={Assets.iconApp} />

        <Text style={styles.logoText}>Welcome to Lungo !!</Text>
        <Text
          style={{
            fontSize: text3,
            color: "#828282",
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          Register to Continue
        </Text>
      </View>
      {/* {error && (
        <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          {error}
        </Text>
      )} */}
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20 }}>
          <Input
            value={username}
            onChangeText={(text) => onValidateUsername(text)}
            placeholder="Name"
            inputContainerStyle={[
              styles.input,
              { borderColor: errorName ? "#FB7181" : colorGray },
            ]}
            inputStyle={styles.inputText}
          />
          <Input
            keyboardType="email-address"
            errorMessage={errorEmail}
            errorStyle={{
              color: "#FB7181",
              fontSize: text4,
              fontWeight: "700",
              marginBottom: 10,
            }}
            value={email}
            onChangeText={(text) => onValidateText(text)}
            placeholder="Email"
            inputContainerStyle={[
              styles.input,
              { borderColor: errorEmail ? "#FB7181" : colorGray },
            ]}
            inputStyle={styles.inputText}
          />
          <Input
            value={password}
            onChangeText={(text) => onValidatePassword(text)}
            placeholder="Password"
            secureTextEntry={secureEntryPassword}
            inputContainerStyle={[
              styles.input,
              { borderColor: errorPassword ? "#FB7181" : colorGray },
            ]}
            inputStyle={styles.inputText}
            rightIcon={
              <Icon
                onPress={onToggleVisible}
                name={secureEntryPassword ? "eye" : "eye-slash"}
                type="font-awesome-5"
                size={18}
                color="grey"
              />
            }
          />
          <Input
            errorMessage={errorRePass}
            errorStyle={{
              color: "#FB7181",
              fontSize: text4,
              fontWeight: "700",
            }}
            value={rePassword}
            onChangeText={(text) => setRePassword(text)}
            placeholder="Re-type password"
            secureTextEntry={secureEntryRePassword}
            inputContainerStyle={[
              styles.input,
              { borderColor: errorRePass ? "#FB7181" : colorGray },
            ]}
            inputStyle={styles.inputText}
            rightIcon={
              <Icon
                onPress={onToggleRepassVisible}
                name={secureEntryRePassword ? "eye" : "eye-slash"}
                type="font-awesome-5"
                size={18}
                color="grey"
              />
            }
          />
        </View>
        <TouchableOpacity
          onPress={onPressLearnMore}
          style={[styles.button, { backgroundColor: colorOrange }]}
        >
          <Text style={{ fontWeight: "bold", color: colorWhite, fontSize: 18 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.signupContainer, { paddingBottom: insets.bottom }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.signupText}>You hae an account?</Text>
          <Text
            style={[styles.signupText, { color: colorOrange }]}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Sign in
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: text1,
    fontWeight: "700",
    color: "white",
  },
  formContainer: {
    paddingHorizontal: 10,
    flex: 1,
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 8,
    borderColor: colorGray,
    paddingStart: 10,
  },
  inputText: {
    color: "#828282",
    fontWeight: "700",
  },
  signupContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 15,
    color: "#828282",
    marginRight: 5,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: "#15c8d0",
    borderRadius: 20,
    height: 57,
    marginBottom: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RegisterScreen;
