import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme";
import { RegisterForm, registerSchema } from "../validation/schemas";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterForm) => {
    setServerError("");
    try {
      await register(data.name, data.email, data.password);
      Alert.alert("Success", "Account created. Please log in.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join us and start shopping</Text>

          <FormInput
            control={control}
            name="name"
            label="Full name"
            placeholder="John Doe"
          />
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="At least 6 characters"
            secureTextEntry
            autoCapitalize="none"
          />
          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Repeat your password"
            secureTextEntry
            autoCapitalize="none"
          />

          {serverError ? (
            <Text style={styles.serverError}>{serverError}</Text>
          ) : null}

          <Pressable
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" style={styles.link}>
              Login
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 28,
    marginTop: 4,
  },
  serverError: {
    color: colors.danger,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: colors.muted,
  },
  link: {
    color: colors.primary,
    fontWeight: "700",
  },
});
