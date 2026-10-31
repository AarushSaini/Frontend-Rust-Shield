"use client";

import React, { useState } from "react";
import { useToast } from "./Toast";
import {
  DollarSign,
  TrendingDown,
  HardDrive,
  Clock,
  Download,
  Building2,
  Server,
  Zap,
  CheckCircle2,
  Sliders,
} from "lucide-react";

export default function RoiCalculator() {
  const { addToast } = useToast();
  const [endpoints, setEndpoints] = useState(25000);
  const [branches, setBranches] = useState(120);
  const [gbPerDevice, setGbPerDevice] = useState(22);
  const [serverCostPerYear, setServerCostPerYear] = useState(3800);

  // Dynamic formula calculations
  // 1. Hardware server savings: each branch typically requires 1-2 DP servers
  const hardwareSavings = branches * serverCostPerYear;

  // 2. Bandwidth offload: endpoints * gbPerDevice * 12 months * 98.7% offloaded
  const totalAnnualGigabytes = (endpoints * gbPerDevice * 12);
  const offloadedGigabytes = totalAnnualGigabytes * 0.987;
  const offloadedTerabytes = Math.round(offloadedGigabytes / 1024);
  const bandwidthCostSavings = Math.round((offloadedGigabytes * 0.08) * 0.7); // cloud egress / VPN bandwidth savings

  // 3. Sysadmin hours saved: packaging, patching failed nodes, servicing hung WMI
  const hoursSavedPerYear = Math.round((endpoints / 100) * 16.5);
  const laborCostSavings = hoursSavedPerYear * 75; // average $75/hr sysadmin rate

  // 4. Total Annual Net Savings
  const totalAnnualSavings = hardwareSavings + bandwidthCostSavings + laborCostSavings;
  const threeYearSavings = totalAnnualSavings * 3;

  const handleExportRoi = () => {
    addToast({
      title: "ROI Business Case Generated",
      message: `Your customized analysis for ${endpoints.toLocaleString()} endpoints ($${Math.round(totalAnnualSavings / 1000)}k/year savings) has been compiled.`,
      type: "success",
    });
  };

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold">
              <DollarSign className="h-5 w-5" />
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--text)]">
              Enterprise ROI & Infrastructure Calculator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-2)] mt-1.5">
            Model the tangible financial return of decommissioning branch distribution points and deploying Rust Shield's memory-safe peer mesh.
          </p>
        </div>

        <button
          onClick={handleExportRoi}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-mono font-semibold hover:opacity-90 shadow-sm transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Executive PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Column */}
        <div className="lg:col-span-6 space-y-6">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)] font-semibold flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5" />
            <span>Fleet Parameters</span>
          </h4>

          {/* Slider 1: Endpoints */}
          <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text-2)]">Managed Endpoints:</span>
              <span className="text-sm font-bold text-[var(--text)]">{endpoints.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="150000"
              step="1000"
              value={endpoints}
              onChange={(e) => setEndpoints(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-3)] font-mono">
              <span>2,000</span>
              <span>75,000</span>
              <span>150,000+</span>
            </div>
          </div>

          {/* Slider 2: Branch Offices */}
          <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text-2)]">Remote Branch Sites:</span>
              <span className="text-sm font-bold text-[var(--text)]">{branches.toLocaleString()} sites</span>
            </div>
            <input
              type="range"
              min="5"
              max="800"
              step="5"
              value={branches}
              onChange={(e) => setBranches(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-3)] font-mono">
              <span>5 Sites</span>
              <span>400 Sites</span>
              <span>800 Sites</span>
            </div>
          </div>

          {/* Slider 3: Monthly Patch Volume */}
          <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text-2)]">Monthly OS & App Payload:</span>
              <span className="text-sm font-bold text-[var(--text)]">{gbPerDevice} GB / device</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={gbPerDevice}
              onChange={(e) => setGbPerDevice(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-3)] font-mono">
              <span>5 GB (Light)</span>
              <span>30 GB (Standard)</span>
              <span>60 GB (Heavy)</span>
            </div>
          </div>

          {/* Slider 4: Server Cost */}
          <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text-2)]">Annual Cost per Branch Server:</span>
              <span className="text-sm font-bold text-[var(--text)]">${serverCostPerYear.toLocaleString()} / site</span>
            </div>
            <input
              type="range"
              min="1500"
              max="7000"
              step="100"
              value={serverCostPerYear}
              onChange={(e) => setServerCostPerYear(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-3)] font-mono">
              <span>$1,500</span>
              <span>$4,000</span>
              <span>$7,000</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Column */}
        <div className="lg:col-span-6 space-y-5">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)] font-semibold">
            Audited Financial Impact
          </h4>

          {/* Main Giant Savings Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="h-32 w-32 text-emerald-500" />
            </div>

            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Projected Annual Net Savings
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-normal text-emerald-500 tracking-tight">
              ${(totalAnnualSavings / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-[var(--text-2)] pt-1">
              Equivalent to <strong className="text-[var(--text)]">${Math.round(totalAnnualSavings / 12).toLocaleString()}</strong> per month in operational and infrastructure cost reductions.
            </p>

            <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-3)]">3-Year Cumulative TCO Savings:</span>
              <span className="text-emerald-400 font-bold">${(threeYearSavings / 1000000).toFixed(2)} Million</span>
            </div>
          </div>

          {/* 3 Metric Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1 */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--accent)] font-mono font-medium">
                <Server className="h-3.5 w-3.5" />
                <span>Servers Cut</span>
              </div>
              <div className="font-serif text-xl font-medium text-[var(--text)]">
                {branches} DPs
              </div>
              <p className="text-[10px] text-[var(--text-3)]">
                ${(hardwareSavings / 1000).toFixed(0)}k hardware avoided
              </p>
            </div>

            {/* Metric 2 */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-sky-500 font-mono font-medium">
                <HardDrive className="h-3.5 w-3.5" />
                <span>WAN Offload</span>
              </div>
              <div className="font-serif text-xl font-medium text-[var(--text)]">
                {offloadedTerabytes.toLocaleString()} TB
              </div>
              <p className="text-[10px] text-[var(--text-3)]">
                98.7% local peer mesh
              </p>
            </div>

            {/* Metric 3 */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-mono font-medium">
                <Clock className="h-3.5 w-3.5" />
                <span>Admin Hours</span>
              </div>
              <div className="font-serif text-xl font-medium text-[var(--text)]">
                {hoursSavedPerYear.toLocaleString()} hrs
              </div>
              <p className="text-[10px] text-[var(--text-3)]">
                Zero manual help desk tickets
              </p>
            </div>
          </div>

          {/* Payback period callout */}
          <div className="p-4 rounded-xl bg-[var(--sunk)] border border-[var(--line)] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span className="text-[var(--text-2)]">Average Enterprise Payback Period:</span>
            </div>
            <span className="font-mono font-bold text-[var(--text)] bg-[var(--surface)] px-2.5 py-1 rounded-lg border border-[var(--line)]">
              46 Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

