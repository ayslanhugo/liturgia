import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#212160" },
        tabBarStyle: { backgroundColor: "#212160" },
        headerTitleAlign: "center",
        headerTintColor: "#FFF",
        tabBarActiveTintColor: "#F60",
        tabBarInactiveTintColor: "#6c757d",
      }}
    >
      {/* Aba Liturgia */}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Liturgia do Dia",
          tabBarLabel: "Liturgia",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={32} />
          ),
        }}
      />

      {/* Aba Usuário */}
      <Tabs.Screen
        name="user"
        options={{
          headerTitle: "Dados do Usuário",
          tabBarLabel: "Usuário",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          ),
        }}
      />

      {/* Aba Sobre */}
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "Sobre o Aplicativo",
          tabBarLabel: "Sobre",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="information-outline" color={color} size={32} />
          ),
        }}
      />
    </Tabs>
  );
}