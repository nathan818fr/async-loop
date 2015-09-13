var asyncLoop = function (array)
{
    var callbackPos = 1;
    while (callbackPos < 3)
    {
        if (typeof arguments[callbackPos] === 'function')
            break;
        callbackPos++;
    }

    var from = (callbackPos >= 2) ? arguments[1] : 0;
    var to = (callbackPos >= 3) ? arguments[2] : ((from >= 0) ? array.length - 1 : 0);
    var callback = arguments[callbackPos];
    var endCallback = arguments[callbackPos + 1];

    if (from < 0)
        from = array.length + from;
    if (to < 0)
        to = array.length + to;
    var step = (from > to) ? -1 : 1;

    loopRec(array, callback, endCallback, from, to, step);
};

var loopRec = function (array, callback, endCallback, currentIndex, to, step)
{
    if (step > 0)
    {
        if (currentIndex > to)
        {
            if (endCallback)
                endCallback(null);
            return;
        }
    }
    else
    {
        if (currentIndex < to)
        {
            if (endCallback)
                endCallback(null);
            return;
        }
    }

    callback(array[currentIndex], function (err)
    {
        if (err)
        {
            if (endCallback)
                endCallback(err);
            return;
        }

        loopRec(array, callback, endCallback, currentIndex + step, to, step);
    });
};

module.exports = asyncLoop;