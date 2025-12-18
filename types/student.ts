export interface Student {
    id: number;
    name: string;
    age: number | null;
    gender?: "MALE" | "FEMALE" | null;
    phone: string | null;
    moreInfo: string | null;
    achievement: string | null;
    image: string | null;
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

export interface CreateStudentDTO {
    name: string;
    age?: number;
    gender?: "MALE" | "FEMALE";
    phone?: string;
    moreInfo?: string;
    achievement?: string;
    image?: string;
    teacherId?: number;
    groupId?: number;
}
