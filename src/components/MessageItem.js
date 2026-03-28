import React from "react";
import { StyleSheet, Text, View } from "react-native";
import formatTime from "../utils/formatTime";
import COLORS from "../constants/colors";

const MessageItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <View style={styles.timestampRow}>
        <Text style={styles.timestampText}>{formatTime(item.timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.messageBubble,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  username: {
    fontWeight: "bold",
    fontSize: 13,
    color: COLORS.secondary,
  },
  message: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  timestampRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 6,
  },
  timestampText: {
    fontSize: 11,
    color: COLORS.timestampText,
  },
});

export default MessageItem;
