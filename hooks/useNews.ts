
import { apiClient } from "@/lib/api/client";
import { News } from "@/types/news";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Get All News
const useNews = (initialData?: News[]) => {
    return useQuery({
    queryKey: ["news"],
    queryFn: () => apiClient<News[]>("/api/news"),
    initialData,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    refetchOnWindowFocus: false
    })
}

// Get Single News by ID
const useNewsById = (id: number, initialData?: News) => {
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => apiClient<News>(`/api/news/${id}`),
        initialData,
        enabled: !!id,
    })
}

// Increment/Decrement Likes with Optimistic Updates
const useUpdateLikes = (newsId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (delta: number) => apiClient<News>(`/api/news/${newsId}/likes`, {
            method: "POST",
            body: JSON.stringify({ delta }),
        }),
        // Optimistic Update
        onMutate: async (delta) => {
            // Cancel outgoing requests to avoid overwriting optimistic update
            await queryClient.cancelQueries({ queryKey: ["news", newsId] });
            await queryClient.cancelQueries({ queryKey: ["news"] });

            // Snapshot previous values
            const previousNews = queryClient.getQueryData<News>(["news", newsId]);
            const previousNewsList = queryClient.getQueryData<News[]>(["news"]);

            // Optimistically update single news
            if (previousNews) {
                queryClient.setQueryData<News>(["news", newsId], {
                    ...previousNews,
                    likes: Math.max(0, previousNews.likes + delta), // Ensure non-negative
                });
            }

            // Optimistically update news list
            if (previousNewsList) {
                queryClient.setQueryData<News[]>(
                    ["news"],
                    previousNewsList.map((news) =>
                        news.id === newsId
                            ? { ...news, likes: Math.max(0, news.likes + delta) }
                            : news
                    )
                );
            }

            return { previousNews, previousNewsList };
        },
        // Rollback on error
        onError: (err, delta, context) => {
            if (context?.previousNews) {
                queryClient.setQueryData(["news", newsId], context.previousNews);
            }
            if (context?.previousNewsList) {
                queryClient.setQueryData(["news"], context.previousNewsList);
            }
        },
        // Refetch on success to ensure consistency
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["news", newsId] });
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
    });
}



// Create News
 const useCreateNews = () => {
    const QueryClient = useQueryClient();
     return useMutation({
        mutationFn: (data: Partial<News>)=> apiClient<News>("/api/news" ,{
            method: "POST",
            body: JSON.stringify(data),
        }),
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ["news"] });
        }
     })

     }


// Upadte News
const useUpdateNews = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data: Partial<News>)=> apiClient(`/api/news/${id}` ,{
            method: "PUT",
            body: JSON.stringify(data)
        })
        ,onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["news", id ] });
            queryClient.invalidateQueries({ queryKey: ["news"] });
        }
    })
}

// Delete News
const useDeleteNews = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=> apiClient(`/api/news/${id}`, {
            method: "DELETE"})
        ,onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["news"] });
        }
    })
}

export { useNews, useNewsById, useCreateNews, useUpdateLikes, useUpdateNews, useDeleteNews };
