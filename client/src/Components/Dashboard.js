import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const API_URI = "api/auth/getAllUsers";

  const fetchUsers = async () => {
    const response = await fetch(API_URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setData(json);
  };

  useEffect(() => {
    fetchUsers();
    if (!localStorage.getItem("token")) {
      // naviaget to home page
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mt-5">List of Our Dear Users</h3>
      <div className="row row-cols-1 row-cols-md-5 g-4 mt-5 ">
        {data.map((items) => {
          return (
            <div className="col" key={items._id}>
              <div className="card">
                <img
                  src="https://is.gd/hGTW5P"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{items.name}</h5>
                  <p className="card-text text-center">{items.email}</p>
                  <p className="card-text text-center">+91 {items.phone}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
