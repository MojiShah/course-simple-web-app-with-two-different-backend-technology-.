import fs from "node:fs/promises";
import path from "node:path";

const dbPath = path.join(process.cwd(), "db.json");

export interface ICourse {
    id: string,
    title: string,
    description: string,
    price: number,
    students: number,
    img: string
};

interface IDatabase {
    courses: ICourse[]
};

export async function readDb(): Promise<IDatabase> {
    const data = await fs.readFile(dbPath,'utf-8');
    return JSON.parse(data);
}

export async function writeDb(data:IDatabase) {
    await fs.writeFile(dbPath,JSON.stringify(data,null,2),'utf-8');
}
