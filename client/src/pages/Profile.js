import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const updateProfile = async () => {
    try {

      console.log("PROFILE PIC:", profilePic);

      const token =
        localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (profilePic) {
        formData.append(
          "profilePic",
          profilePic
        );
      }

      const res = await API.put(
        "/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert(
  "Profile & Email Updated Successfully"
);

      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>

      <div className="card p-4">

        <div className="text-center mb-4">

          <img
            src={
              user?.profilePic
                ? `http://localhost:5000/uploads/${user.profilePic}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            width="150"
            height="150"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

        </div>

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) =>
            setProfilePic(
              e.target.files[0]
            )
          }
        />

        <p className="mb-3">
  Selected File:
  {profilePic
    ? profilePic.name
    : "None"}
</p>

        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          className="form-control mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <div className="alert alert-info">
          <strong>Role:</strong>{" "}
          {user?.role || "user"}
        </div>

        <button
          className="btn btn-primary"
          onClick={updateProfile}
        >
          Update Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;