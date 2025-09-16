import { useState } from "react";
import PageHeader from "../../shared/PageHeader";
import CreateAnnouncement from "./CreateAnnouncement";
import {
  deleteAnnouncementsQuery,
  getAnnouncementsQuery,
} from "../../hooks/queryOptions";
import { useInfiniteQuery } from "@tanstack/react-query";
import Button from "../ui/Button";
import {
  Loader2,
  Trash2,
  Calendar,
  User,
  AlertCircle,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useRole } from "../../lib/utils";

const AnnouncementPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(getAnnouncementsQuery());

  const { mutate: deleteAnnouncement } = deleteAnnouncementsQuery();

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteAnnouncement(id);
    } finally {
      setDeletingId(null);
    }
  };

  const role = useRole();
  const announcements = data?.pages.flatMap((page) => page.data.announcements);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-green-500 bg-green-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const getPriorityBadge = (priority?: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
      default: "bg-blue-100 text-blue-800 border-blue-200",
    };

    const color =
      colors[priority?.toLowerCase() as keyof typeof colors] || colors.default;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}
      >
        {priority || "Normal"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Announcements"
          buttonText="Create Announcement"
          buttonClick={() => setOpenModal(true)}
        />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 space-y-6">
      <PageHeader
        title="Announcements"
        buttonText="Create Announcement"
        buttonClick={() => setOpenModal(true)}
      />

      {/* Stats Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {announcements?.length || 0}
              </div>
              <div className="text-sm text-gray-500">Total Announcements</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {announcements?.filter(
                  (a) =>
                    new Date(a.created_at) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length || 0}
              </div>
              <div className="text-sm text-gray-500">This Week</div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      {announcements && announcements.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${getPriorityColor(announcement.priority)}`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {announcement.title}
                    </h2>
                    {announcement.priority &&
                      getPriorityBadge(announcement.priority)}
                  </div>
                  {role !== "student" && (
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      disabled={deletingId === announcement.id}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      title="Delete announcement"
                    >
                      {deletingId === announcement.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Content Preview */}
                <div className="text-gray-700 mb-4 line-clamp-3">
                  {announcement.subject}
                </div>

                {/* Author and Date */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{`${announcement.createdBy.first_name} ${announcement.createdBy.last_name}`}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(announcement.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No announcements yet
          </h3>
          <p className="text-gray-500 mb-6">
            Be the first to create an announcement for your school community.
          </p>
          {role !== "student" && (
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Create First Announcement
            </Button>
          )}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="bg-brand-500 border border-gray-300 text-gray-700  px-8 py-3 rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              <div className="flex items-center">
                Load more announcements
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            )}
          </Button>
        </div>
      )}

      {/* Create Announcement Modal */}
      {openModal && (
        <CreateAnnouncement openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default AnnouncementPage;
