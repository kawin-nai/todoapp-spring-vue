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

    private TodoRepository todoRepository;
    
    private List<Todo> findAll() {
        return todoRepository.findAll(); 
    }
}
