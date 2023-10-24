"use client"
import React, { useState } from "react"
import Image from "next/image"
import Logo from "../../../../../public/assets/images/logo-devlinks-large.svg"
import Email from "../../../../../public/assets/images/icon-email.svg"
import Password from "../../../../../public/assets/images/icon-password.svg"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

function page() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

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

    try {
      setIsLoading(true)
      const res = await axios.post("/api/auth/login", {
        email,
        password
      })
      toast.success("Login successful")
      router.push("/dashboard/links")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
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
          <div className="title text-[32px] font-bold">Login</div>
          <div className="subtext text-[16px]">
            Add your details below to get back into the app
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
                htmlFor="password"
                className="block font-semibold text-[16px] mb-2"
              >
                Password
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
                  onChange={onchange}
                  placeholder="Enter your password"
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
              {isLoading ? "logging" : "login"}
            </button>
          </form>
        </div>

        <div className="links text-center my-4">
          Don’t have an account?
          <Link href="/register" className="text-purple font-semibold pl-1">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
