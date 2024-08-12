import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);
  useEffect(() => {
    handleFileUpload(image);
  }, [image]);
  const handleFileUpload = async (image) => {
    if (!image) return;
    const storage = getStorage(app);
    const fileName = new Date().getTime().toString() + "_" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progess + "% done");
        setImagePercentage(Math.round(progess));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloaduRL) =>
          setFormData({ ...formData, profilePicture: downloaduRL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold my-7 text-center gap-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={inputRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="mt-2 h-24 w-24 self-center cursor-pointer rounded-full object-cover "
          onClick={() => inputRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image(file size must be less than 2 MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span>{`Uploading: ${imagePercentage}%`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
