import { getAllBlog } from '@/lib/api';
import { IAuthor } from '@/types/global';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogsPage() {
  const blogs = getAllBlog();
  const [latestBlog, ...restBlogs] = blogs;

  const formatDate = (date: string, format: 'sm' | 'md' | 'lg' = 'md') => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: format === 'sm' ? 'short' : 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const latestBlogAuthor = latestBlog.author as IAuthor;

  return (
    <main className="container mx-auto px-5 py-8 max-w-6xl">
      {/* Featured Post */}
      <div className="mb-16 bg-white rounded-lg shadow-sm shadow-gray-100 p-2 hover:shadow-md hover:shadow-gray-200 transition-shadow duration-300">
        <Link href={`/blogs/${latestBlog.slug}`} data-umami-event="featured-blog-click">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="m-auto">
              <Image
                src={latestBlog.coverImage}
                alt={latestBlog.title}
                width={1500}
                height={1000}
                className="rounded-lg"
              />
            </div>
            <div className="py-4">
              <div className="mb-4">
                <span className="inline-block bg-purple-50 text-purple-700 px-4 py-1 rounded-full text-sm">
                  {latestBlog.tags[0]}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-5 text-gray-900">
                {latestBlog.title}
              </h1>
              <p className="text-gray-600 mb-5 text-base">
                {latestBlog.excerpt}
              </p>
              <div className="flex items-center">
                <Image
                  src={latestBlogAuthor.picture}
                  alt={latestBlogAuthor.name}
                  width={24}
                  height={24}
                  className="rounded-full mr-3"
                />
                <span className="text-gray-700 text-sm mr-1">
                  {latestBlogAuthor.name}
                </span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-500 text-sm">
                  {formatDate(latestBlog.date)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {restBlogs.map(blog => {
          const blogAuthor = blog.author as IAuthor;
          return (
            <div
              key={blog.slug}
              className="bg-white mb-8 rounded-lg shadow-sm shadow-gray-100 p-2 hover:shadow-md hover:shadow-gray-200 transition-shadow duration-300"
            >
              <Link href={`/blogs/${blog.slug}`} data-umami-event="blog-post-click" data-umami-event-blog-title={blog.title}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="m-auto size-48">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                  <div className="px-1 pb-6">
                    <div className="mb-3">
                      <span className="inline-block bg-purple-50 text-purple-700 px-4 py-1 rounded-full text-sm">
                        {blog.tags[0]}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">
                      {blog.title}
                    </h2>
                    <div className="flex items-center">
                      <span className="text-gray-700 text-sm">
                        By {blogAuthor.name}
                      </span>
                      <span className="text-gray-400 mx-2">·</span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(blog.date, 'sm')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
