import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function StyleTest() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TailwindCSS / Styling Test</Text>

      <Text style={styles.heading}>Color Tests:</Text>
      <View style={styles.row}>
        <View style={[styles.box, styles.red]} />
        <View style={[styles.box, styles.green]} />
        <View style={[styles.box, styles.blue]} />
        <View style={[styles.box, styles.yellow]} />
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Layout & Spacing:</Text>
        <View style={styles.spaceBetween}>
          <View style={[styles.largeBox, styles.purple]} />
          <View style={[styles.largeBox, styles.pink]} />
          <View style={[styles.largeBox, styles.indigo]} />
        </View>
      </View>

      <View style={styles.successBox}>
        <Text style={styles.successText}>
          Styling test is rendering correctly across web and mobile.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#2563eb",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  red: {
    backgroundColor: "#ef4444",
  },
  green: {
    backgroundColor: "#22c55e",
  },
  blue: {
    backgroundColor: "#3b82f6",
  },
  yellow: {
    backgroundColor: "#eab308",
  },
  card: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#93c5fd",
    marginBottom: 16,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  largeBox: {
    width: 64,
    height: 64,
  },
  purple: {
    backgroundColor: "#d8b4fe",
    borderRadius: 999,
  },
  pink: {
    backgroundColor: "#f9a8d4",
    borderRadius: 12,
  },
  indigo: {
    backgroundColor: "#a5b4fc",
  },
  successBox: {
    padding: 16,
    backgroundColor: "#dcfce7",
    borderRadius: 12,
  },
  successText: {
    textAlign: "center",
    color: "#166534",
    fontWeight: "500",
  },
});
