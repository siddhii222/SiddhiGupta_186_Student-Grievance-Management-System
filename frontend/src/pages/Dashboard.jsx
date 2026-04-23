import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

 const API = "https://siddhigupta-186-student-grievance.onrender.com/api/grievances";

  const fetchData = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await axios.post(API, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ title: "", description: "", category: "" });
    fetchData();
  };

  const del = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const update = async (id) => {
    await axios.put(`${API}/${id}`, { status: "Resolved" }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const searchFn = async () => {
    const res = await axios.get(`${API}/search/title?title=${search}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="box">
      <h2> Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add Grievance</h3>
      <form onSubmit={add}>
        <input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
        <input placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
        <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}/>
        <button>Add</button>
      </form>

      <h3>Search</h3>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} />
      <button onClick={searchFn}>Search</button>

      <h3>Grievances</h3>
      {data.map((g) => (
        <div key={g._id}>
          <b>{g.title}</b> - {g.status}
          <br/>
          <button onClick={()=>update(g._id)}>Resolve</button>
          <button onClick={()=>del(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}