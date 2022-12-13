import { Magic } from 'magic-sdk';

//export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY); // ✨  pk_live_7902DAF819D7B9EB
const createMagic = () => {
    return (
        typeof window !== "undefined" && new Magic("pk_live_7902DAF819D7B9EB")
    ); // ✨
};

export const magic = createMagic();

console.log("magic setup", magic);