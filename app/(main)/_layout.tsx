import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function MainLayout() {
  // TODO: Retrive data from storage

  // TODO: Redirect unauthenticated users to sign in

  // TODO: Show loading screen while checking auth state
  //   if (isLoading) {
  //     return (
  //       <ThemedView
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <ThemedText>Loading...</ThemedText>
  //       </ThemedView>
  //     );
  //   }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
