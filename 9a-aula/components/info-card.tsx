import React from "react";
import { StyleSheet, View, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";

interface InfoCardProps {
  title: string;
  value?: string | number;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function InfoCard({
  title,
  value,
  icon,
  color = "#1976d2",
  onPress,
  style,
}: InfoCardProps) {
  return (
    <ThemedView style={[styles.card, style]}>
      <TouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        style={styles.touchArea}
      >
        {icon && <Ionicons name={icon} size={32} color={color} style={styles.icon} />}
        <View style={styles.textContainer}>
          <ThemedText type="defaultSemiBold" style={[styles.title, { color }]}>
            {title}
          </ThemedText>
          {value !== undefined && (
            <ThemedText type="subtitle" style={styles.value}>
              {value}
            </ThemedText>
          )}
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  touchArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  value: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});
