import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import url from "@/config";

const { height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;

export default function Login({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const handleSubmit = async () => {
    const formData = {
      username: username,
      password: password,
    };

    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem("token", data.access_token);

      onLoginSuccess();
      onClose();
    }
  };

  return (
    <View style={styles.ModalContainer}>
      <TabBarIcon
        name={"close"}
        style={{
          fontSize: 50,
          color: "black",
          zIndex: 1,
        }}
        onPress={onClose}
      />

      <View style={styles.container}>
        <View style={styles.flex}>
          <Image source={require("@/assets/images/favicon.png")} />
          <Text>E-bet</Text>
        </View>

        <Text style={styles.marginBottom}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.center}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spaceBetween}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.label}>Remember me</Text>
        </View>
        <Text>I forgot my password</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "#f5f6fa",
    height: height,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: windowWidth - 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: windowWidth - 25,
  },
  button: {
    width: windowWidth - 250,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  center: {
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 25,
    marginTop: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  marginBottom: {
    marginBottom: 25,
  },
});
