import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    useWindowDimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const FeatureCard = ({ icon, title, description }: { icon: any; title: string; description: string }) => (
    <View style={styles.featureCard}>
        <Feather name={icon} size={32} color="#6D5FFD" />
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
    </View>
);

export default function LandingPage() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isDesktop = width >= 768;

    return (
        <ScrollView style={styles.container}>
            <View style={[styles.heroSection, isDesktop && styles.heroSectionDesktop]}>
                <View style={styles.heroTextContainer}>
                    <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
                        O seu estilo, no seu tempo.
                    </Text>
                    <Text style={[styles.heroSubtitle, isDesktop && styles.heroSubtitleDesktop]}>
                        Encontre os melhores barbeiros, cabeleireiros e produtos de beleza perto de você.
                    </Text>
                    <TouchableOpacity 
                        style={styles.heroButton}
                        onPress={() => router.push('/(public)/register')}
                    >
                        <Text style={styles.heroButtonText}>Comece Agora</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Tudo que você precisa em um só lugar</Text>
                <View style={[styles.featuresGrid, isDesktop && styles.featuresGridDesktop]}>
                    <FeatureCard
                        icon="scissors"
                        title="Profissionais Qualificados"
                        description="Descubra e agende com os melhores talentos da sua região, de barbeiros a esteticistas."
                    />
                    <FeatureCard
                        icon="shopping-bag"
                        title="Produtos Exclusivos"
                        description="Acesse uma curadoria de produtos de alta qualidade recomendados por especialistas."
                    />
                    <FeatureCard
                        icon="calendar"
                        title="Agendamento Fácil"
                        description="Marque seu horário com apenas alguns cliques, de forma rápida e sem complicações."
                    />
                </View>
            </View>

            <View style={styles.ctaSection}>
                <Text style={styles.ctaTitle}>Pronto para transformar seu visual?</Text>
                <TouchableOpacity 
                    style={[styles.heroButton, { backgroundColor: '#fff' }]}
                    onPress={() => router.push('/(public)/login')}
                >
                    <Text style={[styles.heroButtonText, { color: '#6D5FFD' }]}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroSection: {
        backgroundColor: '#f8f9fa',
        padding: 24,
        paddingTop: 60,
        alignItems: 'center',
    },
    heroSectionDesktop: {
        flexDirection: 'row',
        paddingHorizontal: '10%',
        paddingVertical: 80,
    },
    heroTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2D3748',
        textAlign: 'center',
    },
    heroTitleDesktop: {
        fontSize: 48,
        textAlign: 'left',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#4A5568',
        textAlign: 'center',
        marginTop: 16,
        maxWidth: 500,
    },
    heroSubtitleDesktop: {
        fontSize: 18,
        textAlign: 'left',
    },
    heroButton: {
        backgroundColor: '#6D5FFD',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 32,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    heroButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    featuresSection: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        textAlign: 'center',
        marginBottom: 32,
    },
    featuresGrid: {
        alignItems: 'center',
    },
    featuresGridDesktop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    featureCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        width: Platform.OS === 'web' ? 300 : '100%',
        marginBottom: 20,
        minHeight: 200,
    },
    featureTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#2D3748',
    },
    featureDescription: {
        fontSize: 14,
        color: '#4A5568',
        textAlign: 'center',
        marginTop: 8,
    },
    ctaSection: {
        backgroundColor: '#6D5FFD',
        padding: 40,
        alignItems: 'center',
    },
    ctaTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: -10,
    },
});