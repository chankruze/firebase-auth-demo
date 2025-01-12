// app/(auth)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
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
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerShadowVisible: false,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
}
