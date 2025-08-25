import { useParams, useNavigate } from "react-router-dom";
// import Breadcrumbs from "../components/shared/Breadcrumbs";
// import { BlogContext } from "../context/BlogContext";
import {
  Facebook,
  Twitter,
  Instagram,
  TicketsIcon,
  Linkedin,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { blogs } from "../data";
import PageHeader from "../shared/PageHeader";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog using the ID
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <p className="text-center text-gray-500 text-xl mt-20">Blog not found</p>
    );
  }

  // Function to handle social sharing
  const handleShare = (platform: any) => {
    const url = window.location.href;
    const title = blog.heading;
    let shareUrl;

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "instagram":
        shareUrl = `https://instagram.com/`;
        break;
      case "tiktok":
        shareUrl = `https://www.tiktok.com/`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };
  if (!id) return <h1>...</h1>;

  // Find the index of the current blog
  const currentBlogIndex = blogs?.findIndex((b) => b.id === Number(id));
  const nextBlog = blogs[(currentBlogIndex + 1) % blogs.length];

  // Handle navigation to the next blog
  const handleNextBlog = () => {
    navigate(`/dashboard/blog/${nextBlog.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className=" px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
      <PageHeader title="blogs" />
      <div className=" max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">{/* <Breadcrumbs /> */}</div>

        {/* Blog Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-xl md:text-4xl xl:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            {blog.heading}
          </h1>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <span>{blog.createdAt}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full max-w-7xl mx-auto h-64 sm:h-96 md:h-[30rem] lg:h-[40rem] mb-12 rounded-xl overflow-hidden shadow-xl">
          <img
            src={blog.img}
            alt={blog.heading}
            className="w-full h-full object-cover object-top transition-transform hover:scale-105 duration-700"
          />
        </div>

        {/* Social Sharing */}
        <div className="flex justify-center mb-12 relative">
          <p className="absolute -top-4 text-support text-xs font-semibold">
            Share blog
          </p>
          <div className="bg-white rounded-full shadow-md px-6 py-3 flex space-x-6">
            <button onClick={() => handleShare("twitter")}>
              <Twitter size={20} />
            </button>
            <button onClick={() => handleShare("facebook")}>
              <Facebook size={20} />
            </button>
            <button onClick={() => handleShare("instagram")}>
              <Instagram size={20} />
            </button>
            <button onClick={() => handleShare("tiktok")}>
              <TicketsIcon size={20} />
            </button>
            <button onClick={() => handleShare("linkedin")}>
              <Linkedin size={20} />
            </button>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 mb-12">
          <p className="text-gray-700 leading-relaxed">{blog.paragraph}</p>
          {/* {blog.additionalContent && (
            <div className="mt-8">{blog.additionalContent}</div>
          )} */}
        </div>

        {/* Next Blog Button */}
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            onClick={handleNextBlog}
            className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl"
          >
            Next Blog Post <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
