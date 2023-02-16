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

export const notesRouter = router({
  get: getNotes,
  create: createNote,
});
