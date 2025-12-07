export interface BlogPost {
    id: number;
    created_at: string;
    title: string;
    slug: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any; // EditorJS output
    author_id?: string;
    published: boolean;
    views: number;
    category: string;
    read_time: string;
    cover_image?: string;
}

export interface UserProfile {
    id: string;
    role: 'admin' | 'user';
    email: string;
}
