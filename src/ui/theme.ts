export const colors = {
  background: '#0B0F1A',
  card: '#151B2B',
  cardHover: '#1E2638',
  accent: '#FFB703',
  accentGlow: 'rgba(255, 183, 3, 0.35)',
  text: '#FFFFFF',
  textSecondary: '#E2E8F0',
  muted: '#9AA4B2',
  border: '#2A344A',
  danger: '#EF4444',
  success: '#10B981',
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  safeMarginHorizontal: 64, // 5% safe margin for 10-foot UI
  safeMarginVertical: 36,
};

export const typography = {
  hero: {
    fontSize: 54,
    lineHeight: 62,
    fontWeight: '700' as const,
  },
  header: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700' as const,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '600' as const,
  },
  subtitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '400' as const,
  },
};
