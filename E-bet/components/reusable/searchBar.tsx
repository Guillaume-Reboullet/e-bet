import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useState } from "react";

export default function SearchBar() {
  return (
    <ThemedView>
      <ThemedText>SEARCH BAR</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderRadius: 15,
  },
});
