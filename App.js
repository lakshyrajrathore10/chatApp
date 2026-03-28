import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ChatScreen from "./src/screens/ChatScreen";
import SplashScreen from "./src/screens/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />
      {showSplash ? <SplashScreen /> : <ChatScreen />}
    </SafeAreaView>
  );
}
