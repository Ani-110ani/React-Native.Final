import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../theme";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]}>
          <Text style={styles.initial}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <Pressable style={styles.button} onPress={() => router.push("/camera")}>
        <Text style={styles.buttonText}>Take profile photo</Text>
      </Pressable>
      <Pressable style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    color: colors.white,
    fontSize: 48,
    fontWeight: "800",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  email: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 32,
    marginTop: 4,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  logout: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: "700",
  },
});
