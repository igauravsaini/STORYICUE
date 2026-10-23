import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from './theme';

export interface FocusableCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hasTVPreferredFocus?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

export const FocusableCard: React.FC<FocusableCardProps> = ({
  children,
  onPress,
  style,
  hasTVPreferredFocus,
  testID,
  accessibilityLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={onPress}
      hasTVPreferredFocus={hasTVPreferredFocus}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.card,
        isFocused ? styles.cardFocused : styles.cardDefault,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cardDefault: {
    borderColor: 'transparent',
    transform: [{ scale: 1 }],
  },
  cardFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.cardHover,
    transform: [{ scale: 1.08 }],
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
});
