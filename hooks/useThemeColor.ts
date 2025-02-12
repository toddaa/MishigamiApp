/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserTheme } from '@/components/useUserTheme';

export function useThemeColor (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const [userTheme] = useUserTheme(); // Get user-selected theme

  // Determine active theme
  const customTheme = userTheme === 'auto' ? theme : userTheme;

  // Return color from props or Colors file
  return props[theme] ?? Colors[theme][colorName];



  // const colorFromProps = props[theme];

  // if (colorFromProps) {
  //   return colorFromProps;
  // } else {
  //   return Colors[theme][colorName];
  // }
}
