import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Card } from '@/components/ui/card'

type Project = {
  title: string
  description: string
  image?: string
  tags: string[]
  type: 'Web' | 'Mobile' | 'Backend' | 'Web & Bot'
}

const projects: Project[] = [
  {
    title: "Inventory Management System (IMS)",
    description:
      "An enterprise inventory solution developed to streamline stock tracking, product management, and day-to-day warehouse operations. Features interactive dashboards, role-based permissions, powerful data visualization, and real-time inventory monitoring for improved operational control.",
    image: "/assets/images/ims-web.png",
    tags: ["React", "TypeScript", "C#", "Redux", "PostgreSQL", "Figma"],
    type: "Web" as const,
  },
  {
    title: "Inventory Management System (IMS) — Mobile",
    description:
      "A cross-platform mobile application built for warehouse staff to simplify inventory management. Supports barcode scanning, order picking, stock updates, and reliable API integration using scalable state management architecture.",
    image: "/assets/images/ims-app.png",
    tags: ["Flutter", "Dart", "BLoC", "Cubit", "REST API"],
    type: "Mobile" as const,
  },
  {
    title: "Internal Workflow & Approval System",
    description:
      "A business process automation platform that digitizes internal requests, including leave applications, expense approvals, and administrative workflows. Provides configurable forms, approval pipelines, and permission-based access to improve efficiency and transparency.",
    image: "/assets/images/automation.png",
    tags: ["React", "TypeScript", "C#", "RBAC", "Workflow", "Admin Panel"],
    type: "Web" as const,
  },
  {
    title: "Distribution Management Platform",
    description:
      "A web platform created to manage product distribution and order allocation across business operations. Includes advanced filtering, searchable data grids, and intuitive navigation to help users organize and monitor large volumes of information efficiently.",
    image: "/assets/images/distribution.png",
    tags: ["React", "TypeScript", "C#", "Zustand", "Figma"],
    type: "Web" as const,
  },
  {
    title: "Shima Shoes Middleware",
    description:
      "A backend middleware platform that synchronizes product, inventory, and sales data between Rahkaran, Website and retail sales channels. Handles order processing, calculates product pricing and stock availability, and ensures reliable data consistency across multiple systems and databases.",
    image:
      "/assets/images/shima-middleware.png",
    tags: [
      "C#",
      ".NET Framework",
      "PostgreSQL",
      "MariaDB",
      "SQL Server",
      "Integration",
    ],
    type: "Backend",
  },
  {
    title: "Payroll & HR Management System",
    description:
      "A web-based payroll and HR platform that automates employee salary calculations, generates digital payslips, and streamlines payroll operations. Integrated with Rahkaran ERP and a Bale chatbot, allowing employees to securely access their payslips and payroll information directly through the messaging platform.",
    image: "/assets/images/payroll-system.png",
    tags: ["React", "TypeScript", "C#", "PostgreSQL", "Bot"],
    type: "Web & Bot" as const,
  },
];

export function WorkSection() {
  return (
    <section id="work" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label="Our work"
            title="Products we've shipped"
            description="From MVPs to production platforms — here's the kind of work we deliver for clients and startups."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 [&>*]:h-full">
          {projects.map((project, i) => (
            <ScrollReveal
              key={`${project.title}-${project.type}`}
              delay={i * 0.08}
              className="h-full"
            >
              <Card className="group flex h-full flex-col overflow-hidden border-white/10 bg-black/40 transition-colors hover:border-violet-500/30 hover:bg-black/60">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-violet-950/80 via-zinc-900 to-black">
                      <ArrowLeftRight
                        className="size-16 text-violet-400/35 transition-transform duration-500 group-hover:scale-110"
                        aria-hidden
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-neutral-200 backdrop-blur-sm">
                    {project.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
