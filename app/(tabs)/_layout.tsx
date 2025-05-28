import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import HeaderBar from "../../components/HeaderBar";

// Layout de la navigation par onglets
const TabsLayout = () => {
  return (
    <>
      <HeaderBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFB800",
          tabBarInactiveTintColor: "#888888",
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        
       
        <Tabs.Screen
          name="favoris"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={24} color={color} />
            ),
          }}
        />
        
        
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
