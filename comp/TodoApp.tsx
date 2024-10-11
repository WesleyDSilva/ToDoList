import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';

import AddTodo from './AddTodo';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [filter, setFilter] = useState('');

  const handleAddTodo = (todo: string) => {
    if (todo) {
      setTodos([...todos, todo]);
    }
  };

  const handleRemoveTodo = (todoToRemove: string) => {
    setTodos(todos.filter(todo => todo !== todoToRemove));
  };

  const filteredTodos = todos.filter(todo =>
    todo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={styles.appContainer}>
      <AddTodo onAddTodo={handleAddTodo} />

      <TextInput
        style={styles.filterInput}
        value={filter}
        onChangeText={setFilter}
        placeholder="Filtrar tarefas..."
      />

      <FlatList
        data={filteredTodos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <Button title="Excluir" onPress={() => handleRemoveTodo(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    padding: 16,
  },
  filterInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 8,
    marginBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  todoText: {
    fontSize: 18,
  },
});

export default TodoApp;
