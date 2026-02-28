import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return;
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setEnteredGoalText("");
  }

  function deleteGoalHandler(goalId) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== goalId);
    });
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>To-Do List</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <Button title="ADD GOAL" onPress={addGoalHandler} color="#370063" />
        </View>
      </View>

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              // استخدمنا TouchableOpacity عشان نقدر نضغط على العنصر ويمسحه
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => deleteGoalHandler(itemData.item.id)}
              >
                <View style={styles.goalItem}>
                  <Text style={styles.goalText}>{itemData.item.text}</Text>
                  <Text style={styles.deleteHint}>(Tap to delete)</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  titleContainer: {
    backgroundColor: "#370063",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#370063",
    width: "70%",
    marginRight: 8,
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    width: "30%",
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#370063",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    color: "white",
    fontSize: 16,
  },
  deleteHint: {
    color: "#ccc",
    fontSize: 10,
    fontStyle: "italic",
  },
});
