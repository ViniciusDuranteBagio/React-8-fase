import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Linking,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

const { width } = Dimensions.get("window");
const GITHUB_USERNAME = "Gabriel0Ramos0";
const perfil = `https://api.github.com/users/${GITHUB_USERNAME}`;

interface GitProfile {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    location: string;
    public_repos: number;
    followers: number;
    following: number;
}

export default function ProfileScreen() {
    const [profile, setProfile] = useState<GitProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const scrollY = new Animated.Value(0);

    useEffect(() => {
        fetch(perfil)
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch(() => {
                Alert.alert("Erro", "Não foi possível carregar dados do GitHub.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <ThemedView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#1976d2" />
            </ThemedView>
        );
    }

    if (!profile) {
        return (
            <ThemedView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ThemedText>Perfil não encontrado.</ThemedText>
            </ThemedView>
        );
    }

    const AVATAR_MAX = width * 0.30; // tamanho máximo do avatar
    const AVATAR_MIN = width * 0.1;  // tamanho mínimo ao scroll
    const avatarLeft = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [(width - AVATAR_MAX) / 2, (width - AVATAR_MIN) / 2],
        extrapolate: "clamp",
    });

    const avatarSize = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [AVATAR_MAX, AVATAR_MIN],
        extrapolate: "clamp",
    });

    return (
        <ThemedView style={styles.container}>
            {/* Avatar flutuante animado */}
            <Animated.Image
                source={{ uri: profile.avatar_url }}
                style={[
                    styles.avatar,
                    {
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: Animated.divide(avatarSize, 2),
                        position: "absolute",
                        top: 20,
                        left: avatarLeft, // centraliza
                    },
                ]}
            />

            <Animated.ScrollView
                contentContainerStyle={{
                    ...styles.scrollContent,
                    paddingTop: AVATAR_MAX + 50,
                    paddingBottom: 100,
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.name}>
                        {profile.name || profile.login}
                    </ThemedText>
                    {profile.bio && <ThemedText type="subtitle">{profile.bio}</ThemedText>}
                    {profile.location && <ThemedText>{profile.location}</ThemedText>}
                </View>

                <View style={styles.statsRow}>
                    <StatBox label="Repositórios" value={profile.public_repos.toString()} />
                    <StatBox label="Seguidores" value={profile.followers.toString()} />
                    <StatBox label="Seguindo" value={profile.following.toString()} />
                </View>

                <View style={styles.actions}>
                    <CustomButton onPress={() => Linking.openURL(`https://github.com/${GITHUB_USERNAME}`)}>
                        Ver no GitHub
                    </CustomButton>
                </View>
            </Animated.ScrollView>
        </ThemedView>
    );

}

function StatBox({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.statBox}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {value}
            </ThemedText>
            <ThemedText style={styles.statLabel}>{label}</ThemedText>
        </View>
    );
}

function CustomButton({ children, onPress, variant = "solid", style }: { children: React.ReactNode; onPress?: () => void; variant?: "solid" | "outline"; style?: any }) {
    const isSolid = variant === "solid";
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.btn, isSolid ? styles.btnSolid : styles.btnOutline, style]}>
            <ThemedText type="defaultSemiBold" style={[styles.btnText, isSolid ? styles.btnTextSolid : styles.btnTextOutline]}>
                {children}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingTop: 50 },
    header: { alignItems: "center", marginBottom: 30 },
    avatar: {
        borderWidth: 3,
        borderColor: "#1976d2",
        marginBottom: 16,
    },
    name: { marginTop: 4 },
    statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
    statBox: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginHorizontal: 4,
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    statValue: { fontSize: 18, color: "#1976d2" },
    statLabel: { fontSize: 14, color: "#666" },
    actions: { width: "100%" },
    btn: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, alignItems: "center", width: "100%", marginBottom: 12 },
    btnSolid: { backgroundColor: "#1976d2" },
    btnOutline: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: "#1976d2" },
    btnText: { fontSize: 16 },
    btnTextSolid: { color: "#fff" },
    btnTextOutline: { color: "#1976d2" },
});
