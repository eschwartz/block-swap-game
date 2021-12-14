# Block Swapper Game

My son was playing a video game this weekend where he needed to convert one grid of red and blue squares to another.

eg:

```js
X O O        X O X
O O O   -->  X X X
O O O        O O X
```

When you click on any square in the grid, it toggles it between X and O, and also toggles the squares above, below, left, and right of it.

Write a program to solve the game, spitting out a list of turns to take (which items to click).

It should be able to solve the sample above in six turns or less, and also solve any other solve-able starting/ending points.
For bonus points, it should consistently take <0.10s to solve.
