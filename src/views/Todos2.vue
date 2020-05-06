<template>
  <div id="todo-app">
    <div>
      <input type="button" value="全部标为完成" @click="markAllAsCompleted" />
      <input
        :class="{styleColor}"
        type="text"
        placeholder="添加 todo"
        v-model="newTodoTitle"
        @keyup.enter="addTodo"
      />
      <span v-show="styleColor">提示：输入内容</span>
    </div>
    <!-- todo list -->
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <span :class="{'completed':todo.completed}" @dblclick="editTodo(todo)">{{todo.title}}</span>
        <input type="button" value="标为完成" @click="markAsCompleted(todo)" />
        <input type="button" value="删除" @click="removeTodo(todo)" />
        <input
          type="text"
          value="e编辑 todo..."
          v-todo-focus="true"
          v-if="editedTodo !== null && editedTodo.id == todo.id"
          v-model="todo.title"
          @blur="editDone(todo)"
          @keyup.enter="editDone(todo)"
          @keyup.esc="cancelEdit(todo)"
        />
      </li>
    </ul>
    <!-- end todo list -->
    <div>
      <span>剩余 {{leftTodosCount}} 项未完成 ---</span>
      <span>
        筛选：
        <input
          type="button"
          :class="{'selected': intention == 'all'}"
          value="全部"
          @click="intention = 'all'"
        />
        <input
          type="button"
          :class="{'selected': intention == 'ongoing'}"
          value="进行中"
          @click="intention = 'ongoing'"
        />
        <input
          type="button"
          :class="{'selected': intention == 'finished'}"
          value="已完成"
          @click="intention = 'finished'"
        />
        <input type="button" value="清除已完成" @click="clearfinished" />
        <input type="button" value="清除全部" @click="clearAll" />
      </span>
    </div>
  </div>
</template>

<script>
import todoStorage from "../utils/todoStorage";
export default {
  data() {
    return {
      //   todos: [
      //     // { id: 1, title: "test1", completed: false },
      //     // { id: 2, title: "test2", completed: true }
      //   ],
      todos: todoStorage.fetch(),
      newTodoTitle: "",
      styleColor: false,
      intention: "all", // 默认为 all
      editedTodo: null // 用于暂存编辑前的 todo 状态
    };
  },
  computed: {
    leftTodos() {
      return this.todos.filter(todo => !todo.completed);
    },
    leftTodosCount() {
      //filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
      return this.leftTodos.length;
    },
    filteredTodos() {
      if (this.intention == "ongoing") {
        return this.leftTodos;
      } else if (this.intention == "finished") {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle == "") {
        this.styleColor = true;
        return;
      }
      this.styleColor = false;
      let addTodoData = {
        id: Math.random() * 1000000,
        title: this.newTodoTitle,
        completed: false
      };
      this.todos.push(addTodoData);
      this.newTodoTitle = "";
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    markAsCompleted(todo) {
      todo.completed = true;
    },
    editTodo(todo) {
      // 这个方法把编辑前的 todo 状态暂存到 editedTodo
      this.editedTodo = {
        id: todo.id,
        title: todo.title,
        completed: todo.completed
      };
    },
    editDone(todo) {
      if (!todo.title) {
        this.removeTodo(todo);
      }
      this.editedTodo = null;
    },
    cancelEdit(todo) {
      todo.title = this.editedTodo.title;
      this.editedTodo = null;
    },
    markAllAsCompleted() {
      this.todos.map(todo => {
        if (!todo.completed) {
          todo.completed = true;
        }
      });
    },
    clearAll() {
      this.todos = [];
    },
    clearfinished() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  },
  directives: {
    "todo-focus": {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  // 监测 todos 列表的变化，将变化存储到 local storage
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}

.selected {
  color: red;
}

.styleColor {
  border-color: red;
}
</style>