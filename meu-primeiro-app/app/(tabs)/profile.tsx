import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F1F4FF', dark: '#1E2330' }}
      headerImage={
        <IconSymbol
          size={280}
          name="person.fill"
          color="#6C7AE0"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Perfil</ThemedText>
        <ThemedText>
          Usuário: Renato Bonetti Neto <br></br>
          Idade: 22 anos.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Dica</ThemedText>
        <ThemedText>
          Utilize componentes reutilizáveis para manter coesão visual e facilitar manutenções
          futuras.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    pointerEvents: 'none',
    alignSelf: 'center',
  },
  section: {
    gap: 8,
    marginBottom: 16,
  },
});
