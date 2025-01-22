import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);

  const updatePassword = async () => {
    if (newPassword.length > 100 || newPassword.length < 8  ) {
        setError("Password length must be 8-100 characters.");
    }
    else if (newPassword !== verifyPassword) {
        setError("The passwords do not match.");
    }
    else {
        setError("");
        try {
          const res = await axios.patch(
            BASE_URL + "/profile/password",
            {
              oldPassword,
              newPassword,
            },
            { withCredentials: true }
          );
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        } catch (e) {
          setError(e?.response?.data?.error || "Something went wrong.");
        }
    }
  };


  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Password</h2>
              <div>
                
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Old password:</span>
                  </div>
                  <input
                    type="password"
                    value={oldPassword}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">New password:</span>
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Verify password:</span>
                  </div>
                  <input
                    type="password"
                    value={verifyPassword}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setVerifyPassword(e.target.value)}
                  />
                </label>

              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={updatePassword}>
                  Update password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Password updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Password;
