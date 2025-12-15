export interface Student{
    id: number;
    name: string;
    age: number | null;
    teacherId: number | null;
    groupId: number | null;
    createdAt: string;
    updatedAt: string;
    teacher?: {
        name: string;
    };
    group?: {
        name: string | null;
        time: string | null;
        moreInfo: string | null;
    };
}

export interface CreateStudentDTO{
    name: string;
    age?: number;
    teacherId?: number;
    groupId?: number;
}

