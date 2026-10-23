import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { colors, spacing, typography } from './theme';

export interface FocusableButtonProps {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  hasTVPreferredFocus?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
  testID?: string;
  accessibilityLabel?: string;
}

export const FocusableButton: React.FC<FocusableButtonProps> = ({
  label,
  onPress,
  style,
  textStyle,
  hasTVPreferredFocus,
  variant = 'primary',
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
      accessibilityLabel={accessibilityLabel || label}
      style={[
        styles.button,
        variant === 'accent' ? styles.btnAccent : styles.btnPrimary,
        isFocused ? styles.buttonFocused : styles.buttonDefault,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'accent' && !isFocused && styles.labelAccent,
          isFocused && styles.labelFocused,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#1E2638',
  },
  btnAccent: {
    backgroundColor: colors.accent,
  },
  buttonDefault: {
    transform: [{ scale: 1 }],
  },
  buttonFocused: {
    borderColor: colors.accent,
    backgroundColor: '#2D3748',
    transform: [{ scale: 1.08 }],
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    color: colors.text,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: '600',
  },
  labelAccent: {
    color: '#0B0F1A',
  },
  labelFocused: {
    color: colors.accent,
  },
});
