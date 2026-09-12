// src/components/HomeTemplate/BrowseCatalog/CategoryChips/index.ts
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable, ScrollView, StyleSheet } from "react-native";

interface Props {
  categories: string[];
  active: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryChips({ categories, active, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.row}
    >
      <Pressable style={styles.chipPressable} onPress={() => onSelect(null)}>
        <ThemedView
          type={active === null ? "backgroundSelected" : "backgroundElement"}
          style={styles.chip}
        >
          <ThemedText type="smallBold">All</ThemedText>
        </ThemedView>
      </Pressable>
      {categories.map((cat) => (
        <Pressable
          key={cat}
          style={styles.chipPressable}
          onPress={() => onSelect(cat)}
        >
          <ThemedView
            type={active === cat ? "backgroundSelected" : "backgroundElement"}
            style={styles.chip}
          >
            <ThemedText type="small">{cat}</ThemedText>
          </ThemedView>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    height: 48,
  },
  row: {
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  chipPressable: {},
  chip: {
    height: 38,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
