import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentUpdatePerson,
  changeStatusListener,
  resetInputValues,
  updateEmailInputValue,
  updateNameInputValue,
  updatePasswordInputValue,
} from "../features/globalValues/globalSlice";
import { store } from "../store";
import { toast } from "react-toastify";

const AddPerson = () => {
  const { inputValues, currentUpdatePerson } = useSelector((state) => state.globalValues);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/api/person";

    if (!inputValues.name || !inputValues.email || !inputValues.password) {
      toast.error("Semua field wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      if (currentUpdatePerson === 0) {
        await axios.post(url, inputValues);
        toast.success("✅ Data berhasil ditambahkan!");
      } else {
        await axios.patch(`${url}/${currentUpdatePerson}`, inputValues);
        toast.success("✅ Data berhasil diupdate!");
        dispatch(changeCurrentUpdatePerson({ id: 0 }));
      }

      store.dispatch(changeStatusListener());
      store.dispatch(resetInputValues());
    } catch (error) {
      const msg = error.response?.data?.error || error.message;
      toast.error(`❌ Gagal menyimpan data: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card bg-white p-5 shadow"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-4 text-primary">
          <i className="bi bi-person-circle me-2"></i>Sign Up
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control fs-5"
              placeholder="Full Name"
              value={inputValues.name}
              onChange={(e) => dispatch(updateNameInputValue({ name: e.target.value }))}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control fs-5"
              placeholder="E-mail"
              value={inputValues.email}
              onChange={(e) => dispatch(updateEmailInputValue({ email: e.target.value }))}
            />
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control fs-5"
              placeholder="Password"
              value={inputValues.password}
              onChange={(e) => dispatch(updatePasswordInputValue({ password: e.target.value }))}
            />
          </div>

          <div className="text-muted small mb-3 text-center">
            Already a member? <a href="#">Log in</a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold fs-5"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Saving...
              </>
            ) : currentUpdatePerson === 0 ? "Register" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPerson; 