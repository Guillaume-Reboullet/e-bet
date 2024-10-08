import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { validate, res } from "email-validator";

import { useState } from "react";
import url from "@/config";

const { height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;

export default function SignUp({ onClose, openLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);

  const checkEmail = (email) => {
    setEmail(email);
    if (validate(email)) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      username: username,
      email: email,
      password: password,
      role: "user",
    };

    const response = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      openLogin();
    }
  };

  return (
    <ThemedView style={styles.ModalContainer}>
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

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={verify ? styles.inputVerify : styles.inputNotVerify}
          placeholder="Email"
          value={email}
          onChangeText={(text) => checkEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.center}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
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
  inputVerify: {
    width: windowWidth - 50,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  inputNotVerify: {
    width: windowWidth - 50,
    borderWidth: 1,
    borderColor: "red",
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
});
