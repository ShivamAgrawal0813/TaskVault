import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {

        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            console.log(formData);
            setIsSubmitting(false);
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>
                    Create an account
                </h1>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 '>
                            Name
                        </label>
                        <input type="text" placeholder='Your name'
                            name="name" value={formData.name} onChange={handleChange}
                            className='mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        {errors.name && (<p className='text-sm text-red-600'>{errors.name}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            name='email' value={formData.email} onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (<p className='text-sm text-red-600'>{errors.email}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            name='password' value={formData.password} onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (<p className='text-sm text-red-600'>{errors.password}</p>)}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white py-2 rounded-md 
                ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 transition"}  `}
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 cursor-pointer hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register
