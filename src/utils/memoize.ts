const getKey = <F extends (...args: any[]) => any,>(func: F, ...args: Parameters<F>) => {
    return JSON.stringify([func.name || func.toString(), ...args]);
}

const cache = {} as Record<string, any>;

export const memoize = <F extends (...args: any[]) => any>(fn: F): (...args: Parameters<F>) => ReturnType<F> => {
    return (...args: Parameters<F>): ReturnType<F> => {
        const key = getKey(fn, ...args);
        if (key in cache) {
            return cache[key];
        }

        const res = fn(...args);
        cache[key] = res;
        return res;
    }
}
