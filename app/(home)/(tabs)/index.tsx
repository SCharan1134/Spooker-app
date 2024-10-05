import { ChannelList } from "stream-chat-expo";
import { Link, router, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
export default function MainTabScreen() {
  const { user } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} asChild>
              <FontAwesome5
                name="users"
                size={22}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user?.id as string] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}` as any)}
      />
    </>
  );
}
