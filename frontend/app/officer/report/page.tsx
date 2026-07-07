import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  ReportHeaderBar,
  ReportStatusSummary,
  ReportKpiGrid,
  ReportControlPanel,
  ReportPreviewPanel,
  ReportDetailTable,
  ValidationChecklistPanel,
  ReportDisclaimerPanel,
  ReportQuickNavigation
} from "@/components/officer/report/report-components";

export default function OfficerReportPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        <ReportHeaderBar />
        <ReportStatusSummary />
        <ReportKpiGrid />
        <ReportControlPanel />
        <ReportPreviewPanel />
        <ReportDetailTable />
        <ValidationChecklistPanel />
        <ReportDisclaimerPanel />
        <ReportQuickNavigation />
      </div>
    </OfficerPageShell>
  );
}
