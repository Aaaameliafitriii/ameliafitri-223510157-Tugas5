import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  useTheme,
  Button,
  Card,
  Title,
  Paragraph,
  Switch,
  FAB,
} from 'react-native-paper';

const Stack = createStackNavigator();

const TaskListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Implementasi Fitur Aplikasi', description: 'Mulai implementasi fitur utama di aplikasi tugas.' },
    { id: 2, title: 'Pengujian Sistem', description: 'Lakukan uji coba dan debugging untuk memastikan aplikasi berjalan lancar.' },
    { id: 3, title: 'Master React Native', description: 'Pelajari dan kuasai konsep React Native untuk membangun aplikasi mobile.' }

  ]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.primary }]}>Task List</Title>
      {tasks.map((task) => (
        <Card
          key={task.id}
          style={[styles.card, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate('TaskDetails', { task })}
        >
          <Card.Content>
            <Title style={{ color: colors.primary }}>{task.title}</Title>
            <Paragraph style={{ color: colors.text }}>{task.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => alert('Add Task Feature Coming Soon!')}
      />
    </View>
  );
};

const TaskDetailsScreen = ({ route }) => {
  const { colors } = useTheme();
  const { task } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.primary }]}>{task.title}</Title>
      <Paragraph style={[styles.paragraph, { color: colors.text }]}>
        {task.description}
      </Paragraph>
      <Button mode="contained" onPress={() => alert('Task Completed!')}>
        Mark as Completed
      </Button>
    </View>
  );
};

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = {
    dark: isDarkTheme,
    colors: {
      primary: isDarkTheme ? '#bb86fc' : '#6200ee',
      background: isDarkTheme ? '#121212' : '#ffffff',
      surface: isDarkTheme ? '#333333' : '#f6f6f6',
      text: isDarkTheme ? '#ffffff' : '#000000',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <View style={styles.switchContainer}>
          <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
          <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
        </View>
        <Stack.Navigator>
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
            options={{ title: 'Task List' }}
          />
          <Stack.Screen
            name="TaskDetails"
            component={TaskDetailsScreen}
            options={{ title: 'Task Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginVertical: 8,
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200ee',
  },
});
