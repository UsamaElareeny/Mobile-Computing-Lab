import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

interface GoalItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [enteredGoal, setEnteredGoal] = useState<string>("");
  const [goals, setGoals] = useState<GoalItem[]>([]);

  const addGoalHandler = () => {
    if (enteredGoal.trim() === "") return;

    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoal, id: Math.random().toString(), completed: false },
    ]);

    setEnteredGoal("");
  };

  const toggleCompletedHandler = (id: string) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal..."
          placeholderTextColor="#999"
          value={enteredGoal}
          onChangeText={setEnteredGoal}
        />
        <View style={styles.buttonWrapper}>
          <Button title="Add" onPress={addGoalHandler} color="#4E79F9" />
        </View>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleCompletedHandler(item.id)}>
            <View
              style={[
                styles.goalItem,
                item.completed && styles.completedGoalItem,
              ]}
            >
              <Text
                style={[
                  styles.goalText,
                  item.completed && styles.completedGoalText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    marginBottom: 25,
    color: "#1F2937",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#1F2937",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },
  goalItem: {
    backgroundColor: "#4E79F9",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  goalText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  completedGoalItem: {
    backgroundColor: "#E2E8F0",
  },
  completedGoalText: {
    color: "#94A3B8",
    textDecorationLine: "line-through",
    fontFamily: "Poppins_500Medium",
  },
});
