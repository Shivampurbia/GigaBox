import { useEffect, useRef, useState } from "react";
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
  onAdd?: () => void;
}

export function AddToCartButton({ quantity, onAdd }: Props) {
  const [isAdded, setIsAdded] = useState(false);
  const addedResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    return () => {
      if (addedResetTimer.current) {
        clearTimeout(addedResetTimer.current);
      }
    };
  }, []);

  const handlePress = () => {
    scale.set(
      withSequence(
        withTiming(0.94, { duration: 90 }),
        withSpring(1.06, { damping: 7, stiffness: 260 }),
        withSpring(1, { damping: 12, stiffness: 220 }),
      ),
    );
    setIsAdded(true);
    onAdd?.();

    if (addedResetTimer.current) {
      clearTimeout(addedResetTimer.current);
    }
    addedResetTimer.current = setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable onPress={handlePress}>
        <ThemedView type="backgroundSelected" style={styles.button}>
          <ThemedText type="smallBold">
            {isAdded ? "Added to cart" : `Add ${quantity} to cart`}
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
