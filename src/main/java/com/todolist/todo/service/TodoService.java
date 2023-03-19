package com.todolist.todo.service;

import com.todolist.todo.entity.Todo;
import com.todolist.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    private final TodoRepository todoRepository;
    
    public List<Todo> findAll() {
        return todoRepository.findAll(); 
    }

    public void updateTodoById(Long id, Todo todo) {
        todoRepository.updateIdAndTextAndCheckedById(todo.getId(), todo.getText(), todo.getChecked(), id);
    }

    public void createTodo(Todo todo) {
        todoRepository.save(todo);
    }

    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}
