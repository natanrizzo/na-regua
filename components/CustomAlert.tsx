import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

type CustomAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  buttons: ButtonProps[];
};

const CustomAlert = ({ visible, title, message, buttons }: CustomAlertProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        const cancelButton = buttons.find(b => b.style === 'cancel');
        if (cancelButton) {
          cancelButton.onPress();
        }
      }}
    >
      <View style={styles.modalBackdrop}>

        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <Pressable
                key={index}
                style={[
                  styles.button,
                  button.style === 'destructive' && styles.destructiveButton,
                  button.style === 'cancel' && styles.cancelButton,
                ]}
                onPress={button.onPress}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.style === 'destructive' && styles.destructiveButtonText,
                    button.style === 'cancel' && styles.cancelButtonText,
                  ]}
                >
                  {button.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '85%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  destructiveButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#000',
  },
  destructiveButtonText: {
    color: '#FFF',
  },
});

export default CustomAlert;