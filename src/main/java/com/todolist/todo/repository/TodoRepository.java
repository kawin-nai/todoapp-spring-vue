package com.todolist.todo.repository;

import com.todolist.todo.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Naipongprasit Kawin 55876098
 * A repository that interacts with the H2 database
 */
public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Transactional
    @Modifying
    @Query("update Todo t set t.id = ?1, t.text = ?2, t.checked = ?3 where t.id = ?4")
    void updateIdAndTextAndCheckedById(Long id, String text, Boolean checked, Long id1);

    @Override
    void deleteById(Long aLong);

    Page<Todo> findByChecked(boolean checked, PageRequest of);

    List<Todo> findByChecked(boolean checked);
}
