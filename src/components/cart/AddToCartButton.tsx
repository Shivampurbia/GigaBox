import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

interface Props {
  quantity: number;
  isAdded: boolean;
  disabled?: boolean;
  onAdd: () => void;
}

export function AddToCartButton({
  quantity,
  isAdded,
  disabled = false,
  onAdd,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (isAdded || disabled) return;

    scale.set(
      withSequence(
        withTiming(0.99, { duration: 90 }),
        withSpring(1.02, { damping: 7, stiffness: 260 }),
        withSpring(1, { damping: 12, stiffness: 220 }),
      ),
    );
    onAdd();
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable onPress={handlePress} disabled={disabled}>
        <ThemedView type="backgroundSelected" style={styles.button}>
          <ThemedText type="smallBold">
            {isAdded
              ? "Added to cart"
              : disabled
                ? "Out of stock"
                : `Add ${quantity} to cart`}
          </ThemedText>
        </ThemedView>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
    marginHorizontal: 20,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
});
