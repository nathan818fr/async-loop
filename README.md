# node-async-loop
Loop through an array to execute asynchronous actions on each element.

Sometimes you must execute an asynchronous action on each elements of an array, but you must wait for the previous
action to complete before proceed to the next.

## Install ##
```
npm install --save node-async-loop
```

## Prototype ##
```js
asyncLoop(array, [from, [to]], callback, [endCallback]);
```

**array:** array

The array to loop

**from (optionnal):** integer

The starting position, including (Default: 0).

**to (optionnal):** integer

The final position, including (Default: array.length - 1).

**callback:** function(item, next)

The function called for every elements.
It must call `next()` so that the next array element is executed.
At the end `endCallback` will be called!

On error it must call `next(errorObject)` and iteration will be stopped and the endCallback called with errorObject.

**endCallback (optionnal):** function(err)

This function is called at the end.

The `err` variable is null if everything was fine, otherwise it contains the error.

## Usage ##

### Basic Usage ###
General usage:
```js
var asyncLoop = require('node-async-loop');

var array = ['item0', 'item1', 'item2'];
asyncLoop(array, function (item, next)
{
    do.some.action(item, function (err)
    {
        if (err)
        {
            next(err);
            return;
        }

        next();
    });
}, function (err)
{
    if (err)
    {
        console.error('Error: ' + err.message);
        return;
    }

    console.log('Finished!');
});
```

For example, create folder recursively:
```js
var fs = require('fs');
var asyncLoop = require('node-async-loop');

var directories = ['test', 'test/hello', 'test/hello/world'];
asyncLoop(directories, function (directory, next)
{
    fs.mkdir(directory, function (err)
    {
        if (err)
        {
            next(err);
            return;
        }

        next();
    });
}, function (err)
{
    if (err)
    {
        console.error('Error: ' + err.message);
        return;
    }

    console.log('Finished!');
});
```

### Loop Partially and in reverse order! ###
```js
var asyncLoop = require('node-async-loop');

var displayItem = function(item, next) {
    console.log(item);
    next();
}

var array = ['A', 'B', 'C', 'D', 'E', 'F'];

// Loop all
asyncLoop(array, displayItem); // A, B, C, D, E, F
asyncLoop(array, 0, displayItem); // A, B, C, D, E, F
asyncLoop(array, 0, array.length - 1, displayItem); // A, B, C, D, E, F

// Loop partially to the end
asyncLoop(array, 1, displayItem); // B, C, D, E, F
asyncLoop(array, 2, displayItem); // C, D, E, F

// Loop partially
asyncLoop(array, 1, 3, displayItem); // B, C, D
asyncLoop(array, 0, 1, displayItem); // A, B
asyncLoop(array, 0, 2, displayItem); // A, B, C

// Loop partially in reverse order
asyncLoop(array, 3, 1, displayItem); // D, C, B
asyncLoop(array, 1, 0, displayItem); // B, B
asyncLoop(array, 2, 0, displayItem); // C, B, A

// Loop partially, using negative from/to values
// -1 is the last element (F)
// -2 is the before last element (E)
// -3 ... (D)
// ...
asyncLoop(array, 0, -2, displayItem); // A, B, C, D, E
asyncLoop(array, 1, -2, displayItem); // B, C, D, E

// So to loop in reverse order you can do
asyncLoop(array, array.length - 1, 0, displayItem); // F, E, D, C, B, A
// or simply
asyncLoop(array, -1, 0, displayItem); // F, E, D, C, B, A
// or simply simply
asyncLoop(array, -1, displayItem); // F, E, D, C, B, A

// Other examples
asyncLoop(array, -2, displayItem); // E, D, C, B, A
asyncLoop(array, -2, -4, displayItem); // E, D, C
asyncLoop(array, -4, -2, displayItem); // C, D, E
```
