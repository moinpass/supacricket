
export default function PlayerRegister() {
  return <h1>Player Register Page</h1>;
}



// import { mutation } from "../_generated/server";
// import bcrypt from "bcryptjs";

// export const playerRegister = mutation(async ({ db }, data) => {
//   const { email, phone, password } = data;

//   const existing = await db
//     .query("players")
//     .withIndex("by_email", (q) => q.eq("email", email))
//     .unique();

//   if (existing) {
//     throw new Error("Player already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await db.insert("players", {
//     ...data,
//     password: hashedPassword,
//   });

//   return { success: true };
// });
