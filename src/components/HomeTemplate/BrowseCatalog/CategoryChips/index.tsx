// src/components/HomeTemplate/BrowseCatalog/CategoryChips/index.ts
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

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
      <Pressable
        style={[styles.chip, active === null && styles.chipActive]}
        onPress={() => onSelect(null)}
      >
        <Text style={active === null ? styles.textActive : styles.text}>
          All
        </Text>
      </Pressable>
      {categories.map((cat) => (
        <Pressable
          key={cat}
          style={[styles.chip, active === cat && styles.chipActive]}
          onPress={() => onSelect(cat)}
        >
          <Text style={active === cat ? styles.textActive : styles.text}>
            {cat}
          </Text>
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
  chip: {
    height: 32,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  chipActive: { backgroundColor: "#111" },
  text: { color: "#333", fontSize: 13 },
  textActive: { color: "#fff", fontSize: 13 },
});
