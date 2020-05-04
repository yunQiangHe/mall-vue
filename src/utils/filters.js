/*
 * @Author: heyunqiang 
 * @Date: 2020-05-05 00:29:36 
 * @Last Modified by: yunqinagHe
 * @Last Modified time: 2020-05-05 00:30:22
 */

// visibility filters
const filters = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed;
        });
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed;
        });
    }
};
export default filters;