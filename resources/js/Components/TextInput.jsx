import React, { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                `rounded-lg bg-slate-700 text-slate-200 border-slate-600 focus:border-blue-500 focus:ring-blue-500 shadow-sm ` +
                className
            }
            ref={input}
        />
    );
});
