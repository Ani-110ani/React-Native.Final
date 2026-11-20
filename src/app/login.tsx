import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme";
import { LoginForm, loginSchema } from "../validation/schemas";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError("");
    try {
      await login(data.email, data.password, data.remember);
      router.replace("/products");
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
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue shopping</Text>

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
            placeholder="Your password"
            secureTextEntry
            autoCapitalize="none"
          />

          <Controller
            control={control}
            name="remember"
            render={({ field: { value, onChange } }) => (
              <View style={styles.rememberRow}>
                <Switch value={value} onValueChange={onChange} />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
            )}
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
              <Text style={styles.buttonText}>Login</Text>
            )}
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/register" style={styles.link}>
              Register
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
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.text,
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
