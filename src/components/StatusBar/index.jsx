import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomStatusBar = ({ colors = ['#A5D8FF', '#FFFFFF'], barStyle = 'dark-content' }) => {
  return (
    <>
      {/* Gradiente para cobrir a área da StatusBar */}
      <LinearGradient colors={colors} style={styles.gradient} />
      {/* Configuração da StatusBar */}
      <StatusBar
        barStyle={barStyle}
        translucent={true}
        backgroundColor="transparent" // Para permitir o gradiente no fundo
      />
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80, // Altura suficiente para cobrir a StatusBar
  },
});

export default CustomStatusBar;
