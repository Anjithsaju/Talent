import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TalentRegistration from "./Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";

interface UserProfile {
  id: number;
  username: string;
  profilePic: string;
  bio: string;
  talent: string;
  phone: string;
  address: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { userId } = useParams<{ userId?: string }>();

  useEffect(() => {
    const fetchProfile = async () => {
      setShowEditButton(!userId);
      try {
        const url = userId
          ? `http://localhost:5000/profile/${userId}`
          : `http://localhost:5000/profile`;

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        if (data.id) {
          setUser({
            id: data.id,
            username: data.name,
            profilePic: data.profilepic || "https://via.placeholder.com/150",
            bio: data.bio || "No bio available",
            talent: data.talent || "No talent specified",
            phone: data.phone || "N/A",
            address:
              `${data.district}, ${data.state}, ${data.country}` || "N/A",
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const openModal = () => {
    if (modalRef.current) {
      const modal = new Modal(modalRef.current);
      modal.show();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        No user session found. Please log in.
      </p>
    );
  }

  return (
    <>
      <section className="w-full h-screen flex flex-col overflow-hidden">
        <Navbar
          isSidenavOpen={isSidenavOpen}
          setIsSidenavOpen={setIsSidenavOpen}
        />
        <div className="w-[100vw] h-[100vh] flex flex-col items-center mx-auto p-4 bg-[#e8effa] overflow-y-scroll">
          <div className="flex flex-col items-center w-full max-w-md">
            <img
              className="w-40 h-40 rounded-full border-4 border-gray-300"
              src={user.profilePic}
              alt="Profile"
            />
            <h2 className="text-2xl font-bold mt-2">{user.username}</h2>
            <p className="text-gray-600 text-center">{user.bio}</p>
            <p className="text-gray-600">🎭 {user.talent}</p>
            <p className="text-gray-600">📍 {user.address}</p>
            <p className="text-gray-600">📞 {user.phone}</p>

            {showEditButton && (
              <>
                <button
                  onClick={openModal}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit Bio
                </button>

                <div
                  className="modal fade"
                  id="editBioModal"
                  tabIndex={-1}
                  aria-labelledby="editBioModalLabel"
                  aria-hidden="true"
                  ref={modalRef}
                >
                  <div className="modal-dialog flex justify-center">
                    <div className="modal-content !w-fit">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editBioModalLabel">
                          Edit Bio
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <TalentRegistration userName={user.username} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-center">Gallery</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-30 h-30 rounded-md border bg-cover"
                  alt={`Uploaded ${index}`}
                />
              ))}
              {showEditButton && (
                <>
                  <button
                    className="w-30 h-30 !bg-gray-300 flex items-center justify-center !rounded-md border-2 !border-gray-400 !text-gray-700 text-3xl"
                    onClick={triggerFileInput}
                  >
                    +
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
