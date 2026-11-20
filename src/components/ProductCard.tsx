import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { useCart } from "../context/CartContext";
import { colors } from "../theme";
import { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Pressable style={styles.button} onPress={() => addToCart(product)}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: "100%",
    height: 130,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    minHeight: 34,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginVertical: 6,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
});
