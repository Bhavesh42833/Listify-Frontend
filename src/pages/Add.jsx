import React, { useState, useContext } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, IconButton, Stack } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "../styles/Add.scss";
import dayjs from "dayjs";

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [time_tag, setTime_tag] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${server}/tasks/create`,
        {
          title,
          description,
          deadline,
          time_tag,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      setTitle("");
      setDescription("");
      setDeadline(null);
      setTime_tag("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="add-container">
      <section className="add-section">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />

          <Stack direction="row" alignItems={"left"} spacing={2} className="date-stack">
            <DatePicker
              label="Deadline"
              value={deadline ? dayjs(deadline) : null}
              renderInput={(params) => <TextField {...params} className="input-field" />}
              onChange={(date) => setDeadline(date)}
              className="input-field"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "var(--text-color)", // Text color
                  "& fieldset": { borderColor: "var(--border-color)" }, // Border color
                  "&:hover fieldset": { borderColor: "var(--border-color-hover)" }, // Hover effect
                  "&.Mui-focused fieldset": { borderColor: "var(--border-color-active)" } // Focus effect
                },
                "& .MuiInputLabel-root": {
                  color: "var(--text-color)", // Label color
                }
              }}
            
            />
            <select
              required
              value={time_tag}
              onChange={(e) => setTime_tag(e.target.value)}
              className="select-time"
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </Stack> 

          <button disabled={loading} type="submit" className="submit-btn">
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Add;
