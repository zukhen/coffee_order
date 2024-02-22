import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Icon, Input } from "react-native-elements";
import {
  colorDark,
  colorDarkGray,
  colorGray,
  colorOrange,
  colorWhite,
} from "../../../constant/colors";
import { Assets } from "../../../constant/assets";
import { text1, text2, text3, text4 } from "../../../constant/dimens";
import darkColors from "react-native-elements/dist/config/colorsDark";
import { SharePrefs } from "../../../data/share_prefs";
import { StackActions } from "@react-navigation/native";
import { emailRegex } from "../../../utils/regex_utils";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const onvalidateEmail = (text) => {
    setUsername(text);
    if (emailRegex.test(text)) {
      setError("");
    } else {
      setError("Invalid Email");
    }
  };
  const onPressLearnMore = () => {
    if (username.length == 0 && password.length == 0) {
      setError("");
    } else {
      SharePrefs.GET_USER_DATA().then((e) => {
        if (e) {
          const parsedData = JSON.parse(e);
          if (parsedData.email == username && parsedData.password == password) {
            navigation.dispatch(StackActions.replace("Home"));
            SharePrefs.SET_LOGIN_STATE("true");
          } else {
            setErrorPassword("Password is not true. Try Again!");
          }
        }
      });
    }
  };
  const onToggleVisible = () => {
    setSecureEntry(!secureEntry);
  };
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorDark }}>
      <View style={[styles.logoContainer, { paddingTop: insets.top }]}>
        <Image style={{ width: 142 }} source={Assets.iconApp} />

        <Text style={styles.logoText}>Welcome to Lungo !!</Text>
        <Text style={{ fontSize: text3, color: colorGray, letterSpacing: 0.5 }}>
          Login to Continue
        </Text>
      </View>
      {/* {error && (
        <Text style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          {error}
        </Text>
      )} */}
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20, gap: 10 }}>
          <Input
            errorMessage={error}
            keyboardType="email-address"
            value={username}
            onChangeText={(text) => onvalidateEmail(text)}
            placeholder="Username"
            inputContainerStyle={[
              styles.input,
              { borderColor: error ? "#FB7181" : colorGray },
            ]}
            inputStyle={styles.inputText}
          />
          <Input
            errorMessage={errorPassword}
            errorStyle={{
              color: "#FB7181",
              fontSize: text4,
              fontWeight: "700",
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={secureEntry}
            inputContainerStyle={[
              styles.input,
              { borderColor: errorPassword ? "#FB7181" : colorGray },
            ]}
            inputStyle={styles.inputText}
            rightIcon={
              <Icon
                onPress={onToggleVisible}
                name={secureEntry ? "eye" : "eye-slash"}
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
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressLearnMore}
          style={[styles.button, { backgroundColor: colorWhite }]}
        >
          <Image
            style={{ position: "absolute", left: 20 }}
            source={Assets.iconG}
          />
          <Text style={{ fontWeight: "bold", color: colorDark, fontSize: 18 }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.signupContainer, { paddingBottom: insets.bottom }]}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <Text style={styles.signupText}>Don't have account?</Text>
          <Text
            style={[styles.signupText, { color: colorOrange }]}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Register
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.signupText}>Foget Password?</Text>
          <Text
            style={[styles.signupText, { color: colorOrange }]}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Reset
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
    marginBottom: 40,
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

export default LoginScreen;
