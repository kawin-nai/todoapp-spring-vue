package com.todolist.todo.service;

import com.todolist.todo.entity.Todo;
import com.todolist.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Naipongprasit Kawin 55876098
 * A service that handles the business logic of the API
 */
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
    
    public Page<Todo> findTodosByPageNumber(int pageNumber, int pageSize) {
        return todoRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    public void updateTodoById(Long id, Todo todo) {
        todoRepository.updateIdAndTextAndCheckedById(todo.getId(), todo.getText(), todo.getChecked(), id);
    }

    public void createTodo(Todo todo) {
        todoRepository.save(todo);
    }

    public long deleteTodoById(Long id) {
        int PAGE_SIZE = 5;
        todoRepository.deleteById(id);
        return (todoRepository.count() - 1) / PAGE_SIZE + 1;
    }
}
