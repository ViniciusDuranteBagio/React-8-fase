import { useRouter } from 'expo-router';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type AboutButtonProps = {
  title?: string;
  style?: StyleProp<ViewStyle>;
};

export function AboutButton({ title = 'Sobre', style }: AboutButtonProps) {
  const router = useRouter();
  const buttonColor = useThemeColor({}, 'tint');
  const labelColor = useThemeColor({ light: '#fff', dark: '#151718' }, 'text');

  return (
    <Pressable
      accessibilityHint="Abre a página Sobre"
      accessibilityRole="button"
      onPress={() => router.push('/about')}
      style={({ pressed }) => [styles.button, { backgroundColor: buttonColor }, style, pressed && styles.pressed]}
    >
      <ThemedText type="defaultSemiBold" style={[styles.label, { color: labelColor }]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    letterSpacing: 0.5,
  },
});
