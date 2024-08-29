import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { ThemedView } from "@/components/ThemedView";

export default function Profil() {
  return (
    <ThemedView style={styles.header}>
      <View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/avatar/avatar-1.png")}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text>Pseudo</Text>
        <Text>Password</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
    // borderRadius: ,
  },
});
