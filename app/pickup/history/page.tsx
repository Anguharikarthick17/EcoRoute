import { redirect } from "next/navigation";

export default function PickupHistoryRedirect() {
  redirect("/dashboard/pickups");
}
