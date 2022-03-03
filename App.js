import { StatusBar } from 'expo-status-bar';
import { Keyboard,TouchableWithoutFeedback, StyleSheet, Text, View,Alert, TextInput , FlatList, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-web';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

var key=3;

export default function App() {
  const [task, setTask] = useState([
    {taskName:"buy milk", id: 0},
    {taskName:"buy food", id: 1},
    {taskName:"learn react", id: 2}
  ]);

  const pressHandler = (id) => {
    setTask((prevTask) => {
      return prevTask.filter(task => task.id  != id);
    });
  };

  const handleClick = (currentTask, setCurrentTask)=>{
    if(currentTask.length > 3){
      setTask((prevTask) => {
        return [...prevTask,{taskName:currentTask, id: key++}];
      });
      setCurrentTask("");
    }else{
      Alert.alert('OOPS', 'Todo must be over 3 characters long', [
        {text: 'Understood', onPress: () => setCurrentTask("") }
      ]);
    }
    
  }

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
    {/* <Sandbox/> */}
      <View style={styles.container}>
        <Header/>
        <AddTodo submitHandler={handleClick}/>
        <FlatList 
          keyExtractor={(item) => item.id} 
          data={task} 
          renderItem={({ item }) => (
            <TodoItem pressHandler={pressHandler} item={item}/>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
