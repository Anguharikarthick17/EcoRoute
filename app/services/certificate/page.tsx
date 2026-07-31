import { redirect } from "next/navigation";

export default function CertificateServiceRedirect() {
  redirect("/dashboard/certificates");
}
