import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
} from "react-native";
import { SearchBarElem } from "./searchBarElem";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={SearchBarElem}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bg}>
            <View style={styles.flex}>
              <Image source={item.image} style={styles.img} />
              <Text>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  img: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  bg: {
    borderWidth: 1,
    borderColor: "#9AC8CD",
    borderRadius: 5,
    // backgroundColor: "#9AC8CD",
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  flatListContent: {
    alignItems: "center",
  },
});
