import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    items: [
      {
        id: "ew_101",
        deviceName: "HP Pavilion Laptop",
        brand: "HP",
        category: "Laptops & Mobiles",
        condition: "Non-working / Damaged",
        estimatedAge: "4 years",
        description: "Motherboard faulty, screen intact.",
      },
    ],
  });
}
