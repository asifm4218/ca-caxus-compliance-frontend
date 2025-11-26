import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { PageTitle, SectionTitle, Paragraph } from './components/Typography';

// NOTE: The 'material-symbols-outlined' font will still need to be imported
// in your main application's index.html or global CSS file, as shown in the original HTML.

const RegisterForm = () => {
    // State to toggle password visibility (a nice touch for user experience)
    const [showPassword, setShowPassword] = useState(false);

    // Placeholder function for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Attempting to register account...");
        // Add your actual form submission logic here (e.g., API calls)
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className='relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#EAF2FF] to-[#FFFFFF] p-4 font-display'>
            <div className="w-full max-w-[460px] rounded-xl bg-white p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center">
                    <PageTitle className="text-primary">Caxus Compliance</PageTitle>
                    <Paragraph className="pt-1">Indian Compliance Management System</Paragraph>
                </div>

                {/* Sub-Header */}
                <div className="mt-6 mb-6">
                    <SectionTitle className="text-center">Create Your Account</SectionTitle>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* GST Number Field */}
                    <div className="flex flex-col">
                        <label className="text-[#6B7280] text-xs font-normal pb-2" htmlFor="gst-number">GST Number</label>
                        <input
                            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:ring-[#2563EB]"
                            id="gst-number"
                            maxLength="15"
                            placeholder="Enter your 15-digit GST number."
                            required // Added 'required' for basic validation
                        />
                    </div>

                    {/* CIN Number Field */}
                    <div className="flex flex-col">
                        <label className="text-[#6B7280] text-xs font-normal pb-2" htmlFor="cin-number">CIN Number</label>
                        <input
                            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:ring-[#2563EB]"
                            id="cin-number"
                            maxLength="21"
                            placeholder="Enter your 21-digit CIN number."
                            required
                        />
                    </div>

                    {/* Username Field */}
                    <div className="flex flex-col">
                        <label className="text-[#6B7280] text-xs font-normal pb-2" htmlFor="username">Username</label>
                        <input
                            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:ring-[#2563EB]"
                            id="username"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label className="text-[#6B7280] text-xs font-normal pb-2" htmlFor="password">Password</label>
                        <div className="relative w-full">
                            <input
                                className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:ring-[#2563EB]"
                                id="password"
                                placeholder="Set your password."
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7280] hover:text-[#111827]"
                                type="button"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <span className="material-symbols-outlined h-5 w-5">
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Employees Field */}
                    <div className="flex flex-col">
                        <label className="text-[#6B7280] text-xs font-normal pb-2" htmlFor="employees">How many employees do you have?</label>
                        <input
                            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:ring-[#2563EB]"
                            id="employees"
                            placeholder="Enter number of employees."
                            type="number"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-[#1E3A8A] text-base font-bold text-white transition-colors hover:bg-[#1C3373]"
                        type="submit"
                    >
                        Register Account
                    </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-[#6B7280]">
                        Already have an account?
                        <a className="font-medium text-[#1E3A8A] hover:underline ml-1" href="/signin">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;