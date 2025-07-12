import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseContent = () => {
  const { id } = useParams(); // course ID from URL
  const token = useSelector((state) => state.auth.token);
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [contents, setContents] = useState([]);
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [showAddContentModal, setShowAddContentModal] = useState(false);
const [newContentType, setNewContentType] = useState("HEADING");
const [newContentText, setNewContentText] = useState("");
const [showEditModuleModal, setShowEditModuleModal] = useState(false);
const [editingModule, setEditingModule] = useState(null);
const [editModuleTitle, setEditModuleTitle] = useState("");
const [editModuleDesc, setEditModuleDesc] = useState("");
const [selectedCourseId, setSelectedCourseId] = useState(null);
const [showEditContentModal, setShowEditContentModal] = useState(false);
const [editingContent, setEditingContent] = useState(null);
const [editContentType, setEditContentType] = useState("");
const [editContentValue, setEditContentValue] = useState("");
const [editContentText, setEditContentText] = useState("");




  const role = useSelector((state) => state.auth.role);


  const fetchModules = async () => {
    try {
      const res = await fetch(`https://codora.onrender.com/courses/${id}/modules`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch modules");
      }

      const data = await res.json();
      setModules(data);
      if (data.length > 0) setSelectedModuleId(data[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    

    if (token && id) {
      fetchModules();
    }
  }, [id, token]);

  const handleAddModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
  
    try {
      const res = await fetch("https://codora.onrender.com/courses/modules/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: parseInt(id),
          title: newModuleTitle.trim(),
        }),
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to add module");
      }
  
      setShowAddModule(false);
      setNewModuleTitle("");
      fetchModules();
    } catch (error) {
      console.error("Error adding module:", error);
      alert("Failed to add module");
    }
  };


  const fetchContents = async () => {
    try {
      const res = await fetch(
        `https://codora.onrender.com/courses/modules/${selectedModuleId}/contents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch contents");
      }

      const data = await res.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };
  

  useEffect(() => {
    
  
    if (selectedModuleId) {
      fetchContents();
    }
  }, [selectedModuleId, token]);

  const handleDeleteModule = async (moduleId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this module?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`https://codora.onrender.com/courses/modules/${moduleId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to delete module");
      }
  
      // Refresh modules after deletion
      await fetchModules();
  
      // If deleted module was selected, reset selection
      if (selectedModuleId === moduleId) {
        setSelectedModuleId(null);
        setContents([]);
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module.");
    }
  };


  const handleAddContent = async (e) => {
    e.preventDefault();
    if (!selectedModuleId || !newContentText.trim()) return;
  
    try {
      const res = await fetch("https://codora.onrender.com/courses/contents/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleId: selectedModuleId,
          type: newContentType,
          content: newContentText.trim(),
        }),
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to add content");
      }
  
      setShowAddContentModal(false);
      setNewContentText("");
      setNewContentType("HEADING");
      fetchContents(); // refresh updated list
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content.");
    }
  };
  
  const handleDeleteContent = async (contentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`https://codora.onrender.com/courses/contents/${contentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to delete content");
      }
  
      fetchContents(); // Refresh list
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content");
    }
  };

  const handleUpdateModule = async (e) => {
    e.preventDefault();
    if (!editingModule) return;
  
    try {
      console.log(editingModule);
      const res = await fetch(`https://codora.onrender.com/courses/modules/${editingModule.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editModuleTitle,
          // description: editModuleDesc,
          orderIndex: editingModule.orderIndex,
        }),
      });
      console.log(res);
  
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to update module");
      }
  
      setShowEditModuleModal(false);
      setEditingModule(null);
      fetchModules(selectedCourseId); // refresh module list
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module");
    }
  };

  const handleUpdateContent = async (e) => {
  e.preventDefault();
  if (!editingContent || !selectedModuleId) return;

  try {
    const res = await fetch(`https://codora.onrender.com/courses/contents/${editingContent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: editContentType,
        content: editContentText,
        moduleId: selectedModuleId,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to update content");
    }

    setShowEditContentModal(false);
    setEditingContent(null);
    fetchContents(selectedModuleId); // Refresh content list
  } catch (error) {
    console.error("Error updating content:", error);
    alert("Failed to update content");
  }
};

  
  
  

  return (
    <div className="flex w-full h-auto">
    <div className="flex w-90/100 h-auto mx-auto mt-25 mb-7  rounded-3xl gap-2">
      {/* Sidebar */}
      <div className="w-64 p-4 h-full bg-gray-200 rounded-tl-3xl rounded-bl-3xl overflow-y-auto">
        {/* <h2 className="text-lg font-bold mb-4 text-center">Modules</h2> */}
        <ul className="space-y-2">
  {modules.map((mod) => (
    <li
      key={mod.id}
      className={`p-2 rounded cursor-pointer flex justify-between items-center ${
        selectedModuleId === mod.id ? "bg-blue-200 font-semibold" : "hover:bg-gray-200"
      }`}
      onClick={() => setSelectedModuleId(mod.id)}
    >
      <div className="flex justify-between items-center w-full ">
      <span className="text-sm  w-70/100 ">{mod.title}</span>
      {role === "ROLE_ADMIN" && (
  <button
    onClick={() => {
      setEditingModule(mod);
      setEditModuleTitle(mod.title);
      setEditModuleDesc(mod.description || "");
      setShowEditModuleModal(true);
    }}
    className=" rounded-full  bg-blue-100  "
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="size-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>
  </button>
)}

      {role === "ROLE_ADMIN" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent selecting the module when clicking delete
            handleDeleteModule(mod.id);
          }}
          className="rounded-full  bg-red-200 "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
</svg>
        </button>
      )}
      </div>
    
    </li>
  ))}
</ul>
{role === "ROLE_ADMIN" && (
  <div className="mb-4">
    <button
      onClick={() => setShowAddModule(true)}
      className="w-full  bg-blue-600 text-white py-1 px-2 mt-5 rounded hover:bg-blue-700"
    >
      + Add Module
    </button>

    {showAddModule && (
      <form onSubmit={handleAddModule} className="mt-2 space-y-2">
        <input
          type="text"
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          placeholder="Module Title"
          className="w-full border px-2 py-1 rounded text-sm"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => {
              setShowAddModule(false);
              setNewModuleTitle("");
            }}
            className="text-sm px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    )}

{showEditModuleModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Edit Module</h2>
      <form onSubmit={handleUpdateModule} className="space-y-4">
        <input
          type="text"
          value={editModuleTitle}
          onChange={(e) => setEditModuleTitle(e.target.value)}
          placeholder="Module Title"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          value={editModuleDesc}
          onChange={(e) => setEditModuleDesc(e.target.value)}
          placeholder="Description (optional)"
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowEditModuleModal(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    {showAddContentModal && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Content</h2>
      <form onSubmit={handleAddContent} className="space-y-4">
        <select
          value={newContentType}
          onChange={(e) => setNewContentType(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="HEADING">Heading</option>
          <option value="SUBHEADING">Subheading</option>
          <option value="TEXT">Text</option>
          <option value="CODE">Code</option>
        </select>
        <textarea
          value={newContentText}
          onChange={(e) => setNewContentText(e.target.value)}
          rows={5}
          placeholder="Enter content here..."
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowAddContentModal(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
)}

  </div>
)}


      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-200 pt-0" >
        {/* <h1 className="text-2xl font-bold mb-2 text-center mt-2 ">Module Content</h1> */}
        {/* Content Area */}
<div className="flex-1 overflow-y-auto pt-2">
  {contents.length === 0 ? (
    <p className="text-gray-500 text-center">No content available.</p>
  ) : (
    <div className="space-y-8 h-screen">
     {contents.map((item) => (
  <div key={item.id} className="relative w-full py-2 w-full  ">
    <div className="flex w-90/100 items-start  mx-auto ">
      <div className="w-95/100  mx-auto">
        {item.type === "HEADING" && <h2 className="text-3xl font-bold text-center">{item.content}</h2>}
        {item.type === "SUBHEADING" && <h3 className="text-lg font-bold ">{item.content}</h3>}
        {item.type === "TEXT" && <p className="text-base ">{item.content}</p>}
        {item.type === "CODE" && (
          <pre className="bg-gray-800 p-2 rounded-lg h-[500px] overflow-y-auto text-sm overflow-x-auto">
            <code className="text-white ">{item.content}</code>
          </pre>
        )}
      </div>
      {role === "ROLE_ADMIN" && (
  <button
  onClick={() => {
    setEditingContent(item); // ✅ Correct variable
    setEditContentText(item.content);
    setEditContentType(item.type);
    setShowEditContentModal(true);
  }}
  className="rounded-full p-2  bg-blue-100 hover:bg-blue-200 ">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="size-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>
</button>

)}
{role === "ROLE_ADMIN" && (
        <button
          onClick={() => handleDeleteContent(item.id)}
          className="rounded-full p-2  bg-red-100 hover:bg-red-200 "
        >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
</svg>
        </button>
      )}


      
    </div>
    {showEditContentModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Edit Content</h2>
      <form onSubmit={handleUpdateContent} className="space-y-4">
        <select
          value={editContentType}
          onChange={(e) => setEditContentType(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="HEADING">Heading</option>
          <option value="SUBHEADING">Subheading</option>
          <option value="TEXT">Text</option>
          <option value="CODE">Code</option>
        </select>
        <textarea
          value={editContentText}
          onChange={(e) => setEditContentText(e.target.value)}
          placeholder="Edit content"
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowEditContentModal(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

  </div>
))}

      

    </div>
  )}
</div>
{role === "ROLE_ADMIN" && selectedModuleId && (
  <button
    onClick={() => setShowAddContentModal(true)}
    className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-50"
  >
    + Add Content
  </button>
)}

      </div>
    </div>
    </div>
  );
};

export default CourseContent;
