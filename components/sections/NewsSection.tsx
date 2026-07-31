"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MdCalendarToday, MdArrowForward, MdFiberNew } from "react-icons/md";

const NEWS_ITEMS = [
  {
    id: "news-1",
    category: "Announcement",
    categoryColor: "text-[var(--color-primary)] bg-[var(--color-primary)]/8",
    date: "28 July 2026",
    title: "EcoRoute Expands to 5 New States — Now Available in Tamil Nadu, West Bengal, Rajasthan, Assam and Odisha",
    summary:
      "The Ministry of Environment, Forest and Climate Change has approved EcoRoute's expansion to five additional states, adding 85 new collection centres and bringing the total to 350+ authorised facilities nationwide.",
    href: "/news/ecoroute-expansion-2026",
    isNew: true,
  },
  {
    id: "news-2",
    category: "Campaign",
    categoryColor: "text-[var(--color-accent)] bg-[var(--color-accent)]/8",
    date: "15 July 2026",
    title: "National E-Waste Awareness Drive 2026 — 'Recycle Responsible' Campaign Launched",
    summary:
      "A month-long national awareness campaign encouraging citizens to responsibly dispose of old electronics. Participating citizens receive digital badges and are entered in a lucky draw for government recognition.",
    href: "/news/awareness-campaign-2026",
    isNew: false,
  },
  {
    id: "news-3",
    category: "Event",
    categoryColor: "text-[var(--color-secondary)] bg-[var(--color-secondary)]/8",
    date: "10 July 2026",
    title: "Collection Drive at Pragati Maidan, New Delhi — 2 Tonnes Collected in Single Day",
    summary:
      "EcoRoute's largest single-day collection event at Pragati Maidan, New Delhi collected 2.1 tonnes of e-waste from over 1,400 participating households. Recycling certificates were issued on-site.",
    href: "/news/pragati-maidan-drive-2026",
    isNew: false,
  },
  {
    id: "news-4",
    category: "Update",
    categoryColor: "text-purple-700 bg-purple-50",
    date: "2 July 2026",
    title: "AI Device Identification Feature Updated — Now Supports 500+ Device Models with 98% Accuracy",
    summary:
      "EcoRoute's AI engine has been upgraded to support over 500 device models across 40 manufacturers. The improved model achieves 98% classification accuracy, including support for rare and legacy devices.",
    href: "/news/ai-update-july-2026",
    isNew: false,
  },
] as const;

export function NewsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="news-heading"
      className="bg-[var(--color-background)] border-b border-[var(--color-border)]"
    >
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionTitle
            title="News & Announcements"
            subtitle="Latest updates, campaigns and events from EcoRoute."
            align="left"
            showRule
            badge="News"
          />
          <Link
            href="/news"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors no-underline"
            aria-label="View all news and announcements"
          >
            View All
            <MdArrowForward className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {NEWS_ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              id={item.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="group bg-white border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              aria-labelledby={`${item.id}-title`}
            >
              {/* Category bar */}
              <div className="px-5 pt-4 pb-3 border-b border-[var(--color-border-light)] flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.categoryColor}`}
                >
                  {item.category}
                </span>
                <div className="flex items-center gap-2">
                  {item.isNew && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-[var(--color-danger)] uppercase tracking-wider">
                      <MdFiberNew className="w-3.5 h-3.5" aria-hidden="true" />
                      New
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                    <MdCalendarToday className="w-3 h-3" aria-hidden="true" />
                    <time>{item.date}</time>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <h3
                  id={`${item.id}-title`}
                  className="text-sm font-bold text-[var(--color-text)] leading-snug line-clamp-2"
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors no-underline group-hover:gap-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)] rounded"
                  aria-label={`Read full article: ${item.title}`}
                >
                  Read More
                  <MdArrowForward className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
