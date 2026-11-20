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
          <Stack.Screen
            name="product/[id]"
            options={{ headerShown: true, title: "Product details" }}
          />
          <Stack.Screen name="camera" options={{ presentation: "modal" }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
