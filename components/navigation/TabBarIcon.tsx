// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

// import Ionicons from '@expo/vector-icons/Ionicons';
// import { type IconProps } from '@expo/vector-icons/build/createIconSet';
// import { type ComponentProps } from 'react';

// export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
//   return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
// }
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { 
FontAwesome,
MaterialIcons, 
Feather,

} from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const IconLibraries = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome5,
};

export function TabBarIcon({ library = 'Ionicons', name, color, size = 24 }) {
  const IconComponent = IconLibraries[library] || FontAwesome;
  return <IconComponent name={name} size={size} color={color} />;
}
