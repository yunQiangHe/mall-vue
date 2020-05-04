/*
 * @Author: heyunqiang 
 * @Date: 2020-05-04 22:57:00 
 * @Last Modified by: yunqinagHe
 * @Last Modified time: 2020-05-04 22:59:19
 */

// localStorage persistence
const STORAGE_KEY = "todos-vuejs-2.0";
const todoStorage = {
    fetch: function() {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        todos.forEach(function(todo, index) {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

export default todoStorage;