import { redirect } from "next/navigation";

export default function OfficerPageRedirect() {
  redirect("/admin/officer-dashboard");
}
