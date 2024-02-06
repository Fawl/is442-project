// import { NextApiRequest, NextApiResponse } from "next";
// import handler from "@/components/emails/sendApi";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     try {
//       // Call your email sending handler function
//       await handler("Hi",); // Adjust parameters if needed
//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// };