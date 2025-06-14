import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Design sobre sans jaune, cohérent avec index
const MenuItem = ({
  icon,
  title,
  subtitle,
  isLast = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  isLast?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      isLast && styles.lastMenuItem,
      onPress && styles.menuItemTouchable,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
    accessibilityRole="button"
    accessibilityLabel={title}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={24} color="#222" />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
      {!!subtitle && (
        <Text style={styles.menuSubtitle} numberOfLines={1} adjustsFontSizeToFit>
          {subtitle}
        </Text>
      )}
    </View>
    <Ionicons name="chevron-forward" size={20} color="#888" style={styles.chevron} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#FFF",
  },
  menuItemTouchable: {
    // Effet visuel au toucher (léger)
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    letterSpacing: 0.5,
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    letterSpacing: 0.2,
  },
  chevron: {
    marginLeft: 8,
    alignSelf: "center",
  },
});

export default MenuItem;