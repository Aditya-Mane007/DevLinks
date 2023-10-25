"use client"
import React, { useState } from "react"
import Image from "next/image"
import Logo from "../../../../../public/assets/images/logo-devlinks-large.svg"
import Email from "../../../../../public/assets/images/icon-email.svg"
import Password from "../../../../../public/assets/images/icon-password.svg"
import User from "../../../../../public/assets/images/icon-profile-details-header.svg"

import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

function page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const { email, username, password, confirmPassword } = formData

  async function onSubmit(e: any) {
    e.preventDefault()

    if (!email) {
      const error = e.target.email.nextSibling
      const input = e.target.email
      const label = e.target.email.labels[0]

      label.style.color = "red"
      input.style.borderColor = "red"
      error.style.display = "block"
      error.style.color = "red"

      setTimeout(() => {
        label.style.color = "black"
        input.style.borderColor = "#e5e7eb"
        error.style.display = "none"
        error.style.color = "red"
      }, 3000)
    }

    if (!password) {
      const error = e.target.password.nextSibling
      const input = e.target.password
      const label = e.target.password.labels[0]

      label.style.color = "red"
      input.style.borderColor = "red"
      error.style.display = "block"
      error.style.color = "red"

      setTimeout(() => {
        label.style.color = "black"
        input.style.borderColor = "#e5e7eb"
        error.style.display = "none"
        error.style.color = "red"
      }, 3000)
    }
    if (!confirmPassword) {
      const error = e.target.confirmPassword.nextSibling
      const input = e.target.confirmPassword
      const label = e.target.confirmPassword.labels[0]

      label.style.color = "red"
      input.style.borderColor = "red"
      error.style.display = "block"
      error.style.color = "red"

      setTimeout(() => {
        label.style.color = "black"
        input.style.borderColor = "#e5e7eb"
        error.style.display = "none"
        error.style.color = "red"
      }, 3000)
    }

    if (!username) {
      const error = e.target.username.nextSibling
      const input = e.target.username
      const label = e.target.username.labels[0]

      label.style.color = "red"
      input.style.borderColor = "red"
      error.style.display = "block"
      error.style.color = "red"

      setTimeout(() => {
        label.style.color = "black"
        input.style.borderColor = "#e5e7eb"
        error.style.display = "none"
        error.style.color = "red"
      }, 3000)
    }

    if (
      password.toString().length >= 8 ||
      confirmPassword.toString().length >= 8
    ) {
      if (password !== confirmPassword) {
        toast.error("Password do not match")
      } else {
        try {
          setLoading(true)
          await axios.post("/api/auth/register", {
            email,
            username,
            password
          })

          router.push("/login")
        } catch (error: any) {
          toast.error(error.message)
        } finally {
          setLoading(false)
        }
      }
    } else {
      toast.error("Password should be at least 8 characters")
    }
  }

  function onchange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className="w-[476px] flex flex-col items-center justify-center text-">
      <div className="logo mb-10">
        <Image src={Logo} alt="DevLinks" />
      </div>
      <div className="form-section w-full h-auto flex flex-col p-10">
        <div className="headings mb-10">
          <div className="title text-[32px] font-bold">Create account</div>
          <div className="subtext text-[16px]">
            Let’s get you started sharing your links!
          </div>
        </div>
        <div className="form-section">
          <form onSubmit={onSubmit}>
            <div className="w-auto h-auto my-2">
              <label
                htmlFor="email"
                className="block font-semibold text-[16px] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Image
                  src={Email}
                  alt="email"
                  className="absolute top-4 mx-5"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onchange}
                  placeholder="e.g. alex@email.com"
                  className="w-full h-12 border px-11 outline-none focus:shadow-3xl rounded-10"
                />
                <div className="error-message absolute top-4 mx-2 right-0 text-sm hidden">
                  Can’t be empty
                </div>
              </div>
            </div>
            <div className="w-auto h-auto my-2">
              <label
                htmlFor="username"
                className="block font-semibold text-[16px] mb-2"
              >
                Username
              </label>
              <div className="relative">
                <Image
                  src={User}
                  alt="Username"
                  className="absolute top-4 mx-5"
                />
                <input
                  type="username"
                  name="username"
                  id="username"
                  value={username}
                  onChange={onchange}
                  placeholder="e.g. alex1234"
                  className="w-full h-12 border px-11 outline-none focus:shadow-3xl rounded-10"
                />
                <div className="error-message absolute top-4 mx-2 right-0 text-sm hidden">
                  Can’t be empty
                </div>
              </div>
            </div>
            <div className="w-auto h-auto my-2">
              <label
                htmlFor="password"
                className="block font-semibold text-[16px] mb-2"
              >
                Create password
              </label>
              <div className="relative">
                <Image
                  src={Password}
                  alt="password"
                  className="absolute top-4 mx-5"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  new-password="true"
                  onChange={onchange}
                  placeholder="At least 8 characters"
                  className="w-full h-12 border px-11 outline-none focus:shadow-3xl rounded-10"
                />
                <div className="error-message absolute top-4 mx-2 right-0 text-sm hidden">
                  Can’t be empty
                </div>
              </div>
            </div>
            <div className="w-auto h-auto my-2">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold text-[16px] mb-2"
              >
                Confirm password
              </label>
              <div className="relative">
                <Image
                  src={Password}
                  alt="Password"
                  className="absolute top-4 mx-5"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  new-password="true"
                  value={confirmPassword}
                  onChange={onchange}
                  placeholder="At least 8 characters"
                  className="w-full h-12 border px-11 outline-none focus:shadow-3xl rounded-10"
                />
                <div className="error-message absolute top-4 mx-2 right-0 text-sm hidden">
                  Can’t be empty
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-10 bg-purple text-white my-2  rounded-10 hover:bg-purpleHover"
            >
              {loading ? "Creating new account" : "Create new account"}
            </button>
          </form>
        </div>

        <div className="links text-center my-4">
          Already have an account?
          <Link href="/login" className="text-purple font-semibold pl-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
