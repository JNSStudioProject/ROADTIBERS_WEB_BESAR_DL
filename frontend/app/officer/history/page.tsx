'use client';
import { useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  HistoryHeaderBar,
  HistoryStatusSummary,
  FilterSummaryBar,
  HistoryKpiGrid,
  MainHistoryTable,
  ValidationAndTimeline,
  NotesAndActions,
  QuickNavigation
} from "@/components/officer/history/history-components";
import { historyRows } from "@/data/officer-history";

export default function OfficerHistoryPage() {
  const totalRecords = 28;
  const validationNeeded = 8;
  const highRisk = 3;

  const [activeFilter, setActiveFilter] = useState("Semua data");

  const filteredRows = historyRows.filter(row => {
    if (activeFilter === "Semua data") return true;
    if (activeFilter === "Risiko tinggi") return row.risk === "Tinggi";
    if (activeFilter === "Perlu validasi") return row.val.toLowerCase() === "perlu validasi";
    if (activeFilter === "Pelanggaran") return row.cat === "Pelanggaran";
    if (activeFilter === "Plat") return row.cat === "Plat";
    if (activeFilter === "Forecasting") return row.cat === "Forecasting";
    return true;
  });

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        <HistoryHeaderBar />
        <HistoryStatusSummary 
          total={totalRecords} 
          validationNeeded={validationNeeded} 
          highRisk={highRisk} 
        />
        <FilterSummaryBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <HistoryKpiGrid data={{ historyRows, total_records: totalRecords }} />
        <MainHistoryTable rows={filteredRows} />
        <ValidationAndTimeline />
        <NotesAndActions rows={filteredRows} />
        <QuickNavigation />
      </div>
    </OfficerPageShell>
  );
}
