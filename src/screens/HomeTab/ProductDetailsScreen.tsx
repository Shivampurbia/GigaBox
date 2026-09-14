import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ScreenState } from "@/components/ScreenState";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useConnectivity } from "@/connectivity/ConnectivityProvider";
import type { HomeStackParamList } from "@/navigation/types";
import { useProductQuery } from "@/queries/catalog/useProductQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItemById } from "@/store/selectors";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/store/slices/cartSlice";
import {
  SchedulableTriggerInputTypes,
  scheduleNotificationAsync,
} from "expo-notifications";
import BellNotificationIcon from "../../assets/svg/Bell";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const { isOnline } = useConnectivity();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemById(productId));
  const productQuery = useProductQuery(productId);

  if (productQuery.isPending) {
    return <ScreenState title="Loading product" loading />;
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <ScreenState
        title={isOnline ? "Product unavailable" : "Product unavailable offline"}
        message={
          isOnline
            ? "We could not load this product."
            : "Reconnect to view this product."
        }
        actionLabel={isOnline ? "Try again" : "Go back"}
        onAction={
          isOnline
            ? () => void productQuery.refetch()
            : () => navigation.goBack()
        }
      />
    );
  }

  const product = productQuery.data;
  const maxQuantity = Math.max(product.stock, 1);
  const isOutOfStock = product.stock === 0;
  const displayedQuantity = cartItem?.quantity ?? quantity;
  const decreaseQuantity = () => {
    if (cartItem) {
      dispatch(decrementQuantity(product.id));
      return;
    }
    setQuantity((current) => Math.max(1, current - 1));
  };
  const increaseQuantity = () => {
    if (cartItem) {
      dispatch(incrementQuantity(product.id));
      return;
    }
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  };

  const handleBellPress = async () => {
    //schedule for after 5 seconds with product it
    await scheduleNotificationAsync({
      content: {
        title: "Product Alert",
        body: `Check out the product: ${product.title}`,
        priority: "high",
        data: { productId: product.id },
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: new Date(Date.now() + 5000),
        channelId: "default",
      },
    });

    // Handle bell icon press action here
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
        >
          {product.images.map((image) => (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.image}
              contentFit="cover"
            />
          ))}
        </ScrollView>

        <ThemedText themeColor="textSecondary" style={styles.category}>
          {product.category}
        </ThemedText>
        <View style={styles.statusRow}>
          <ThemedView
            type={isOutOfStock ? "backgroundElement" : "backgroundSelected"}
            style={styles.statusBadge}
          >
            <ThemedText type="smallBold">
              {product.availabilityStatus ??
                (isOutOfStock ? "Out of Stock" : "In Stock")}
            </ThemedText>
            {/* bell icon */}
          </ThemedView>
          <TouchableOpacity onPress={handleBellPress}>
            <BellNotificationIcon size={34} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>
        <ThemedText type="subtitle" style={styles.title}>
          {product.title}
        </ThemedText>
        <ThemedText type="smallBold" style={styles.price}>
          ${product.price.toFixed(2)}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          {product.description}
        </ThemedText>

        {!!product.tags?.length && (
          <ThemedView style={styles.tagsRow}>
            {product.tags.map((tag) => (
              <ThemedView key={tag} type="backgroundElement" style={styles.tag}>
                <ThemedText type="small">#{tag}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}

        <ThemedView style={styles.quantityRow}>
          <ThemedText type="smallBold">Quantity</ThemedText>
          <ThemedView type="backgroundElement" style={styles.stepper}>
            <Pressable
              accessibilityLabel="Decrease quantity"
              onPress={decreaseQuantity}
              disabled={isOutOfStock}
              style={styles.stepperButton}
            >
              <ThemedText type="smallBold">-</ThemedText>
            </Pressable>
            <ThemedText type="smallBold" style={styles.quantity}>
              {displayedQuantity}
            </ThemedText>
            <Pressable
              accessibilityLabel="Increase quantity"
              onPress={increaseQuantity}
              disabled={isOutOfStock}
              style={styles.stepperButton}
            >
              <ThemedText type="smallBold">+</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        <AddToCartButton
          quantity={displayedQuantity}
          isAdded={Boolean(cartItem)}
          disabled={isOutOfStock}
          onAdd={() =>
            dispatch(addToCart({ product, quantity: displayedQuantity }))
          }
        />

        {!!product.reviews?.length && (
          <ThemedView style={styles.reviewsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Reviews
            </ThemedText>
            {product.reviews.map((review) => (
              <ThemedView
                key={`${review.reviewerEmail}-${review.date}`}
                type="backgroundElement"
                style={styles.review}
              >
                <ThemedView style={styles.reviewHeader}>
                  <ThemedText type="smallBold">
                    {review.reviewerName}
                  </ThemedText>
                  <ThemedText type="smallBold">{review.rating}/5</ThemedText>
                </ThemedView>
                <ThemedText themeColor="textSecondary">
                  {review.comment}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingBottom: 120 },
  gallery: { width: "100%", height: 320 },
  image: {
    width: Dimensions.get("window").width,
    height: 320,
  },
  category: {
    marginTop: 20,
    marginHorizontal: 20,
    textTransform: "uppercase",
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 12,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  title: {
    marginTop: 8,
    marginHorizontal: 20,
  },
  price: {
    marginTop: 12,
    marginHorizontal: 20,
  },
  description: {
    marginTop: 16,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
    marginHorizontal: 20,
  },
  tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  quantityRow: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  stepperButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewsSection: { marginTop: 28, marginHorizontal: 20, gap: 10 },
  sectionTitle: { fontSize: 22 },
  review: { padding: 12, borderRadius: 8, gap: 6 },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    backgroundColor: "transparent",
  },
  quantity: {
    minWidth: 32,
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bellIcon: {
    margin: 12,
    alignSelf: "center",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
});
