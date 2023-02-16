import { publicProcedure, router } from "../trpc";

const getNotes = publicProcedure.query(() => {
  return [
    {
      id: 1,
      title: "Note 1",
      content: "content",
    },
  ];
});

export const notesRouter = router({
  get: getNotes,
});
