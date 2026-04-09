import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  const hospitals = await query("SELECT * FROM hospitals")
  const ambulances = await query("SELECT * FROM ambulances")
  const contacts = await query("SELECT * FROM emergency_contacts")
  const medicines = await query("SELECT * FROM medicine_reminders")

  return NextResponse.json({
    hospitals,
    ambulances,
    contacts,
    medicines,
  })
}

export async function POST(req: Request) {
  const { type, data } = await req.json()

  if (type === "hospital") {
    await query(
      "INSERT INTO hospitals (name, location, map_link) VALUES ($1,$2,$3)",
      [data.name, data.location, data.map_link]
    )
  }

  if (type === "ambulance") {
    await query(
      "INSERT INTO ambulances (name, number) VALUES ($1,$2)",
      [data.name, data.number]
    )
  }

  if (type === "contact") {
    await query(
      "INSERT INTO emergency_contacts (name, phone) VALUES ($1,$2)",
      [data.name, data.phone]
    )
  }

  if (type === "medicine") {
    await query(
      "INSERT INTO medicine_reminders (patient_name, medicine_name, time) VALUES ($1,$2,$3)",
      [data.patient_name, data.medicine_name, data.time]
    )
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const { type, id } = await req.json()

  const map: any = {
    hospital: "hospitals",
    ambulance: "ambulances",
    contact: "emergency_contacts",
    medicine: "medicine_reminders",
  }

  await query(`DELETE FROM ${map[type]} WHERE id=$1`, [id])

  return NextResponse.json({ success: true })
}