import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  AlertIOS,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import MessageList from "../components/MessageList";
import { sendMessage, fetchMessages } from "../api/chatApi";
import COLORS from "../constants/colors";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchMessages();
      setMessages(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await fetchMessages();
      setMessages(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSend = async () => {
    const trimmedUsername = username.trim();
    const trimmedMessage = messageText.trim();

    if (!trimmedUsername || !trimmedMessage) {
      if (Platform.OS === "ios") {
        AlertIOS.alert(
          "Missing info",
          "Please enter your username and message",
        );
      } else {
        Alert.alert("Missing info", "Please enter your username and message");
      }
      return;
    }

    try {
      setIsSending(true);
      const response = await sendMessage(trimmedUsername, trimmedMessage);
      setMessageText("");
      setMessages([response.data, ...messages]);
    } catch (err) {
      if (Platform.OS === "ios") {
        AlertIOS.alert("Error", err.message);
      } else {
        Alert.alert("Error", err.message);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Group Chat</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.messagesContainer}>
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.usernameInput}
          placeholder="Your name"
          placeholderTextColor={COLORS.textSecondary}
          value={username}
          onChangeText={setUsername}
          editable={!isSending}
          accessibilityLabel="Username input"
        />

        <View style={styles.messageRow}>
          <TextInput
            style={styles.messageInput}
            multiline
            maxLength={500}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textSecondary}
            value={messageText}
            onChangeText={setMessageText}
            editable={!isSending}
            accessibilityLabel="Message input"
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: isSending
                  ? COLORS.textSecondary
                  : COLORS.sendButton,
              },
            ]}
            onPress={handleSend}
            disabled={isSending}
            activeOpacity={0.8}
            accessibilityLabel="Send message button"
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.sendButtonText}>➤</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#FF6B6B",
    padding: 10,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 12,
  },
  usernameInput: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
    maxHeight: 80,
  },
  sendButton: {
    borderRadius: 50,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default ChatScreen;
