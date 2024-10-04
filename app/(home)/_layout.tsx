import { useAuth } from "@/providers/AuthProvider";
import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)login"} />;
  }
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
