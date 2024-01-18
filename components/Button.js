import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Button = ({ label, theme, onPress }) => {
  const isPrimaryTheme = theme === "primary";

  return (
    <View style={[styles.buttonContainer, isPrimaryTheme && styles.primaryContainer]}>
      <Pressable
        style={[styles.button, isPrimaryTheme && styles.primaryButton]}
        onPress={onPress}
      >
        {isPrimaryTheme && (
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
        )}
        <Text style={[styles.buttonLabel, isPrimaryTheme && styles.primaryLabel]}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  primaryContainer: {
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 18,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  primaryLabel: {
    color: "#25292e",
  },
});

export default Button;
