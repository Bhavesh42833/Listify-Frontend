import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";
import "../styles/app.scss";

const Home = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const response = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const {data}=response;
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/mytask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.task);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  // Filter tasks based on completion status
  const pendingTasks = tasks.filter((task) => !task.IsCompleted);
  const completedTasks = tasks.filter((task) => task.IsCompleted);

  return (
    <div>
      <section className="todosContainer">
        <div className="taskSection pendingTasks">
          <h2>Pending Tasks</h2>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <TodoItem
                title={task.title}
                description={task.description}
                IsCompleted={task.IsCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                id={task._id}
                time_tag={task.time_tag}
                deadline={task.deadline}
                key={task._id}
              />
            ))
          ) : (
            <p>No pending tasks</p>
          )}
        </div>

        <div className="taskSection completedTasks">
          <h2>Completed Tasks</h2>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TodoItem
                title={task.title}
                description={task.description}
                IsCompleted={task.IsCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                time_tag={task.time_tag}
                deadline={task.deadline}
                id={task._id}
                key={task._id}
              />
            ))
          ) : (
            <p>No completed tasks</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
