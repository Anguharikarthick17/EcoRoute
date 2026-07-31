import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GovBadge } from "@/components/ui/GovBadge";
import { Card } from "@/components/ui/Card";
import { GOV_INFO } from "@/lib/constants";
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";

export const metadata: Metadata = {
  title: "Contact Us | EcoRoute Government Portal",
  description: "Contact CPCB helpline, MoEFCC officers, and EcoRoute citizen support.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-background)] py-12 lg:py-16">
      <Container className="flex flex-col gap-10 max-w-4xl">
        <div className="flex flex-col items-center text-center gap-3">
          <GovBadge variant="official" label="Helpline & Contact Desk" />
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Contact EcoRoute Administration</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Official contact details for Central Pollution Control Board (CPCB) Nodal Officers.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
                <MdPhone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Toll-Free Helpline</span>
                <h4 className="font-bold text-base text-[var(--color-text)]">{GOV_INFO.helpline}</h4>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">Monday to Saturday, 09:00 AM to 06:00 PM IST.</p>
          </Card>

          <Card className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-green-50 text-[var(--color-accent)] flex items-center justify-center">
                <MdEmail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Official Support Email</span>
                <h4 className="font-bold text-base text-[var(--color-text)]">{GOV_INFO.email}</h4>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">Response within 24 hours under CPGRAMS guidelines.</p>
          </Card>

          <Card className="p-6 flex flex-col gap-3 sm:col-span-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <MdLocationOn className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Headquarters Address</span>
                <h4 className="font-bold text-sm text-[var(--color-text)]">{GOV_INFO.department}</h4>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{GOV_INFO.address}</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
