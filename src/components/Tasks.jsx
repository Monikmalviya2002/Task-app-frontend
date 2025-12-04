import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import { addTask, removeTask } from "../utils/taskSlice";


      const BASE_URL = "https://task-app-backend-1-g5hi.onrender.com/api";

         const Tasks = () => {
          const [tasks, setTasks] = useState([]);
         const [form, setForm] = useState({ title: "", description: "", status: "pending" });
         const [editing, setEditing] = useState(null);
       const [showModal, setShowModal] = useState(false);

      const dispatch = useDispatch();             
        
      const loadTasks = async () => {
       const res = await axios.get(`${BASE_URL}/tasks`, { withCredentials: true });
       setTasks(res.data.tasks);
         };

          useEffect(() => {
          loadTasks();
       }, []);

         const submitTask = async () => {
         if (!form.title) return;

             if (editing) {
            const res = await axios.post(`${BASE_URL}/update/${editing}`, form, { withCredentials: true });
             
            dispatch(addTask(res.data));
             } else {
           const res=  await axios.post(`${BASE_URL}/create`, form, { withCredentials: true });
            dispatch(addTask(res.data))
             }
         setShowModal(false);
            setEditing(null);
             setForm({ title: "", description: "", status: "pending" });
             loadTasks();
              };

           const deleteTask = async (id) => {
           const res = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });
          console.log("API response:", res.data);
              dispatch(removeTask(res.data))
              loadTasks();
               };

  const columns = [
       { name: "Pending", key: "pending", color: "bg-yellow-50", badge: "bg-yellow-200 text-yellow-800" },
      { name: "In Progress", key: "in-progress", color: "bg-blue-50", badge: "bg-blue-200 text-blue-800" },
     { name: "Completed", key: "completed", color: "bg-green-50", badge: "bg-green-200 text-green-800" },
       ];

     return (
      <div className="p-6 flex flex-col min-h-screen">

     
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage your task</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            setEditing(null);
            setForm({ title: "", description: "", status: "pending" });
            setShowModal(true);
          }}
          
        >
          <FiPlus size={20} /> Add Task
        </button>
           
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {columns.map((col) => (
          <div key={col.key} className={`rounded-xl shadow-md p-4 flex flex-col ${col.color} max-h-[75vh]`}>
            <h3 className="text-xl font-semibold mb-4">{col.name}</h3>

            
            <div className="flex-1 overflow-y-auto space-y-4">
              {tasks
                .filter((t) => t.status === col.key)
                .map((t) => (
                  <div
                    key={t._id}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{t.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{t.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${columns.find(c => c.key === t.status)?.badge}`}>
                        {t.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>

                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => {
                          setEditing(t._id);
                          setForm({ title: t.title, description: t.description, status: t.status });
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteTask(t._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              {tasks.filter((t) => t.status === col.key).length === 0 && (
                <p className="text-gray-400 text-sm italic">No tasks here.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">

            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Task" : "Add Task"}</h2>
            

             

            <input
              className="w-full border px-3 py-2 rounded mb-5 my-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <select
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={submitTask}
            >
              {editing ? "Save Changes" : "Add Task"}
            </button>
             

            <button
              className="w-full mt-2 bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
