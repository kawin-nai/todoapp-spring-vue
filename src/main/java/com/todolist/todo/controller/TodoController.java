package com.todolist.todo.controller;

import com.todolist.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    private final TodoService todoService;

}
