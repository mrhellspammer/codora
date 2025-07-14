import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../pages/css/Blog.css';
import '../pages/css/hamster.css';





const Courses = () => {
  const Base_url = import.meta.env.VITE_BASE_URL;

  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${Base_url}/courses/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCourses();
  }, [token]);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    if (formData.image) payload.append("image", formData.image);

    try {
      const res = await fetch(`${Base_url}/courses/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      if (!res.ok) throw new Error(await res.text());
      // save formdata.image to src/courseImages with formdata.title as filename
     

      setShowModal(false);
      setFormData({ title: "", description: "", image: null });
      await fetchCourses();
    } catch (error) {
      console.error(error);
      // alert("Error adding course");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const res = await fetch(`${Base_url}/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      const res = await fetch(`${Base_url}/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      setShowEditModal(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update course");
    }
  };

  return (
    <div className="p-20 w-full bg-gradient-to-br from-gray-100 to-slate-200 min-h-screen">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-6 text-center">
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">

    <div class="wheel"></div>
    <div class="hamster">
      <div class="hamster__body">
        <div class="hamster__head">
          <div class="hamster__ear"></div>
          <div class="hamster__eye"></div>
          <div class="hamster__nose"></div>
        </div>
        <div class="hamster__limb hamster__limb--fr"></div>
        <div class="hamster__limb hamster__limb--fl"></div>
        <div class="hamster__limb hamster__limb--br"></div>
        <div class="hamster__limb hamster__limb--bl"></div>
        <div class="hamster__tail"></div>
      </div>
    </div>
    
    <div class="spoke"></div>

  </div>
  <div className="text-xl font-semibold text-gray-800"> Loading Courses </div>
    <p className="text-sm text-gray-500">Hang tight while we bring you some great content</p>
</div>
         
      ) : (
        <>
          {/* Top bar */}
          <div className="flex flex-wrap justify-between items-center mb-6 bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold">My Courses</h1>
            <div className="flex gap-4 flex-wrap justify-end w-full sm:w-auto mt-4 sm:mt-0">
              <input
                type="text"
                placeholder="Search"
                className="w-64 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {role === 'ROLE_ADMIN' && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  + Add New Course
                </button>
              )}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-4 transition hover:shadow-2xl"
              >
                <img
                  src={course.imagePath}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800 text-center truncate">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 h-20 overflow-hidden">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mt-4 gap-3">
                  {/* View Button */}
                  <button
                    className="relative overflow-hidden flex-1 h-10 rounded-full bg-blue-200 text-black font-medium group"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <span className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0" />
                    <span className="relative z-10 group-hover:text-white transition duration-300">View</span>
                  </button>

                  {/* Edit/Delete for Admin */}
                  {role === 'ROLE_ADMIN' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingCourse(course);
                          setEditTitle(course.title);
                          setEditDescription(course.description);
                          setShowEditModal(true);
                        }}
                        className="relative overflow-hidden rounded-full p-2 bg-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6 hover:animate-wiggle">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteCourse(course.id);
                        }}
                        className="relative overflow-hidden rounded-full p-2 bg-red-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6 hover:animate-wiggle">
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Course Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/20 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                <form onSubmit={handleAddCourse} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded"
                  />
                  <textarea
                    name="description"
                    placeholder="Course Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 rounded"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Add Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Course Modal */}
          {showEditModal && (
            <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/20 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                <form onSubmit={handleUpdateCourse} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="border p-2 rounded"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImage(e.target.files[0])}
                    className="border p-2 rounded"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
