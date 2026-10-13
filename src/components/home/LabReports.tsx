import { useState } from "react"
import { Download, FileCheck2, Mail } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { contact, labReports, type LabReport } from "@/data/content"

function downloadSummary(r: LabReport) {
  const text = [
    "MOONDUNE — LAB REPORT SUMMARY",
    "",
    `Report: ${r.title}`,
    `Scope:  ${r.summary}`,
    "Lab:    Independent laboratory, South Korea",
    "",
    `For the full signed report, email ${contact.email}.`,
  ].join("\n")
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }))
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: `moondune-${r.id}-summary.txt`,
  })
  a.click()
  URL.revokeObjectURL(url)
  toast.success("Summary downloaded", { description: r.title })
}

export function LabReports() {
  const [active, setActive] = useState<LabReport | null>(null)
  const loop = [...labReports, ...labReports]

  return (
    <section className="overflow-hidden border-y bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-[clamp(30px,4.4vw,46px)] leading-tight font-semibold text-wine">
          Created for the Climate.
          <br />
          Tested by Science.
        </h2>
        <p className="mt-3 text-muted-foreground">Evaluated in an independent lab in South Korea.</p>
      </div>

      <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {loop.map((r, k) => (
            <button
              key={`${r.id}-${k}`}
              onClick={() => setActive(r)}
              tabIndex={k >= labReports.length ? -1 : 0}
              aria-hidden={k >= labReports.length}
              className="flex shrink-0 items-center gap-3 rounded-full border border-wine/20 bg-wine-50 px-5 py-3 text-sm font-medium text-wine transition hover:border-wine hover:bg-wine hover:text-white"
            >
              <FileCheck2 className="size-4" /> {r.title}
            </button>
          ))}
        </div>
      </div>

      <LabReportDialog report={active} onClose={() => setActive(null)} />
    </section>
  )
}

export function LabReportDialog({ report, onClose }: { report: LabReport | null; onClose: () => void }) {
  return (
    <Dialog open={!!report} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        {report && (
          <>
            <DialogHeader>
              <div className="mb-2 grid size-12 place-items-center rounded-full bg-wine-50 text-wine">
                <FileCheck2 className="size-6" />
              </div>
              <DialogTitle className="font-heading text-3xl text-wine">{report.title}</DialogTitle>
              <DialogDescription>{report.summary}</DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Conducted by an independent laboratory in South Korea. Download the summary, or request the full signed report from
              our care team.
            </p>
            <DialogFooter className="gap-2 sm:justify-start">
              <Button className="rounded-full" onClick={() => downloadSummary(report)}>
                <Download /> Download summary
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Full report request: ${report.title}`)}`}>
                  <Mail /> Request full report
                </a>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
