import InfoCard from "@/components/info-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

interface ModalData {
  title: string;
  description: string;
  color: string;
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const fadeAnim = new Animated.Value(0);
  const router = useRouter();

  const openModal = (data: ModalData) => {
    setModalData(data);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <InfoCard
          title="Missões Ativas"
          value={5}
          icon="rocket-outline"
          color="#ff6f61"
          onPress={() =>
            openModal({
              title: "Missões Ativas",
              description: "Você possui 5 missões ativas! Complete-as para ganhar XP e recompensas.",
              color: "#ff6f61",
            })
          }
        />

        <InfoCard
          title="Recompensas"
          value="4.200 XP"
          icon="trophy-outline"
          color="#f1c40f"
          onPress={() =>
            openModal({
              title: "Recompensas",
              description: "Você acumulou 4.200 XP até agora. Continue evoluindo!",
              color: "#f1c40f",
            })
          }
        />

        <InfoCard
          title="Notificações"
          value="3 Novas"
          icon="notifications-outline"
          color="#3498db"
          onPress={() =>
            openModal({
              title: "Notificações",
              description: "Você possui 3 novas notificações importantes.",
              color: "#3498db",
            })
          }
        />

        <InfoCard
          title="Mensagens"
          value={12}
          icon="chatbubble-ellipses-outline"
          color="#2ecc71"
          onPress={() =>
            openModal({
              title: "Mensagens",
              description: "Você tem 12 mensagens não lidas. Leia para se manter atualizado.",
              color: "#2ecc71",
            })
          }
        />
        <InfoCard
          title="Sobre o App"
          value=""
          icon="information-circle-outline"
          color="#9b59b6"
          onPress={() => router.push("/about")}
        />
      </ScrollView>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="title" style={{ color: modalData?.color, marginBottom: 12 }}>
              {modalData?.title}
            </ThemedText>
            <ThemedText style={styles.modalText}>{modalData?.description}</ThemedText>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close-circle-outline" size={32} color="#ff0000ff" />
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 40 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#ddddddff",
    lineHeight: 22,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 20,
  },
});
