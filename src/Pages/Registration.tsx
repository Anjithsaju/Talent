import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const talentOptions = [
  "Acting",
  "Singing",
  "Dancing",
  "Playing Instruments",
  "Painting",
  "Writing",
  "Filmmaking",
];

const countryOptions = ["India", "USA", "UK", "Canada", "Australia"];
const stateOptions = {
  India: ["Kerala", "Tamil Nadu", "Maharashtra", "Delhi"],
  USA: ["California", "New York", "Texas", "Florida"],
};
// const districtOptions = {
//   Kerala: ["Trivandrum", "Kochi", "Kozhikode"],
//   "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore"],
//   Maharashtra: ["Mumbai", "Pune", "Nagpur"],
// };

const defaultProfilePic =
  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

function TalentRegistration() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [formData, setFormData] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const sessionResponse = await fetch("http://localhost:5000/session", {
          credentials: "include",
        });
        const sessionData = await sessionResponse.json();

        if (!sessionData.userId) {
          alert("User not logged in.");
          navigate("/login");
          return;
        }

        const talentResponse = await fetch(`http://localhost:5000/profile`, {
          credentials: "include",
        });
        const talentData = await talentResponse.json();

        setFormData({
          name: talentData.name || "",
          age: talentData.age || 0,
          bio: talentData.bio || "",
          talent: talentData.talent || "",
          phone: talentData.phone || "",
          address: talentData.address || "",
          country: talentData.country || "",
          state: talentData.state || "",
          district: talentData.district || "",
        });

        if (talentData.profilepic) {
          setProfilePic(talentData.profilepic);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
      ...(name === "country" && { state: "", district: "" }), // Reset state & district when country changes
      ...(name === "state" && { district: "" }), // Reset district when state changes
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();

    // Append the new image file if updated, otherwise send the existing profile picture URL
    if (file) {
      form.append("image", file);
    } else {
      form.append("profilepic", profilePic); // Send existing profile picture URL
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        form.append(key, String(value)); // Ensure value is string
      } else {
        console.error(
          `Skipping key "${key}" due to invalid type:`,
          typeof value
        );
      }
    });

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/profile", { replace: true });
        window.location.reload();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <p>Loading...</p>; // Prevent rendering empty form before data is available
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw] border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Talent Registration
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="profilePicInput" className="cursor-pointer">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-600"
          />
        </label>
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="text-sm text-gray-400 mt-2">Click to change</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </label>
            {key === "bio" || key === "address" ? (
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                rows={3}
              />
            ) : key === "talent" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 border border-gray-600"
              >
                <option value="">Choose a Talent</option>
                {talentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : key === "country" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 border border-gray-600"
              >
                <option value="">Select Country</option>
                {countryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : key === "state" && formData.country ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 border border-gray-600"
              >
                <option value="">Select State</option>
                {stateOptions[
                  formData.country as keyof typeof stateOptions
                ]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={key === "age" || key === "phone" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 border border-gray-600"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default TalentRegistration;
