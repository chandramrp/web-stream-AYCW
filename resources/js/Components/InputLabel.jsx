import React from "react";

export default function InputLabel({
    value,
    htmlFor,
    className = "",
    children,
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block font-medium text-sm text-slate-300 ` + className}
        >
            {value ? value : children}
        </label>
    );
}
