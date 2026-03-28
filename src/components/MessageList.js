import React from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  RefreshControl,
} from "react-native";
import MessageItem from "./MessageItem";
import COLORS from "../constants/colors";

const MessageList = ({ messages, isLoading, onRefresh, refreshing }) => {
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.accent} />
      ) : (
        <Text style={styles.emptyText}>
          No messages yet. Be the first to say hello!
        </Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <MessageItem item={item} />}
      inverted={false}
      ListEmptyComponent={renderEmptyComponent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.accent]}
        />
      }
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default MessageList;
