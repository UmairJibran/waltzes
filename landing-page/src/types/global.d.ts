export interface IAuthor {
    name: string;
    picture: string;
    bio: string;
};

export interface IBLog {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    author: string | IAuthor;
    excerpt: string;
    ogImage: {
        url: string;
    };
    content: string;
    preview?: boolean;
    tags: string[];
};