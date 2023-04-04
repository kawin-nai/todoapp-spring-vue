package com.todolist.todo.controller;

import com.todolist.todo.entity.Todo;
import com.todolist.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Naipongprasit Kawin 55876098
 * A RESTful controller that handles incoming API request
 */
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    private final TodoService todoService;
    private final int PAGE_SIZE = 5;
    @GetMapping("/active")
    private String getActive() {
        return "active";
    }

    @GetMapping()
    private List<Todo> getAllTodos() {
        return todoService.findAll();
    }

    @GetMapping(params = {"page"})
    private Page<Todo> getTodosByPageNumber(@RequestParam int page) {
        return todoService.findTodosByPageNumber(page - 1, PAGE_SIZE);
    }

    @GetMapping(path="/unchecked", params = {"page"})
    private Page<Todo> getUncheckedTodosByPageNumber(@RequestParam int page) {
        return todoService.findUncheckedTodosByPageNumber(page-1, PAGE_SIZE);
    }

    @PostMapping("/create")
    private void createPost(@RequestBody Todo todo) {
        todoService.createTodo(todo);
    }

    @PutMapping("/update/{id}")
    private long updateTodoById(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.updateTodoById(id, todo);
    }

    @DeleteMapping("/delete/{id}")
    private long deleteTodoByIdAndReturnLength(@PathVariable Long id) {
        return todoService.deleteTodoById(id);
    }
}
