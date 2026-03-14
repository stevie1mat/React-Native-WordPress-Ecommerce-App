export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
