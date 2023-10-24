"use client"
import React, { ChangeEvent, useState, useEffect } from "react"
import Screen from "../../../../../public/assets/images/illustration-phone-mockup.svg"
import ImageUpload from "../../../../../public/assets/images/icon-upload-image.svg"
import Image from "next/image"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

const Profile = () => {
  const [data, setData] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    profileImage: ""
  })

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [preveiwImage, setPreviewImage] = useState("")

  const [form, setForm] = useState({
    firstName: "",
    lastName: ""
  })

  const { firstName, lastName } = form

  const [image, setImage] = useState("")

  const onChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setImage(fileReader.result as string)
        setPreviewImage(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    } else {
      setPreviewImage("")
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const formData = {
      firstName: firstName || data.firstName,
      lastName: lastName || data.lastName,
      image: image || data.profileImage
    }

    try {
      const res = await axios.post("/api/auth/updateProfile", formData)

      toast.success("Profile Updated successfully")

      setImage("")
      setPreviewImage("")
      getData()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
    }
  }

  const getData = async () => {
    const res = await axios.get("/api/auth/getMe")

    setData({
      _id: res.data._id,
      email: res.data.email,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      username: res.data.username,
      profileImage: res.data.profileImage
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <form onSubmit={onSubmit}>
        <div className="w-auto h-auto mt-16 flex relative p-0 justify-center">
          <div className="w-[30%] h-full flex items-center justify-evenly max-md:hidden sticky top-20">
            <Image src={Screen} alt="" className="w-auto h-[10%]" />
          </div>
          <div className="w-[60%] h-auto p-[40px] max-md:w-full">
            <div className="w-full h-auto">
              <div className="w-full h-auto text-zinc-800 text-[32px] font-bold">
                Profile Details
              </div>
              <div className="w-full my-4 text-neutral-500 text-base font-normal leading-normal">
                Add your details to create a personal touch to your profile.
              </div>
            </div>
            <div className="w-full h-[193px] px-4 flex items-center justify-between my-10 max-md:flex-col max-md:px-5 max-md:h-auto max-md:items-start max-xl:justify-around max-xl:p-0">
              <div className="w-auto h-full flex items-center max-md:my-2">
                Profile picture
              </div>

              <div className="relative w-[193px] h-full text-violet-600 bg-violet-200 rounded max-md:w-[193px] max-md:h-[193px] max-md:my-3 max-xl:w-[250px]">
                {data && data.profileImage !== "" ? (
                  <Image
                    src={data.profileImage}
                    alt=""
                    className="w-full h-[193px] z-1"
                    width={1000}
                    height={1000}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center z-0">
                    {preveiwImage ? (
                      <Image
                        src={preveiwImage}
                        alt=""
                        className="w-full h-[193px] z-1"
                        width={1000}
                        height={1000}
                      />
                    ) : (
                      <>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleImage}
                          className="w-full h-[193px] opacity-0 absolute left-0 right-0"
                          // {...getInputProps()}
                        />
                        <Image
                          src={ImageUpload}
                          alt=""
                          className="w-10 h-10 z-1"
                        />
                        <div className="z-1">+ Upload Image</div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="w-auto h-full flex items-center mx-10 max-md:my-2 max-md:text-left max-md:mx-0 max-xl:w-[200px]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </div>
            </div>
            <div className="w-full h-auto ">
              {data && data.firstName !== "" ? (
                <>
                  <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3 max-md:flex items-center ">
                    <label htmlFor="firstName" className="w-[50%] text-left">
                      First Name
                    </label>
                    <h1 className="w-[50%] text-right">{data.firstName}</h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3 max-md:flex items-center">
                    <label
                      htmlFor="firstName"
                      className="w-[50%] max-md:w-full"
                    >
                      First Name
                    </label>
                    <div className="w-[50%] h-10  max-md:w-full my-5">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={onChange}
                        className="w-full h-full border border-grey outline-none pl-4"
                      />
                    </div>
                  </div>
                </>
              )}
              {data && data.lastName !== "" ? (
                <>
                  <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3 max-md:flex items-center ">
                    <label htmlFor="lastName" className="w-[50%] text-left">
                      First Name
                    </label>
                    <h1 className="w-[50%] text-right">{data.lastName}</h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3 max-md:flex items-center">
                    <label htmlFor="lastName" className="w-[50%] max-md:w-full">
                      Last Name
                    </label>
                    <div className="w-[50%] h-10  max-md:w-full my-5">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={onChange}
                        className="w-full h-full border border-grey outline-none pl-4"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="w-full h-auto px-10 my-10 flex max-md:px-5 border border-l-0 border-r-0 border-t-0 py-3 max-md:flex items-center">
                <div className="w-[50%] text-left">Email Address</div>
                <div className="w-[50%] my-5 items-center text-right">
                  {data && data?.email}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="logout-btn w-auto h-auto px-5 py-2 mx-3 text-white bg-violet-600 flex items-center justify-end rounded cursor-pointer"
                // onClick={upload}
              >
                <input type="submit" value="save" className="cursor-pointer" />
              </div>
              <div
                className="logout-btn w-auto h-auto px-5 py-2 text-white bg-violet-600 flex items-center justify-end rounded cursor-pointer"
                onClick={async () => {
                  await axios.get("/api/auth/logout")
                  router.push("/login")
                }}
              >
                {isLoading ? "logging out" : "logout"}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Profile
