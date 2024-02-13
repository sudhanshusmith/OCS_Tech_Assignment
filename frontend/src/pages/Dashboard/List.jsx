import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./List.module.css";
import { ToastContainer, toast } from "react-toastify";

function List({ data, isLoading }) {

  return (
    <>
      {isLoading ? (
        <div className="text-white text-2xl text-center mt-5">Loading...</div>
      ) : (
        <div className={styles.borrowings}>
          <table>
            <tr>
              <th>User Id</th>
              <th>Password Hash</th>
              <th>Role</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.userid}</td>
                  <td className="">{val.password_hash}</td>
                  <td>{val.role}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
}

export default List;
