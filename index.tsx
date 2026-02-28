import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => setModalIsVisible(true);
  const endAddGoalHandler = () => setModalIsVisible(false);

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) {
      Alert.alert("Empty Task", "Please enter a task first!", [
        { text: "Okay" },
      ]);
      return;
    }
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString(), isDone: false },
    ]);
    setEnteredGoalText("");
    endAddGoalHandler();
  }

  function toggleGoalStatus(id) {
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id ? { ...goal, isDone: !goal.isDone } : goal,
      ),
    );
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id),
    );
  }

  return (
    <View style={styles.appContainer}>
      {/* العنوان في المنتصف وبدون خلفية ملونة */}
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>To Do List</Text>
        <Text style={styles.subHeaderText}>
          Progress: {courseGoals.filter((g) => g.isDone).length} /{" "}
          {courseGoals.length} Completed
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButtonMain}
        onPress={startAddGoalHandler}
      >
        <Text style={styles.addButtonText}>+ Add New Task</Text>
      </TouchableOpacity>

      <Modal visible={modalIsVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your task here..."
              placeholderTextColor="#adb5bd"
              onChangeText={setEnteredGoalText}
              value={enteredGoalText}
            />
            <View style={styles.buttonActionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={endAddGoalHandler}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={addGoalHandler}
              >
                <Text style={styles.confirmBtnText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => (
            <View
              style={[
                styles.goalCard,
                itemData.item.isDone && styles.completedCard,
              ]}
            >
              <TouchableOpacity
                style={styles.checkArea}
                onPress={() => toggleGoalStatus(itemData.item.id)}
              >
                <MaterialIcons
                  name={
                    itemData.item.isDone
                      ? "check-box"
                      : "check-box-outline-blank"
                  }
                  size={26}
                  color={itemData.item.isDone ? "#4CAF50" : "#370063"}
                />
                <Text
                  style={[
                    styles.goalText,
                    itemData.item.isDone && styles.completedText,
                  ]}
                >
                  {itemData.item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteGoalHandler(itemData.item.id)}
              >
                <MaterialIcons name="delete-sweep" size={24} color="#FF5252" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 25,
    backgroundColor: "#F8F9FD",
  },
  headerSection: {
    marginBottom: 30,
    alignItems: "center", // لتوسيط العنوان والعداد في نص الشاشة
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#1A1C20", // رجعناه أسود احترافي
    letterSpacing: -1,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#717681",
    fontWeight: "600",
    marginTop: 8,
  },
  addButtonMain: {
    backgroundColor: "#370063",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#370063",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(26, 28, 32, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 30,
    paddingBottom: 50,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1A1C20",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#F1F3F9",
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    color: "#1A1C20",
  },
  buttonActionRow: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#FF5252",
    fontWeight: "700",
  },
  confirmBtn: {
    flex: 2,
    backgroundColor: "#370063",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  confirmBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  goalsContainer: {
    flex: 1,
  },
  goalCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  completedCard: {
    backgroundColor: "#F1F3F5",
    opacity: 0.8,
  },
  checkArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  goalText: {
    color: "#1A1C20",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 12,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#ADB5BD",
  },
});
