import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { colors } from "../../theme";

export default function CartScreen() {
  const { items, total, increase, decrease, remove, clear } = useCart();

  const handleCheckout = () => {
    Alert.alert("Order placed", `Total: $${total.toFixed(2)}`, [
      { text: "OK", onPress: clear },
    ]);
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={64} color={colors.muted} />
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
              <View style={styles.qtyRow}>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() => decrease(item.id)}
                >
                  <Text style={styles.qtyButtonText}>−</Text>
                </Pressable>
                <Text style={styles.qty}>{item.quantity}</Text>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() => increase(item.id)}
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
            <Pressable onPress={() => remove(item.id)} hitSlop={10}>
              <Ionicons name="trash-outline" size={22} color={colors.danger} />
            </Pressable>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.checkout} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
        <Pressable style={styles.clear} onPress={clear}>
          <Text style={styles.clearText}>Clear cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  emptyText: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
    marginVertical: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyButtonText: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 20,
  },
  qty: {
    marginHorizontal: 14,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  footer: {
    backgroundColor: colors.card,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.muted,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  checkout: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  checkoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  clear: {
    alignItems: "center",
    paddingTop: 12,
  },
  clearText: {
    color: colors.danger,
    fontWeight: "600",
  },
});
