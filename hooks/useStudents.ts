import { apiClient } from "@/lib/api/client";
import { CreateStudentInput } from "@/services/students.service";
import { Student } from "@/types/student";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const useStudents = () => {
    return useQuery({
        queryKey: ["students"],
        queryFn: () => apiClient<Student[]>("api/students"),
        staleTime:  1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: false,

    })
}

const useNewsById = (id: number)=>{
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => apiClient<Student>(`api/students/${id}`),
        staleTime:  1000 * 60 * 60 * 24, // 24 hours
        enabled: !!id,

    })
}

const useCreateStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (student: Partial<Student>)=> apiClient<Student>("api/students", {
            method: "POST",
            body: JSON.stringify(student),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        }
    })
}

const useCreateManyStudents = () => {
    const queryClient = useQueryClient();  
    return useMutation({
        mutationFn: (students: Partial<Student>[])=> apiClient<Student[]>("api/students/batch", {
            method: "POST",
            body: JSON.stringify({ students }),
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        }
    })
}

const useUpdateStudent = (id: number) => {
    const queryClient = useQueryClient();  
    return useMutation({
        mutationFn: (student: Partial<Student>)=> apiClient<Student>(`api/students${id}`, {
            method: "PUT",
            body: JSON.stringify(student),
        }), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["students", id] });
        }
    })
}

const useDeleteStudent = (id: number) => {
    const queryClient = useQueryClient();   
    return useMutation({
        mutationFn: ()=> apiClient<Student>(`api/students${id}`, {
            method: "DELETE",
        }), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });

        }
    })
}

export { useStudents, useCreateStudent, useNewsById };

