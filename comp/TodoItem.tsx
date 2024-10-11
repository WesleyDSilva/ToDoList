import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native'
import { Todo } from './Todo';

type TodoItemProps = {
    todo: Todo;
    onRemoveTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onRemoveTodo } ) => {
    return (
        <View style={styles.container}>
            <Text>
                {todo.text}
            </Text>
            <Button title='Excluir' onPress={() => onRemoveTodo(todo.id)} />            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    text: {
      flex: 1,
    },
  });

  export default TodoItem;