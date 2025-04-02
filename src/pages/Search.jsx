import "../styles/search.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Checkbox } from "@mui/material";
import { server } from "../main";
import { Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [timeTag, setTimeTag] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {
    try {
      const response = await axios.put(
        `${server}/tasks/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating task");
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting task");
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const formattedDeadline = deadline ? new Date(deadline).toISOString() : "";
      const response = await axios.get(
        `${server}/tasks/filter?title=${searchTitle}&deadline=${formattedDeadline}&time_tag=${timeTag}`,
        { withCredentials: true }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [searchTitle, deadline, timeTag, refresh]);

  return (
    <div className="search-container">
      <section className="search-fields" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)", padding: "20px", borderRadius: "8px" }}>
  <h2>Search Tasks</h2>

  {/* Search Field */}
  <TextField
    label="Search by Title"
    variant="outlined"
    fullWidth
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
    sx={{
      input: { color: "var(--text-color)" }, // Text color
      "& .MuiOutlinedInput-root": {
        backgroundColor: "var(--input-bg)",
        "& fieldset": { borderColor: "var(--input-border)" }, // Border color
        "&:hover fieldset": { borderColor: "var(--input-border)" }, 
        "&.Mui-focused fieldset": { borderColor: "var(--input-border)" }
      },
      "& .MuiInputLabel-root": { color: "var(--input-label)" } // Label color
    }}
  />

  {/* Date Picker */}
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Filter by Deadline"
      value={deadline}
      onChange={(newValue) => setDeadline(newValue)}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "var(--text-color)",
          backgroundColor: "var(--input-bg)",
          "& fieldset": { borderColor: "var(--input-border)" },
          "&:hover fieldset": { borderColor: "var(--input-border)" },
          "&.Mui-focused fieldset": { borderColor: "var(--input-border)" }
        },
        "& .MuiInputLabel-root": { color: "var(--input-label)" }
      }}
    />
  </LocalizationProvider>

  {/* Time Tag Selection */}
  <FormControl fullWidth sx={{ backgroundColor: "var(--input-bg)", color: "var(--text-color)", borderRadius: "4px" }}>
    <InputLabel sx={{ color: "var(--input-label)" }}>Select Time Tag</InputLabel>
    <Select
      value={timeTag}
      onChange={(e) => setTimeTag(e.target.value)}
      sx={{
        color: "var(--text-color)",
        backgroundColor: "var(--input-bg)",
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--input-border)" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--input-border)" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--input-border)" }
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="morning">Morning</MenuItem>
      <MenuItem value="evening">Evening</MenuItem>
      <MenuItem value="night">Night</MenuItem>
    </Select>
  </FormControl>
</section>


      <section className="search-results">
        <h2>Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Deadline:</strong> {new Date(task.deadline).toDateString()}
              </p>
              <p>
                <strong>Time Tag:</strong> {task.time_tag}
              </p>
              <div>
                <input
                  type="checkbox"
                  checked={task.IsCompleted}
                  onChange={() => updateHandler(task._id)}
                  color="primary"
                />
                <Button onClick={() => deleteHandler(task._id)}>
                  <Delete style={{ color: "red" }} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No matching tasks found</p>
        )}
      </section>
    </div>
  );
};

export default Search;
