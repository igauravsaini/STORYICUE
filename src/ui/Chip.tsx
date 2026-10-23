import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing, typography } from './theme';

export interface ChipProps {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hasTVPreferredFocus?: boolean;
  testID?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onPress,
  style,
  hasTVPreferredFocus,
  testID,
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
      style={[
        styles.chip,
        isFocused ? styles.chipFocused : styles.chipDefault,
        style,
      ]}
    >
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 9999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#1E2638',
    borderWidth: 3,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
  },
  chipDefault: {
    transform: [{ scale: 1 }],
  },
  chipFocused: {
    borderColor: colors.accent,
    backgroundColor: '#273248',
    transform: [{ scale: 1.08 }],
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: '500',
  },
  labelFocused: {
    color: colors.accent,
    fontWeight: '700',
  },
});
