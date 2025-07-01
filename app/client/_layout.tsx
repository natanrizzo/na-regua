import { NavigationParams } from '@/types/NavigationParams';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ServicesList from '.';
import TimePicker from './time-picker';
import OrderSummary from './summary';
import ProfileScreen from './profile';

const Stack = createStackNavigator<NavigationParams>();

export default function ClientLayout() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ServicesList" component={ServicesList} options={{ title: "Serviços de Barbeiro" }} />
          <Stack.Screen name="TimePicker" component={TimePicker} options={{ title: "Selecione o Horário" }} />
          <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ title: "Confirme o Agendamento" }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Perfil" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}