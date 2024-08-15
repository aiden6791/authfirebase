import { useEffect } from "react";

export function doTitle(name: string) {
    useEffect(() => {
        document.title = name;
    })
}
