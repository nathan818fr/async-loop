# node-async-loop
Loop through an array to execute asynchronous actions on each element.

Sometimes you must execute an asynchronous action on each elements of an array, but you must wait for the previous
action to complete before proceed to the next.

## Prototype ##
```js
asyncLoop(array, [from, [to]], callback, endCallback);
```

**array:** array

The array to loop

**from (optionnal):** integer

The starting position (Default: 0).

**to (optionnal):** integer

The final position (Default: array.length - 1).

**callback:** function(item, next)

The function called for every elements.
It must call `next()` so that the next array element is executed.
At the end `endCallback` will be called!

On error it must call `next(errorObject)` and iteration will be stopped and the endCallback called with errorObject.

**endCallback:** function(err)

This function is called at the end.

The `err` variable is null if everything was fine, otherwise it contains the error.

## Basic Usage ##
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
