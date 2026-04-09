"use client"

import { useEffect, useState } from "react"

/* Props */
interface AdminDashboardProps {
  user: any;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [data, setData] = useState<any>({
    hospitals: [],
    ambulances: [],
    contacts: [],
    medicines: [],
  })

  const [input, setInput] = useState<any>({})

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const res = await fetch("/api/admin/dashboard")
    const d = await res.json()
    setData(d)
  }

  async function add(type: string) {
    await fetch("/api/admin/dashboard", {
      method: "POST",
      body: JSON.stringify({ type, data: input }),
    })
    setInput({})
    fetchData()
  }

  async function remove(type: string, id: number) {
    await fetch("/api/admin/dashboard", {
      method: "DELETE",
      body: JSON.stringify({ type, id }),
    })
    fetchData()
  }

  const sections = [
    { title: "Hospitals", type: "hospital", fields: ["name","location","map_link"], list: data.hospitals },
    { title: "Ambulances", type: "ambulance", fields: ["name","number"], list: data.ambulances },
    { title: "Emergency Contacts", type: "contact", fields: ["name","phone"], list: data.contacts },
    { title: "Medicine Reminders", type: "medicine", fields: ["patient_name","medicine_name","time"], list: data.medicines },
  ]

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-violet-100 to-purple-200">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-violet-800 mb-6 animate-fade-in">
        Admin Dashboard
      </h1>

      {sections.map((section, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur-md rounded-xl p-5 mb-6 shadow-lg border border-violet-200 transition-all duration-300 hover:scale-[1.01]"
        >

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-violet-700 mb-4">
            {section.title}
          </h2>

          {/* INPUTS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {section.fields.map((f) => (
              <input
                key={f}
                placeholder={f.replace("_", " ")}
                className="px-3 py-2 border-2 border-violet-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                onChange={(e) =>
                  setInput({ ...input, [f]: e.target.value })
                }
              />
            ))}

            {/* ADD BUTTON */}
            <button
              onClick={() => add(section.type)}
              className="px-4 py-2 rounded-md font-semibold text-black bg-violet-300 hover:bg-violet-400 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              ADD
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-2">
            {section.list.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-violet-50 border border-violet-200 rounded-md px-3 py-2 transition hover:bg-violet-100"
              >
                <span className="text-gray-800 text-sm font-medium">
                  {Object.values(item).join(" - ")}
                </span>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => remove(section.type, item.id)}
                  className="px-3 py-1 rounded-md bg-red-300 text-black font-semibold hover:bg-red-400 transition-all duration-300 active:scale-95"
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  )
}