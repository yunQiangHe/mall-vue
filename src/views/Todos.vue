<template>
  <div class="todos">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          type="text"
          class="new-todo"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </header>

      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{'editing':todo == editedTodo, 'completed':todo.completed}"
            v-for="todo in todos"
            :key="todo.id"
          >
            <div class="view">
              <input type="checkbox" class="toggle" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{todo.title}}</label>
              <button class="destroy" @click="deletTodo(todo)"></button>
            </div>
            <input
              type="text"
              class="edit"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @keyup.esc="cancelEdit(todo)"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
            />
          </li>
        </ul>
      </section>

      <footer class="footer">
        <span class="todo-count">3 items left</span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>

      <!-- <div class="showdows"></div> -->
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Written by
        <a href="javascript:;">何云强</a>
      </p>
      <p>
        Part of
        <a href="javascript:;">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
import todoStorage from "../utils/todoStorage";
import filters from "../utils/filters";

export default {
  data() {
    return {
      newTodo: "",
      todos: todoStorage.fetch(),
      editedTodo: null,
      visibility: "all"
    };
  },
  methods: {
    addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },
    deletTodo(todo) {
      // arr.indexOf(item, from) 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;

      todo.title = todo.title.trim();

      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    onHashChange() {
      var visibility = window.location.hash.replace(/#\/?/, "");
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    }
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? "item" : "items";
    }
  },
  watch: {
    // watch todos change for localStorage persistence
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  directives: {
    // 局部注册
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  computed: {
    filteredTodos: function() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(el => {
          el.completed = value;
        });
      }
    }
  },
  mounted() {
    window.addEventListener("hashchange", this.onHashChange);
  }
};
</script>

<style lang="scss" scoped>
button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.todoapp {
  position: relative;
  min-width: 230px;
  max-width: 550px;
  margin: 100px auto 20px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  h1 {
    position: absolute;
    top: -210px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    font-size: 24px;
    line-height: 1.4em;
    width: 100%;
    box-sizing: border-box;
  }

  .main {
    .todo-list {
      li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;

        .toggle {
          text-align: center;
          width: 40px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 8px;
          margin: 0;
        }

        label {
          text-align: left;
          word-break: break-all;
          padding: 15px 15px 15px 60px;
          display: block;
          line-height: 1.2;
          transition: color 0.4s;
        }

        .destroy {
          display: none;
          position: absolute;
          top: 0;
          right: 10px;
          bottom: 0;
          width: 40px;
          height: 40px;
          margin: auto 0;
          font-size: 30px;
          color: #cc9a9a;
          margin-bottom: 11px;
          transition: color 0.2s ease-out;

          &:hover {
            color: #af5b5e;
          }

          &::before {
            content: "x";
          }
        }

        &:last-child {
          border-bottom: none;
        }

        &:hover .destroy {
          display: block;
        }

        .edit {
          display: none;
          position: relative;
          margin: 0;
          width: 100%;
          font-size: 24px;
          font-family: inherit;
          font-weight: inherit;
          line-height: 1.4em;
          border: 0;
          color: inherit;
          padding: 6px;
          border: 1px solid #999;
          box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }

        &.editing .edit {
          display: block;
          width: calc(100% - 48px);
          padding: 12px 16px;
          margin: 0 0 0 48px;
        }
        &.editing .view {
          display: none;
        }

        &.completed .view label {
          text-decoration: line-through;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    font-size: 14px;
    z-index: 33;

    .filters {
      display: flex;
      justify-content: space-between;

      li {
        a {
          color: inherit;
          margin: 3px;
          padding: 3px 7px;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 3px;

          &.selected {
            border-color: rgba(175, 47, 47, 0.2);
          }

          &:hover {
            border-color: rgba(175, 47, 47, 0.1);
          }
        }
      }
    }

    .clear-completed {
      border: none;
      background: none;
      line-height: 20px;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .showdows {
    &::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      overflow: hidden;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
  }
}

.toggle-all {
  position: absolute;
  left: 9px;
  top: 20px;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>