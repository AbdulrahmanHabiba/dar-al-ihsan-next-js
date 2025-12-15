import { handleApi } from '@/lib/api/handler';
import { deleteStudent, getStudentById, updateStudent } from '@/services/students.service';

export const GET = handleApi(async (req, { params }) => {
    const { id } = await params;
    return await getStudentById(Number(id));

});


export const PUT = handleApi(async (req, { params }) => {
    const { id } = await params; 
    const body = await req.json();
    return await updateStudent(Number(id), body);
  });
  
  export const DELETE = handleApi(async (req, { params }) => {
    const { id } = await params; 
    return await deleteStudent(Number(id));
  });