import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import TodoList from './comp/TodoList'; // Componente que lista as tarefas
import AddTodo from './comp/AddTodo'; // Componente para adicionar tarefas
import { Todo } from './comp/Todo'; // Tipo Todo
import { getDBConnection, createTable, getTodoItems, addTodoItem, deleteTodoItem } from './comp/database';

const App: React.FC = () => {
  const [tarefas, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(''); 
  
  // Conexão com o banco de dados e carregamento inicial das tarefas
  useEffect(() => {
    const loadData = async () => {
      try {
        const db = await getDBConnection(); // Conectar ao banco de dados
        await createTable(db); // Criar a tabela se não existir
        const storedTodos = await getTodoItems(db); // Carregar as tarefas do banco
        setTodos(storedTodos); // Atualizar o estado com as tarefas carregadas
      } catch (error) {
        console.error('Erro ao carregar tarefas: ', error);
      }
    };
    loadData();
  }, []);

  // Função para adicionar tarefa
  const adicionaTarefa = async (todoText: string) => {
    if (todoText.length > 0) {
      const newTodo: Todo = { id: Date.now().toString(), text: todoText };
      try {
        const db = await getDBConnection();
        await addTodoItem(db, newTodo); // Adiciona a nova tarefa ao banco de dados
        setTodos([...tarefas, newTodo]); // Atualiza o estado
      } catch (error) {
        console.error('Erro ao adicionar tarefa: ', error);
        Alert.alert("Erro", "Falha ao adicionar a tarefa no banco de dados", [
          { text: "OK" }
        ]);
      }
    } else {
      Alert.alert("Erro", "Preencha um valor na tarefa", [
        { text: "OK" }
      ]);
    }
  };

  // Função para remover tarefa
  const removerTarefa = async (idTarefa: string) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, idTarefa); // Remove a tarefa do banco de dados
      setTodos(tarefas.filter(tarefa => tarefa.id !== idTarefa)); // Atualiza o estado
    } catch (error) {
      console.error('Erro ao remover tarefa: ', error);
      Alert.alert("Erro", "Falha ao remover a tarefa no banco de dados", [
        { text: "OK" }
      ]);
    }
  };

  // Filtrar tarefas com base no texto do filtro
  const filteredTasks = tarefas.filter(tarefa =>
    tarefa.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <AddTodo onAddTodo={adicionaTarefa} />

      <TextInput
        style={styles.filterInput}
        value={filter}
        onChangeText={setFilter}
        placeholder="Filtrar tarefas..."
      />

      <TodoList todos={filteredTasks} onRemoveTodo={removerTarefa} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  filterInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 8,
    marginBottom: 16,
  },
});

export default App;
