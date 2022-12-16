# command-line-todo-list

A simple tool for creating and managing a todo list without having to use your mouse or touch screen.

So far, it offers five commands:
- 'done #' : marks note number # as done (type again to mark as undone)
- 'prio #' : marks note number # as a priority (type again to mark as non-priority)
- 'swap # #' : swaps the places of two notes
- 'del #' : deletes note number #
- 'clear' : clears the screen 
- 'save' : stores data in input for copy&paste
- 'load "..."' : loads data in string

Be aware that there is no save or undo functionality.

All data is stored inside the JSON object 'data'.
