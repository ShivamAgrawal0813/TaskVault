import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

function Profile() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest("http://localhost:7000/users/me");
        setFormData({
          name: data.user.name,
          email: data.user.email,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await apiRequest("http://localhost:7000/users/me", {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-xl font-bold">Your Profile</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
