// TODO: Limit to 5 per page and next/prev button
// TODO: Add checked/unchecked
// TODO: Add styling
// TODO: Add localStorage support and synchronize to DB
// TODO: Implement auth

let app = new Vue({
    el: "#app",
    data: {
        API_URL: "http://localhost/api/todos",
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
            fetch(this.API_URL)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(json => this.todos = json)
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
    mounted() {
        this.getTodos();
    }
})