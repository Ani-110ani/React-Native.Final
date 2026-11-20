import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="product"
            options={{
              headerShown: true,
              title: "Product details",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen name="camera" options={{ presentation: "modal" }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
