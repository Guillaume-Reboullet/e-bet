import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

import SearchBar from "@/components/reusable/searchBar";
import Header from "@/components/reusable/header";

export default function HomeScreen() {
  // const [data, setData] = useState();

  // const getMovies = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/");
  //     const json = await response.json();
  //     setData(json.movies);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // getMovies();
  // console.log(data);
  return (
    <ThemedView style={styles.header}>
      <ThemedView>
        <Header />
      </ThemedView>
      <ThemedView>
        {/* <Header /> */}
        <SearchBar />
        <ThemedText>COMBO</ThemedText>
        <ThemedText>LIVE</ThemedText>
        <ThemedText>
          MATCHES (today, tomorrow, etc [1 day = 1 load expect if today])
        </ThemedText>
      </ThemedView>
      <ThemedText>FOOTER</ThemedText>
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
});
