# Snake Game

Design a snake game that is to be played in web browser.

Client: React + Redux

Rendering:
Pixel-based graphics. Depending on the intended resolution, can divide the screen into N \* M pixels. Can dynamically calculate the size of each pixel.

Fruit: One pixel.
Snake body: One pixel width made up of connected pixels.

Model:

```js
{
  fruit: {
    x, y
  },
  snake: {
    points: [(x, y), ...] # head is at index 0
    direction: north/south/east/west
  }
  speed: 500,
  points: 0
}
```

```js
function update() {
  next_loc = points[0] + (x, y) # Depends on the direction
  if (snake.points.find(next_loc) > 0) {
     // die
  }
  let pts = snake.points;
  if (!isEqual(next_loc, fruit)) {
    pts = points.removeLast();
  } else {
    generateFruit();
    points++;
  }
  snake.points = [next_loc, ...pts];

  // Boundary checking ->  die
}
```

```js
function generateFruit() {
  // Cannot generate on my own body.

  // First approach: while on body, generate
  let next_fruit_location = random_location();
  while (snake.points.find(next_fruit_location) > 0) {
    next_fruit_location = random_location();
  }
  fruit = next_fruit_location;

  // Second approach: brute force
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let point = { x: i, y: j };
      if (snake.points.find(next_fruit_location) === -1) {
        fruit = point;
      }
    }
  }

  // Third approach: brute force with random
  const available_points = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let point = { x: i, y: j };
      if (snake.points.find(next_fruit_location) === -1) {
        available_points.push(point);
      }
    }
  }
  fruit = _.sample(available_points);
}

setInterval(update, speed);
```
