import type { IAuthor, IBLog } from '@/types/global';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const blogsDirectory = join(process.cwd(), '_blogs');

export function getBlogSlugs() {
  try {
    return fs.readdirSync(blogsDirectory);
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
}

export function getBlogBySlug(slug: string): IBLog | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(blogsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const author = data.author as string;
    const authorSlug = author.toLowerCase().replace(/\s+/g, '-');
    const authorPath = join(process.cwd(), '_authors', `${authorSlug}.md`);
    const authorFileContents = fs.readFileSync(authorPath, 'utf8');
    const { data: authorData } = matter(authorFileContents);

    return {
      ...data,
      slug: realSlug,
      content,
      author: { ...authorData, slug: authorSlug } as unknown as IAuthor,
    } as IBLog;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export function getAllBlog(): IBLog[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map(slug => getBlogBySlug(slug))
    .filter(blog => blog !== null) as IBLog[];
  const sortedBlogs = blogs.sort((blog1, blog2) =>
    blog1.date > blog2.date ? -1 : 1
  );

  return sortedBlogs.map(blog => ({ ...blog }));
}
