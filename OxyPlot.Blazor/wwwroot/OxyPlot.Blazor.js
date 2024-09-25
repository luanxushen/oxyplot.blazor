// OxyPlot.Blazor Client Side Interop
export function getBoundingClientRect(e) {
    if (e == null)
        return [0, 0, 0, 0];
    const r = e.getBoundingClientRect();
    if (r == null)
        return [0, 0, 0, 0];
    // might return null in some cases for some values, which causes deserialization problems
    // in blazor to double.json 
    // https://github.com/belucha/oxyplot.blazor/issues/3
    // see https://developer.mozilla.org/de/docs/Web/API/Element/getBoundingClientRect
    // System.InvalidOperationException: Cannot get the value of a token type 'Null' as a number.
    return [r.x ?? 0, r.y ?? 0, r.width ?? 0, r.height ?? 0];
}
export function getMousePos(e) {
    const r = e.getBoundingClientRect();
    return [cursor_x - r.x, cursor_y - r.y];
}

export function disableContextMenu(element) {
    if (element == null)
    {
        console.warn("element is null for addEventListener");
        return;
    }
    if (typeof (element.addEventListener) !== 'function') {
        return;
    }
    element.addEventListener('contextmenu', ev => {
        ev.preventDefault();
        return false;
    }
    );
}

export function setCursor(element, cursorName) {
    element.style.cursor = cursorName;
}

export function registerMove(obj, element, method) {
    if (element == null) {
        console.warn("element is null for addEventListener");
        return;
    }
    if (typeof (element.addEventListener) !== 'function') {
        return;
    }
    element.addEventListener('mousemove', event => {
        const cursor_x = event.pageX;
        const cursor_y = event.pageY;
        obj.invokeMethodAsync(method, [cursor_x, cursor_y]);
    }
    );
}

export function registerTouch(obj, element, method) {
    if (element == null) {
        console.warn("element is null for addEventListener");
        return;
    }
    if (typeof (element.addEventListener) !== 'function') {
        return;
    }
    element.addEventListener('touchmove', event => {
        event.preventDefault();
        const ts = event.touches;
        var touches = [];
        for (var index = 0; index < ts.length; index++) {
            var t = ts[index];
            touches.push({
                clientX: t.clientX,
                clientY: t.clientY,
                pageX: t.pageX,
                pageY: t.pageY,
                screenX: t.screenX,
                screenY: t.screenY
            })
        }
        obj.invokeMethodAsync(method, touches);
    }
    );
}