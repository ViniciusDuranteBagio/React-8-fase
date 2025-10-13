import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedView style={styles.section} lightColor="#F3F6FF" darkColor="#232630">
          <ThemedText type="title">Sobre o aplicativo</ThemedText>
          <ThemedText>
            Este projeto demonstra a estrutura de navegação com abas e telas adicionais utilizando o
            Expo Router. Personalize este espaço com informações relevantes sobre o seu produto ou
            equipe.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.section} lightColor="#F8F5FF" darkColor="#1D2332">
          <ThemedText type="subtitle">Funcionalidades</ThemedText>
          <ThemedText>
            Executar com "npm start"
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.section} lightColor="#F1FBFF" darkColor="#18232E">
          <ThemedText type="subtitle">Próximos passos</ThemedText>
          <ThemedText>
            Enriquecer a página.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 24,
  },
  section: {
    gap: 8,
    borderRadius: 16,
    padding: 16,
  },
});
