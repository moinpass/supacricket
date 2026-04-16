import { query } from "../_generated/server";
import bcrypt from "bcryptjs";

export const playerLogin = query(async ({ db }, { email, password }) => {
  const player = await db
    .query("players")
    .withIndex("by_email", (q) => q.eq("email", email))
    .unique();

  if (!player) {
    throw new Error("Player not found");
  }

  const match = await bcrypt.compare(password, player.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return { success: true, playerId: player._id };
});
