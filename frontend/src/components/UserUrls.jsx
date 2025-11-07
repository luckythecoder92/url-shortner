import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axiosInstance from "../utils/axiosInstance";
import { getUserUrls } from "../apis/user.api";

// API function for fetching URLs
const fetchUserUrls = async () => {
  const response = await axiosInstance.get("/api/urls/user");
  return response.data;
};

const UserUrls = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  // Using React Query for data fetching
  const {
    data: urls ,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getUserUrls,
    staleTime: 0 // Consider data fresh for 0 minutes
  });

  // Fetch user's URLs when component mounts
  const handleCopy = async (shortUrl, id) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUrlClick = (shortUrl) => {
    // Track click through your API
    axiosInstance
      .post(`/api/urls/${shortUrl}/click`)
      .then(() => {
        refetch(); // Refetch URLs to update click count
      })
      .catch((err) => {
        console.error("Error tracking click:", err);
      });
  };

  if (isLoading) {
    return (
      <div className="mt-8 text-center text-gray-600">
        <div
          className="animate-spin inline-block w-6 h-6 border-4 border-current border-t-transparent rounded-full"
          aria-hidden="true"
        ></div>
        <p className="mt-2">Loading your URLs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8">
        <div className="text-center text-red-600 mb-4">
          <p>{error.message || "Failed to load URLs"}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="mx-auto block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  // console.log(urls)

  if (!urls.urls.length) {
    return (
      <div className="mt-8 text-center text-gray-500">
        <p>You haven't created any short URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your URLs</h2>
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          title="Refresh URLs"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="max-w-xs truncate" title={url.full_url}>
                      {url.full_url}
                    </div>
                    <a
                      href={url.full_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <a
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                    onClick={() => handleUrlClick(url.short_url)}
                  >
                    {url.short_url}
                  </a>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {url.clicks}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() =>
                      handleCopy(
                        `http://localhost:3000/${url.short_url}`,
                        url._id
                      )
                    }
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      ${
                        copiedId === url._id
                          ? "bg-green-500 text-white"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                  >
                    {copiedId === url._id ? "Copied!" : "Copy"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrls;
