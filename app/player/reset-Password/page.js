export default function PlayerResetPassword() {
  return <h1>Player Reset Password Page</h1>;
}



// import { mutation } from "../_generated/server";
// import bcrypt from "bcryptjs";

// export const playerResetPassword = mutation(async ({ db }, data) => {
//   const { phone, securityAnswer, newPassword } = data;

//   const player = await db
//     .query("players")
//     .withIndex("by_phone", (q) => q.eq("phone", phone))
//     .unique();

//   if (!player) {
//     throw new Error("Player not found");
//   }

//   if (player.securityAnswer !== securityAnswer) {
//     throw new Error("Incorrect security answer");
//   }

//   const hashed = await bcrypt.hash(newPassword, 10);

//   await db.patch(player._id, { password: hashed });

//   return { success: true };
// });
