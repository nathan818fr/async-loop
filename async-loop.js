var asyncLoop = function (array)
{
    var from = (arguments.length > 3) ? arguments[1] : 0;
    var to = (arguments.length > 4) ? arguments[2] : ((from >= 0) ? array.length - 1 : 0);
    if (from < 0)
        from = array.length + from;
    if (to < 0)
        to = array.length + to;
    var callback = arguments[arguments.length - 2];
    var endCallback = arguments[arguments.length - 1];

    var step = (from > to) ? -1 : 1;

    loopRec(array, callback, endCallback, from, to, step);
};

var loopRec = function (array, callback, endCallback, currentIndex, to, step)
{
    if (step > 0)
    {
        if (currentIndex > to)
        {
            endCallback(null);
            return;
        }
    }
    else
    {
        if (currentIndex < to)
        {
            endCallback(null);
            return;
        }
    }

    callback(array[currentIndex], function (err)
    {
        if (err)
        {
            endCallback(err);
            return;
        }

        loopRec(array, callback, endCallback, currentIndex + step, to, step);
    });
};

module.exports = asyncLoop;