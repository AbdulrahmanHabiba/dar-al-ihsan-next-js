import { handleApi } from "@/lib/api/handler";
import { createComplaint, getAllComplaints } from "@/services/complaint.service";
import { NextRequest } from "next/server";

export const GET = handleApi(async () => {
  return await getAllComplaints();
});

export const POST = handleApi(async (req: NextRequest) => {
  const body = await req.json();
  return await createComplaint(body);
});


