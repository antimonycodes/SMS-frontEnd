import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const BlogHeader = ({ blogs }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setIsTransitioning(true);

      // Set new index after transition begins
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);

      // Reset transition flag after animation completes
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Match this with your CSS transition duration

      return () => clearTimeout(transitionTimeout);
    }, 6000); // Slide every 6 seconds (allowing time for transitions)

    return () => clearInterval(interval);
  }, [blogs.length, currentIndex]);

  const handleReadMore = () => {
    navigate(`/blog/${blogs[currentIndex].id}`, {
      state: { blog: blogs[currentIndex] },
    });
  };

  return (
    <div className="relative rounded-3xl w-full h-[80vh] md:h-[120vh] overflow-hidden">
      {/* Current slide - Using direct image element with object-position:top */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isTransitioning ? "opacity-100" : "opacity-100"
        }`}
      >
        <img
          src={blogs[currentIndex].img}
          alt={blogs[currentIndex].heading}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Previous slide - Using direct image element with object-position:top */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-0"
        }`}
      >
        <img
          src={blogs[prevIndex].img}
          alt={blogs[prevIndex].heading}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content box with fade-in effect */}
      <div
        className={`absolute bottom-12 left-4 lg:left-24 bg-white w-[90%] lg:w-[40%] bg-opacity-75 p-6 rounded-2xl shadow-lg 
          transition-all duration-700 ease-in-out transform ${
            isTransitioning
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-black mb-4">
          {blogs[currentIndex].heading}
        </h1>
        <div
          className="mt-auto transition-all duration-500 ease-in-out text-primary flex items-center gap-1 cursor-pointer hover:gap-2"
          onClick={handleReadMore}
        >
          <p className="text-xs font-semibold">Read post</p>
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {blogs.map((blog: any) => (
          <div
            key={blog.id}
            className={`h-1 rounded-full transition-all duration-500 ${
              blog.id === currentIndex
                ? "w-8 bg-secondary"
                : "w-2 bg-white bg-opacity-50"
            } cursor-pointer`}
            onClick={() => {
              setPrevIndex(currentIndex);
              setCurrentIndex(blog.id);
              setIsTransitioning(true);
              setTimeout(() => setIsTransitioning(false), 700);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogHeader;
