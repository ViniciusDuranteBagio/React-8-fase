import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="title" style={styles.title}>
                    Sobre o App
                </ThemedText>
                <ThemedText style={styles.text}>
                    Este aplicativo é uma experiência interativa, criada para explorar informações de usuário,
                    mostrar estatísticas, missões e recompensas. Ele utiliza React Native, Expo, e componentes
                    temáticos para manter a consistência visual.
                </ThemedText>

                <ThemedText style={styles.text}>
                    Desenvolvedor: Gabriel Ramos
                </ThemedText>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
                        <ThemedText style={styles.btnText}>Voltar</ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20 },
    title: { fontSize: 24, marginBottom: 16 },
    text: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
    actions: { marginTop: 20, alignItems: "center" },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#1976d2",
        borderRadius: 12,
    },
    btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
