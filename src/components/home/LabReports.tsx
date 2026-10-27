import { Download, FileCheck2, Mail } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { contact, type LabReport } from "@/data/content"

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
