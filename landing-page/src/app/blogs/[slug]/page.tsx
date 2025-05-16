import { getBlogBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '@/styles/markdown-styles.module.css';
import { IAuthor } from '@/types/global';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(pageProps: PageProps) {
  const { slug } = await pageProps.params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} | Waltzes`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.ogImage.url }],
    },
  };
}

export default async function BlogPost(pageProps: PageProps) {
  const { slug } = await pageProps.params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Convert markdown to HTML
  const content = await markdownToHtml(blog.content);

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const author = blog.author as IAuthor;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="relative text-center mb-10 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-32">
        <div className="relative h-[60vh] mb-12">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="mb-3">
                <span className="inline-block bg-purple-50 text-purple-700 px-4 py-1 rounded-full text-sm">
                  {blog.tags[0]}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                {blog.title}
              </h1>
              <p className="text-gray-200 mb-8 text-md mx-auto max-w-2xl">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-center">
                <Image
                  src={author.picture}
                  alt={author.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-3 border-2 border-white"
                />
                <div className="flex flex-col items-start">
                  <span className="text-white">{author.name}</span>
                  <div className="flex items-center text-gray-200">
                    <span>{formattedDate}</span>
                    <span className="mx-2">•</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className={cn(styles.markdown, 'max-w-2xl mx-auto')}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* View All Posts Button */}
      <div className="text-center mb-16">
        <Link
          href="/blogs"
          className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          data-umami-event="blog-read-all"
        >
          Read all Blogs
        </Link>
      </div>

      {/* Author Bio */}
      <div className="border-t pt-12">
        <div className="flex justify-center gap-6">
          <Image
            src={author.picture}
            alt={author.name}
            width={100}
            height={100}
            className="rounded-full size-28 object-cover border border-gray-300 p-3"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
            <p className="text-gray-600 mb-4">{author.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
