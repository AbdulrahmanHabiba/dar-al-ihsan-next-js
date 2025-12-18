import { handleApi } from "@/lib/api/handler";
import { deleteComplaint, markComplaintAsRead } from "@/services/complaint.service";

export const PUT = handleApi(async (req, { params }) => {
  const { id } = await params;
  return await markComplaintAsRead(Number(id));
});

export const DELETE = handleApi(async (req, { params }) => {
  const { id } = await params;
  return await deleteComplaint(Number(id));
});


