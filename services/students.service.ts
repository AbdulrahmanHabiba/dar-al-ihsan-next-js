import { ApiError } from "@/lib/api/error";
import { prisma } from "@/lib/db";
import { Gender } from "@prisma/client";
export interface CreateStudentInput {
    name: string;
    age?: number;
    gender?: Gender;
    phone?: string;
    moreInfo?: string;
    achievement?: string;
    image?: string;
    teacherId?: number;
    groupId?: number;
}
async function getAllStudents(){
    try{
        return await prisma.student.findMany({
            orderBy: { name: "asc" },
            include: {
                teacher: {
                    select: { 
                        name: true,
                    }
                },
                group: {
                    select: {
                        name: true,
                        time: true,
                        moreInfo: true,
                    }
                }
            },  
        })
    }
    catch(error){
        throw ApiError.internal("Failed to fetch students");
    }
}

async function getStudentById(id: number){
    if (!id || isNaN(id) || id <= 0) {
        throw ApiError.badRequest("Invalid student id");
    }
    try{
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                teacher: {
                    select: { 
                        name: true,
                    }
                },
                group: {
                    select: {
                        name: true,
                        time: true,
                        moreInfo: true,
                    }
                }
            },  
        });
        if(!student){
            throw ApiError.notFound(`Student with ID ${id} not found`);
        }
        return student;
    }
    catch(error){
        if (error instanceof ApiError) {
            throw error;
        }
        throw ApiError.internal("Failed to fetch student");
    }
}


async function createStudent(data: CreateStudentInput) {
    await createValidation(data);

    try {
        const newStudent = await prisma.student.create({
            data: {
                name: data.name,
                age: data.age,
                gender: data.gender,
                phone: data.phone,
                moreInfo: data.moreInfo,
                achievement: data.achievement,
                image: data.image,
                teacher: data.teacherId ? { connect: { id: data.teacherId } } : undefined,
                group: data.groupId ? { connect: { id: data.groupId } } : undefined,
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                group: {
                    select: {
                        id: true,
                        name: true,
                        time: true,
                        moreInfo: true,
                    }
                }
            }
        });

        return newStudent;
    } catch (error) {
        console.error("Error creating student:", error);
        throw ApiError.internal("Failed to create student");
    }
}

async function createManyStudents(data: CreateStudentInput[]) {
    if (!Array.isArray(data) || data.length === 0) {
      throw ApiError.badRequest("Students array is required");
    }
  
    // Validate each student with index
    await Promise.all(
      data.map((student, index) =>
        createValidation(student).catch(() => {
          throw ApiError.badRequest(`Invalid student at index ${index}`);
        })
      )
    );
  
    try {
      const students = await prisma.$transaction(
        data.map((student) =>
          prisma.student.create({
            data: {
              name: student.name,
              age: student.age,
              gender: student.gender,
              phone: student.phone,
              moreInfo: student.moreInfo,
              achievement: student.achievement,
              image: student.image,
              teacher: student.teacherId ? { connect: { id: student.teacherId } } : undefined,
              group: student.groupId ? { connect: { id: student.groupId } } : undefined,
            },
          })
        )
      );
  
      return {
        count: students.length,
        students,
      };
    } catch (error) {
      console.error(error);
      throw ApiError.internal("Failed to create students batch");
    }
  }
  

async function updateStudent(id: number, data: Partial<CreateStudentInput>) {
    if (!id || isNaN(id) || id <= 0) {
        throw ApiError.badRequest("Invalid student id");
    }

    try {
        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                name: data.name,
                age: data.age,
                gender: data.gender,
                phone: data.phone,
                moreInfo: data.moreInfo,
                achievement: data.achievement,
                image: data.image,
                teacher: data.teacherId ? { connect: { id: data.teacherId } } : (data.teacherId === null ? { disconnect: true } : undefined),
                group: data.groupId ? { connect: { id: data.groupId } } : (data.groupId === null ? { disconnect: true } : undefined),
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                group: {
                    select: {
                        id: true,
                        name: true,
                        time: true,
                        moreInfo: true,
                    }
                }
            }
        });

        return updatedStudent;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error("Error updating student:", error);
        throw ApiError.internal("Failed to update student");
    }      

}
async function deleteStudent(id: number) {
    if (!id || isNaN(id) || id <= 0) {
        throw ApiError.badRequest("Invalid student id");
    }
    try {
        await prisma.student.delete({
            where: { id },
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error("Error deleting student:", error);
        throw ApiError.internal("Failed to delete student");
    }
}
export {
    getAllStudents,
    getStudentById,
    createStudent,
    createManyStudents,
    updateStudent,
    deleteStudent,
};





// Validation function for both create and update
async function createValidation(data: CreateStudentInput | Partial<CreateStudentInput>) {    
    if (!data.name || data.name.trim() === "") {
        throw ApiError.badRequest("Name is required");
    }

    if (data.teacherId) {
        const teacher = await prisma.teacher.findUnique({
            where: { id: data.teacherId }
        });
        if (!teacher) {
            throw ApiError.notFound(`Teacher with ID ${data.teacherId} not found`);
        }
    }

    if (data.groupId) {
        const group = await prisma.group.findUnique({
            where: { id: data.groupId }
        });
        if (!group) {
            throw ApiError.notFound(`Group with ID ${data.groupId} not found`);
        }
    }
}