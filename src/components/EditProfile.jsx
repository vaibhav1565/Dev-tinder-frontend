/* eslint-disable react/prop-types */
import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.data.firstName);
  const [lastName, setLastName] = useState(user.data?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.data?.photoUrl);
  const [age, setAge] = useState(user.data?.age);
  const [gender, setGender] = useState(user.data?.gender);
  const [about, setAbout] = useState(user.data?.about);
  const [error, setError] = useState("");

  const [skills, setSkills] = useState(user.data?.skills || []);
  const [skill, setSkill] = useState('');
  const [skillError, setSkillError] = useState(null);

  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSkillError("");

    const data = {
      firstName,
      lastName,
      photoUrl,
      age,
      about,
      skills,
    };
    if (gender?.length) {
      data['gender'] = gender;
    }
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        data,
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      setError(e?.response?.data?.error || "Something went wrong.");
    }
  };

  function addSkill() {
    if (skill.length === 0 || skill.length > 25)
      setSkillError("Skill must be of 1-25 characters");
    else if (skills.includes(skill)) setSkillError("Skills must be unique");
    else if (skills.length == 25)
      setSkillError("You cannot put more than 25 skills");
    else {
      setSkillError(null);
      setSkills(skills.concat(skill));
      setSkill("");
    }
  }

  function deleteSkill(index) {
    setSkillError("");
    const tempSkills = [...skills.slice(0, index), ...skills.slice(index + 1)];
    setSkills(tempSkills);
  }

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <form className="card-body" onSubmit={(e) => saveProfile(e)}>
              <h2 className="card-title justify-center">Edit Profile</h2>

              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    value={age || ""}
                    onChange={(e) => setAge(Number(e.target.value) || "")}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="p-2"
                  >
                    <option value="">Choose an option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                <div>
                  <span className="label-text">Skills:</span>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <button
                  type="button"
                    className="btn btn-primary"
                    onClick={addSkill}
                  >
                    Add skill
                  </button>
                  <p className="text-red-500">{skillError}</p>
                  <p>(Click on ❌ to remove a skill)</p>
                  <div className="label">
                    <ul>
                      {skills.map((skill, i) => (
                        <React.Fragment key={skill}>
                          <li>
                            {skill}{" "}
                            <button onClick={() => deleteSkill(i)}>❌</button>
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
        {user && <UserCard userData={user} showButton={false} />}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
  
};
export default EditProfile;
