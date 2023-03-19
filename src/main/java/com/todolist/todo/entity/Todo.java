package com.todolist.todo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    public Todo(String text, Boolean checked) {
        this.text = text;
        this.checked = checked;
    }

    public Todo() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "checked", nullable = false)
    private Boolean checked;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
