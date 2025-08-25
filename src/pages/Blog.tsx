import { ArrowUpRight } from "lucide-react";
import PageHeader from "../shared/PageHeader";
import BlogHeader from "../components/Blog/BlogHeader";
import { blogs } from "../data";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const handleReadMore = (blog: any) => {
    (navigate(`/dashboard/blog/${blog.id}`),
      window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  return (
    <div>
      <PageHeader
        title="Blogs"
        sub="View and Create Blog Posts"
        buttonText="Create New Blog"
      />
      {/*  */}
      <div className="px-2 xs:px-6 2xs:px-8 sm:px-8   py-4 mt-28">
        {/* <Breadcrumbs /> */}
        {blogs.length > 0 && <BlogHeader blogs={blogs} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 mx-auto">
          {blogs.map((blog, i) => (
            <div
              key={i}
              className="group p-2 hover:bg-white w-full flex flex-col gap-4 rounded-2xl shadow-lg hover:-translate-y-2.5 duration-500 transition-all"
            >
              <div className="h-62 w-full">
                <img
                  src={blog.img}
                  alt={blog.heading}
                  className="rounded-2xl object-top object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col flex-1 px-1 py- pb-6">
                <div className="flex gap-3 mb-4">
                  <div className="bg-primary h-full w-1.5"></div>
                  <h2 className="text-xl font-semibold text-[#1D1D1D]">
                    {blog.heading?.slice(0, 40)}...
                  </h2>
                </div>
                <p className="text-gray-400 text-[14px] font-normal pb-6">
                  {blog.paragraph.slice(0, 78)}...
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-[#717171] text-xs">{blog.createdAt}</p>
                  <div
                    className="transition-all duration-700 ease-in-out text-primary flex items-center gap-1 hover:gap-2 cursor-pointer"
                    onClick={() => handleReadMore(blog)}
                  >
                    <p className="text-xs font-semibold">Read post</p>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
