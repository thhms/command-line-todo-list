# command-line-todo-list

A simple tool for creating and managing a todo list without having to use your mouse or touch screen*.

So far, it offers the following commands:
- 'done #' : marks note number # as done (type again to mark as undone)
- 'prio #' : marks note number # as a priority (type again to mark as non-priority)
- 'swap # #' : swaps the places of two notes
- 'del #' : deletes note number #
  - 'del done' : deletes alls notes with status done
- 'clear' : clears the screen 
- 'save' : stores data in input field for copy&paste
- 'load ...' : loads data pasted from clipboard

Be aware that this is still in development.

Try the following command:
- load make swap visually more apparent (have two drawMain() executions in swapNotes() to set to CSS class .swapped),$0,$write a function for ArrowUp and ArrowDown keyboard input that navigates through a inputHistory[],$0,$implement a general validity check in cmdInput() to make inputs like "save the planet" or "swap tires" possible,$1,$rewrite for strict mode,$2,$implement an undo command,$0,$add server side save function (PHP?),$0,$enhance touch functionality (del and swap),$0,$fix visual bug load/save function,$2,$create a sort command that puts high priority on top and done to the bottom,$1,$add touch functionality,$2,$make multiple inputs such as "del 1 2 3" possible,$1

*Try tapping/clicking on a note or its number.
