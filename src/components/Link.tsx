"use client"
import React, { useState } from "react"
import LinkIcon from "../../public/assets/images/icon-link.svg"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"

const Link = ({
  link,
  index,
  getLinks
}: {
  link: any
  index: any
  getLinks: any
}) => {
  const [disabledState, setDisabledState] = useState(true)
  const [updateState, setUpdateState] = useState({
    platform: link.platform,
    url: link.url
  })

  const [loading, setLoading] = useState(false)

  const onChange = (e: any) => {
    setUpdateState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

    setDisabledState(false)
  }

  const update = async (e: any) => {
    e.preventDefault()

    if (!updateState.url) {
      const error = e.target.form[3].nextSibling
      const input = e.target.form[3]
      const label = e.target.form[3]

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
    } else {
      const checkUrl = new URL(updateState.url)

      if (
        checkUrl.host.split(".")[0].trim().toLowerCase() ===
        updateState.platform.trim().toLowerCase().split(" ").join("")
      ) {
        const formData = {
          id: link._id,
          platform: updateState.platform,
          url: updateState.url
        }
        try {
          setLoading(true)
          const res = await axios.put("/api/links/update", formData)
          toast.success("Link Updated Successfully")
          getLinks()
        } catch (error: any) {
          toast.error(error.message)
        } finally {
          setLoading(false)
        }
      } else {
        toast.error("Please add appropriate Link")
      }
    }
  }

  const deleteLink = async (e: any) => {
    e.preventDefault()

    const formData: any = {
      id: link._id
    }

    try {
      const res = await axios.post("/api/links/delete", formData)
      toast.success("Link delated Successfully")
      getLinks()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form>
        <div className="link w-full h-auto my-20">
          <div className="title w-full h-6 flex justify-between my-3">
            <div className="title-text">#Link {index + 1}</div>
            <div className="function flex gap-5 cursor-pointer uppercase">
              <div>
                <input
                  type="submit"
                  value={loading ? "updating..." : "update"}
                  disabled={disabledState ? true : false}
                  className="update-btn w-full h-auto p-2 rounded uppercase text-white bg-violet-400 hover:bg-violet-500  enabled:cursor-pointer disabled:cursor-not-allowed"
                  onClick={update}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="remove"
                  className="remove-btn w-full h-auto p-2 rounded uppercase text-white cursor-pointer bg-red-400 hover:bg-hoverRed"
                  onClick={deleteLink}
                />
              </div>
            </div>
          </div>
          <div className="link-div w-full my-2">
            <div>
              <label htmlFor="platform">Platform</label>
              <select
                id="platforms"
                name="platform"
                className="w-full h-12 outline-none px-5 border  border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                required
                value={updateState.platform}
                onChange={onChange}
              >
                <option value="GitHub">GitHub</option>
                <option value="Frontend Mentor">Frontend Mentor</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitch">Twitch</option>
                <option value="Dev.to">Dev.to</option>
                <option value="Codewars">Codewars</option>
                <option value="Codepen">Codepen</option>
                <option value="freeCodeCamp">freeCodeCamp</option>
                <option value="GitLab">GitLab</option>
                <option value="Hashnode">Hashnode</option>
                <option value="Stack Overflow">Stack Overflow</option>
              </select>
            </div>
            <div className="w-full h-auto py-5 ">
              <label
                htmlFor="url"
                className="w-full block mb-1 text-zinc-800 text-base font-normal"
              >
                Url :
              </label>
              <div className="relative">
                <Image
                  src={LinkIcon}
                  alt="link"
                  className="absolute top-4 mx-5"
                />
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={updateState.url}
                  placeholder="https:://github.com/Aditya-Mane007"
                  onChange={onChange}
                  className="w-full h-12 border outline-none px-10 border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                />
                <div className="error-message absolute top-4 mx-2 right-0 text-sm hidden">
                  Can’t be empty
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Link
