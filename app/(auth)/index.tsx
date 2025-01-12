import {
  GoogleSignin,
  User,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

GoogleSignin.configure({
  webClientId:
    "246285391106-u7852gksg3t0sp3fmj6nm55fhkjqc6cq.apps.googleusercontent.com",
});

export default function LoginScreen() {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUserData(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        setError(error);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const logout = async () => {
    await GoogleSignin.signOut();
    setUserData(null);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            userData
              ? { uri: userData.user.photo }
              : require("@/assets/images/react-logo.png")
          }
          style={styles.logo}
        />
        {userData ? (
          <>
            <Text style={styles.title}>{userData.user.name}</Text>
            <Text style={styles.subtitle}>{userData.user.email}</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Sign in to access your account</Text>
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {!userData ? (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={signIn}
            // disabled={statusCodes.IN_PROGRESS}
          >
            {/* {statusCodes.IN_PROGRESS ? (
            <ActivityIndicator color="#fff" />
          ) : ( */}
            <>
              <Image
                source={require("@/assets/images/google.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.buttonText}>Sign in with Google</Text>
            </>
            {/* )} */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.googleButton} onPress={logout}>
            <>
              <Image
                source={require("@/assets/images/google.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.buttonText}>Logout</Text>
            </>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing in, you agree to our{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#4285F4",
    textDecorationLine: "underline",
  },
});
