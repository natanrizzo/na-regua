
import { Link, Stack } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <View style={styles.container}>
        <Text style={styles.title}>Página não encontrada</Text>
        <Text style={styles.subtitle}>
          A rota que você tentou acessar não existe.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Voltar para a tela inicial</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
  },
});