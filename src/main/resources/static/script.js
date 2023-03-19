// TODO: Limit to 5 per page and next/prev button
// TODO: Add checked/unchecked
// TODO: Add styling
// TODO: Add localStorage support and synchronize to DB
// TODO: Implement auth

let app = new Vue({
    el: "#app",
    data: {
        API_URL: "http://localhost/api/todos",
        currentPage: undefined,
        totalPages: undefined,
        todos: [],
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
        }
    },
    methods: {
        getTodos() {
            fetch(this.API_URL + "?" + new URLSearchParams({
                page: 1
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
                })
                .catch((error) => console.log(error));
        },
        getNextTodos() {
            fetch(this.API_URL + "?" + new URLSearchParams({
                page: this.currentPage + 1
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
                })
                .catch((error) => console.log(error));
        },
        getPrevTodos() {
            fetch(this.API_URL + "?" + new URLSearchParams({
                page: this.currentPage - 1
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
                .then(this.modifyAdd)
                .then(this.getTodos);
        },
        modifyAdd() {
            this.isAdding = !this.isAdding;
            this.addTodoBody.text = undefined;
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
                .then((res) => this.editingId = undefined)
                .then(this.getTodos);
        },
        modifyEdit(todo) {
            this.editingId = todo.id;
            this.editTodoBody.id = todo.id;
            this.editTodoBody.text = todo.text;
            this.editTodoBody.checked = todo.checked;
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

      }
    },
    mounted() {
        this.getTodos();
    }
})