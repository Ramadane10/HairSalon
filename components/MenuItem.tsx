
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

// Composant d'élément de menu
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
    style={[styles.menuItem, isLast ? styles.lastMenuItem : {}]}
    onPress={onPress}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={22} color="#000000" />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    {/* <Ionicons name="chevron-forward" size={20} color="#888888" /> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 2,
  },
})

export default MenuItem;