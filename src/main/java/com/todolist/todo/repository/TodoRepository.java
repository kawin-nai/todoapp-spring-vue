package com.todolist.todo.repository;

import com.todolist.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query("select count(t) from Todo t where t.id = ?1")
    long countById(Long id);
    @Transactional
    @Modifying
    @Query("update Todo t set t.id = ?1, t.text = ?2, t.checked = ?3 where t.id = ?4")
    void updateIdAndTextAndCheckedById(Long id, String text, Boolean checked, Long id1);

    @Override
    void deleteById(Long aLong);
}
