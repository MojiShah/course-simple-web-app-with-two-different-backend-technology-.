import type { Request, Response } from "express"
import { readDb, writeDb, type ICourse } from "../utils/db.js"
import { randomUUID } from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises"


export const getcourses = async (req: Request, res: Response) => {
    const db = await readDb();
    res.json(db.courses)
}

export const getCourseDetail = async (req: Request, res: Response) => {
    const db = await readDb();
    const course = db.courses.find(x => x.id === req.params.id);
    if (!course)
        return res.status(404).json({ message: 'course not found' });

    res.json(course);
}

export const createCourse = async (req: Request, res: Response) => {
    const db = await readDb();
    const { title, description, price } = req.body;
    if (!title || !description || !price)
        return res.status(400).json({ message: "title, description and price are required" });

    const newCourse: ICourse = {
        id: randomUUID(),
        title,
        description,
        price: Number(price),
        students: 0,
        img: req.file ? `/uploads/${req.file.filename}` : ""
    };
    db.courses.push(newCourse)
    await writeDb(db);
    res.status(201).json(newCourse)
}

export const updateCourse = async (req: Request, res: Response) => {
    const db = await readDb();
    const targetCourse = db.courses.find(x => x.id === req.params.id);
    if (!targetCourse)
        return res.status(404).json({ message: 'course not found' })

    const { title, description, price, students } = req.body;
    if (title !== undefined) targetCourse.title = title;
    if (description !== undefined) targetCourse.description = description;
    if (price !== undefined) targetCourse.price = Number(price);
    if (students !== undefined) targetCourse.students = Number(students);
    if (req.file)
        targetCourse.img = `/uploads/${req.file.filename}`;

    await writeDb(db);
    res.json(targetCourse)

}

export const deleteCourse = async (req: Request, res: Response) => {
    const db = await readDb();
    const index = db.courses.findIndex(x => x.id === req.params.id);
    if (index === -1)
        return res.status(404).json({ message: "Course not found" });
    const [deletedCourse] = db.courses.splice(index, 1);
    if (deletedCourse?.img) {
        const imagePath = path.join(process.cwd(), deletedCourse.img.replace("/uploads/", "uploads/"));
        try {
            await fs.unlink(imagePath);
        } catch {
            // image may already be deleted
        }
    }

    await writeDb(db);
    res.json({message: "Course deleted successfully"});
}