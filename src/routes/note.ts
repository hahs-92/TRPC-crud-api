import { z } from "zod";
import NoteModel from "../models/note.model";

import { publicProcedure, router } from "../trpc";

const getNotes = publicProcedure.query(async () => {
  const notes = await NoteModel.find();
  return notes;
});

const createNote = publicProcedure
  .input(z.object({ title: z.string(), description: z.string() })) // validaciones
  .mutation(async ({ input }) => {
    const newNote = new NoteModel({
      title: input.title,
      description: input.description,
      done: false,
    });

    const savedNote = await newNote.save();
    return savedNote;
  });

const deleteNote = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    // throw new Error("Custom error");
    const noteFound = await NoteModel.findByIdAndDelete(input);

    if (!noteFound) throw new Error("Note Not Found");

    return true;
  });

const toggleDone = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    try {
      const foundNote = await NoteModel.findById(input);
      if (!foundNote) throw new Error("Note Not Found!");
      foundNote.done = !foundNote.done;
      await foundNote.save();

      return true;
    } catch (error) {
      return false;
    }
  });

export const notesRouter = router({
  get: getNotes,
  create: createNote,
  delete: deleteNote,
  toggleDone,
});
