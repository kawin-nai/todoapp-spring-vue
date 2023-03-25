// TODO: Add localStorage support and synchronize to DB
// TODO: Implement auth

let app = new Vue({
    el: "#app",
    data: {
        API_URL: "http://localhost/api/todos",
        currentPage: undefined,
        totalPages: undefined,
        todos: [],
        filtered: false,
        isAdding: false,
        editingId: undefined,
        addTodoBody: {
            "text": undefined,
            "checked": false
        },
        editTodoBody: {
            "id": undefined,
            "text": undefined,
            "checked": undefined
        },
        isOnline: false
    },
    methods: {
        getTodoAtPage(page) {
            fetch(this.API_URL + "?" + new URLSearchParams({
                page: page
            }))
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(json => {
                    this.todos = json.content;
                    this.currentPage = json.number + 1;
                    this.totalPages = json.totalPages;
                    console.log(this.currentPage);
                    this.saveToLocalStorage()
                })
                .catch((error) => console.log(error));

        },
        addTodo() {
            if (this.addTodoBody.text === undefined)
                return;
            fetch(this.API_URL + "/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.addTodoBody)
            })
                .then(() => this.addTodoBody.text = undefined)
                .then(() => this.getTodoAtPage(this.currentPage));
        },
        editTodo() {
            if (this.editTodoBody.text === undefined)
                return;
            console.log(this.editingId);
            fetch(this.API_URL + `/update/${this.editingId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.editTodoBody)
            })
                .then(() => this.editingId = undefined)
                .then(() => this.getTodoAtPage(this.currentPage));
        },
        modifyEdit(todo) {
            this.editingId = todo.id;
            this.editTodoBody.id = todo.id;
            this.editTodoBody.text = todo.text;
            this.editTodoBody.checked = todo.checked;
        },
        deleteTodo(todo) {
            fetch(this.API_URL + `/delete/${todo.id}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(json => {
                    this.totalPages = json;
                    console.log(this.currentPage, this.totalPages, Math.min(this.currentPage, this.totalPages));
                })
                .then(() => this.getTodoAtPage(Math.min(this.currentPage, this.totalPages)));
        },
        handleChecked(todo) {
            todo.checked = !todo.checked;
            fetch(this.API_URL + `/update/${todo.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            }).then (this.saveToLocalStorage)
        },
        toggleFilter() {
            this.filtered = !this.filtered;
        },
        saveToLocalStorage() {
          localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        checkApi() {
            console.log('API checked')
            fetch(this.API_URL + "/active")
                .then(response => {
                    this.isOnline = response.ok;
                })
                .catch(error => {
                    console.error(error);
                    this.isOnline = false;
                })
        }
    },
    computed: {
      nextButtonIsDisabled() {
          return this.currentPage === undefined
              || this.totalPages === undefined
              || this.currentPage >= this.totalPages;

      },
      prevButtonIsDisabled() {
        return this.currentPage === undefined
            || this.currentPage <= 1;

      },
      uncheckedTodos() {
        if (this.filtered) {
            return this.todos.filter(todo => !todo.checked);
        }
        return this.todos;
      },
      totalPagesAsList() {
        const list = [];
        for (let i = 1; i <= this.totalPages; ++i) {
            list.push(i);
        }
        return list;
      }
    },
    mounted() {
        this.currentPage = 1;
        this.getTodoAtPage(this.currentPage);
        setInterval(this.checkApi, 1000);
    }
})