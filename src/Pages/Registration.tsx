import { useState } from "react";
import Navbar from "../components/Navbar";
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
const districtOptions = {
  Kerala: ["Trivandrum", "Kochi", "Kozhikode"],
  "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
};
const defaultProfilePic =
  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"; // Default profile image

function TalentRegistration({ userName }: { userName: string }) {
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [name, setName] = useState(userName);
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [talent, setTalent] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [portfolio, setPortfolio] = useState<File | null>(null);

  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFileChange = (e) => {
    console.log("hello");
    const file = e.target.files[0]; // Get the file
    setFile(file); // Set the file in state
    setProfilePic(URL.createObjectURL(file)); // Use the file directly to create the object URL
  };

  // const uploadImage = async () => {
  //   if (!file) return alert("Please select an image");

  //   const formData = new FormData();
  //   formData.append("image", file); // 'image' matches backend key

  //   try {
  //     const response = await fetch("http://localhost:5000/upload", {
  //       method: "POST",
  //       body: formData, // Send file as FormData
  //     });

  //     const data = await response.json();
  //     alert("Image uploaded successfully: " + data.imageUrl);
  //   } catch (error) {
  //     console.error("Error uploading image", error);
  //   }
  // };

  // const handleProfilePicChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     setProfilePic(URL.createObjectURL(file));
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Disable button and show loading state
    setIsSubmitting(true);

    if (!file) {
      alert("Please upload a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Append the image file
    formData.append("name", name);
    formData.append("age", age);
    formData.append("bio", bio);
    formData.append("talent", talent);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("district", district);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData, // Send as FormData (No 'Content-Type' needed)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration Submitted Successfully!");
        console.log(result);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Try again!");
    } finally {
      // Re-enable the button after the request completes
      setIsSubmitting(false);
    }
  };

  const [isSidenavOpen, setIsSidenavOpen] = useState(true);

  return (
    <>
      <section className="overflow-x-hidden">
        <Navbar
          isSidenavOpen={isSidenavOpen}
          setIsSidenavOpen={setIsSidenavOpen}
        />
        <div className="min-h-screen flex items-center p-1 justify-center bg-gray-100 text-gray-900 w-[100vw]">
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

              <span className="text-sm text-gray-400 mt-2">
                Click to change
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  min="1"
                  max="100"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
              </div>

              {/* Talent Dropdown */}
              <div>
                <label className="block text-sm font-medium">
                  Select Your Talent
                </label>
                <select
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  required
                >
                  <option value="">Choose a Talent</option>
                  {talentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  rows={2}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Country Dropdown */}
              <div>
                <label className="block text-sm font-medium">Country</label>
                <select
                  className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setState("");
                    setDistrict("");
                  }}
                  required
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Dropdown */}
              {country && stateOptions[country] && (
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <select
                    className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setDistrict("");
                    }}
                    required
                  >
                    <option value="">Select State</option>
                    {stateOptions[country].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* District Dropdown */}
              {state && districtOptions[state] && (
                <div>
                  <label className="block text-sm font-medium">District</label>
                  <select
                    className="w-full p-2 rounded bg-gray-200 border border-gray-600"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  >
                    <option value="">Select District</option>
                    {districtOptions[state].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Submit Button */}

              <button
                type="submit"
                disabled={isSubmitting} // Disable the button while submitting
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600-submit"
              >
                {isSubmitting ? "Uploading..." : "Submit"}{" "}
                {/* Show loading text */}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default TalentRegistration;
