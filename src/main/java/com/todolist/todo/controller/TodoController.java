package com.todolist.todo.controller;

import com.todolist.todo.entity.Todo;
import com.todolist.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    private final TodoService todoService;

    @GetMapping()
    private List<Todo> getAllTodos() {
        return todoService.findAll();
    }

    @GetMapping(params = {"page"})
    private Page<Todo> getTodosByPageNumber(@RequestParam int page) {
        int PAGE_SIZE = 5;
        return todoService.findTodosByPageNumber(page - 1, PAGE_SIZE);
    }

    @PostMapping("/create")
    private void createPost(@RequestBody Todo todo) {
        todoService.createTodo(todo);
    }

    @PutMapping("/update/{id}")
    private void updateTodoById(@PathVariable Long id, @RequestBody Todo todo) {
        todoService.updateTodoById(id, todo);
    }

    @DeleteMapping("/delete/{id}")
    private long deleteTodoByIdAndReturnLength(@PathVariable Long id) {
        return todoService.deleteTodoById(id);
    }
}
