export interface News {
    id: number;
    title: string;
    description: string | null;
    images: string[];
    videoUrl: string | null;
    publisher: string | null;
    published: boolean;
    likes: number;
    link: string | null;
    linkTitle: string | null;
    createdAt: string;
    updatedAt: string;
  }