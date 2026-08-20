import React, { useState } from 'react';
import { Play, RotateCcw, Sliders, Shield, Layers, FileText, Eye, Cpu, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

/* =========================================================================
   PROJECT 01: Multimodal Anomaly Detection Inspector (MVTec 3D-AD)
   ========================================================================= */
export const MultimodalAnomalyDemo: React.FC = () => {
  const [activeModality, setActiveModality] = useState<'fusion' | 'rgb' | 'xyz'>('fusion');
  const [threshold, setThreshold] = useState<number>(0.65);
  const [kNeighbors, setKNeighbors] = useState<number>(3);

  // Simulated grid patches with normal/anomaly distances
  const patches = [
    { id: 1, type: 'normal', score: 0.18, x: 20, y: 30 },
    { id: 2, type: 'normal', score: 0.22, x: 45, y: 25 },
    { id: 3, type: 'anomaly', score: 0.88, x: 70, y: 40, label: 'Surface Scratch (RGB+XYZ)' },
    { id: 4, type: 'normal', score: 0.15, x: 30, y: 65 },
    { id: 5, type: 'anomaly', score: 0.76, x: 55, y: 70, label: '3D Depth Dent (XYZ only)' },
    { id: 6, type: 'normal', score: 0.29, x: 80, y: 75 },
  ];

  return (
    <div className="bg-white text-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 text-xs shadow-2xs">
      
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            Live Architecture Simulator
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            RGB–XYZ Memory-Bank Patch-Level Scoring
          </h4>
        </div>

        {/* Modality Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveModality('fusion')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              activeModality === 'fusion'
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Modality Fusion (RGB+XYZ)
          </button>
          <button
            onClick={() => setActiveModality('rgb')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              activeModality === 'rgb'
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            RGB 2D Only
          </button>
          <button
            onClick={() => setActiveModality('xyz')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              activeModality === 'xyz'
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            XYZ 3D Only
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Visual Inspection Map */}
        <div className="md:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 relative min-h-[200px] flex flex-col justify-between overflow-hidden">
          
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Input: MVTec 3D-AD Sample #1042</span>
            <span className="text-blue-600 font-semibold">ResNet-18 Multi-Scale Backbone</span>
          </div>

          {/* Simulated Surface Grid with Heatmap Points */}
          <div className="relative w-full h-36 my-2 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded border border-slate-200 flex items-center justify-center">
            
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none" />

            {/* Patches */}
            {patches.map((p) => {
              const isAnomalyDetected = p.score >= threshold;
              const isHighlightedByModality =
                activeModality === 'fusion'
                  ? true
                  : activeModality === 'rgb'
                  ? p.id !== 5
                  : p.id !== 3;

              return (
                <div
                  key={p.id}
                  style={{ top: `${p.y}%`, left: `${p.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 p-1.5 rounded-full flex items-center justify-center ${
                    isAnomalyDetected && isHighlightedByModality
                      ? 'bg-rose-500/20 ring-2 ring-rose-500 animate-pulse'
                      : 'bg-emerald-500/20 ring-1 ring-emerald-500/50'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isAnomalyDetected && isHighlightedByModality ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                  />
                  <div className="absolute top-full mt-1 text-[9px] font-mono whitespace-nowrap bg-white text-slate-700 px-1 py-0.5 rounded border border-slate-200 shadow-2xs">
                    d = {p.score.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Normal Bank (k-NN match)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Out-of-Distribution Defect
            </span>
          </div>
        </div>

        {/* Real Metrics & Sensitivity Parameter Panel */}
        <div className="md:col-span-5 space-y-3 bg-[#F8FAFC] p-3.5 rounded-lg border border-slate-200">
          
          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-slate-500">Patch Anomaly Threshold:</span>
              <span className="text-blue-600 font-bold">{threshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.30"
              max="0.90"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-slate-500">Nearest Neighbors (k):</span>
              <span className="text-blue-600 font-bold">{kNeighbors}-NN</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 3, 5].map((k) => (
                <button
                  key={k}
                  onClick={() => setKNeighbors(k)}
                  className={`py-1 text-center font-mono rounded text-[10px] font-semibold border cursor-pointer transition-colors ${
                    kNeighbors === k
                      ? 'bg-slate-900 text-white font-bold border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  k = {k}
                </button>
              ))}
            </div>
          </div>

          {/* Benchmark Results Display */}
          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 font-mono">AUROC</span>
              <div className="text-base font-bold text-slate-900 font-mono">85.77%</div>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 font-mono">Precision</span>
              <div className="text-base font-bold text-blue-600 font-mono">94.83%</div>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 font-mono">F1-Score</span>
              <div className="text-base font-bold text-slate-800 font-mono">75.86%</div>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 font-mono">Recall</span>
              <div className="text-base font-bold text-slate-800 font-mono">63.22%</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   PROJECT 02: 3D Kidney Medical Imaging & Volumetric Slices Viewer
   ========================================================================= */
export const Kidney3DMedicalDemo: React.FC = () => {
  const [sliceIndex, setSliceIndex] = useState<number>(16);
  const [filterMode, setFilterMode] = useState<'raw' | 'gaussian' | 'otsu' | 'segmentation'>('segmentation');

  return (
    <div className="bg-white text-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 text-xs shadow-2xs">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            OrganMNIST3D Pipeline
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            Volumetric Kidney Preprocessing & Spatial Segmentation
          </h4>
        </div>

        {/* Filter / Stage Pipeline */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {[
            { id: 'raw', label: '1. Raw Slice' },
            { id: 'gaussian', label: '2. Gaussian Filter' },
            { id: 'otsu', label: '3. Otsu Mask' },
            { id: 'segmentation', label: '4. Segmented Organ' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setFilterMode(mode.id as any)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                filterMode === mode.id
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Slice Canvas Viewport */}
        <div className="md:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[220px] relative">
          
          <div className="w-full flex justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span>Axial Slice: Z = {sliceIndex} / 32</span>
            <span className="text-blue-600 font-semibold">OrganMNIST3D (28×28×28 Voxel Grid)</span>
          </div>

          {/* Visual Simulated Kidney Slice */}
          <div className="relative w-44 h-44 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
            
            {/* Background Anatomical Noise */}
            <div
              className={`absolute inset-0 bg-gradient-radial from-slate-300/30 via-slate-200/40 to-transparent transition-opacity duration-300 ${
                filterMode === 'raw' ? 'opacity-80' : 'opacity-20'
              }`}
            />

            {/* Kidney Organ Shape */}
            <div
              style={{
                transform: `scale(${0.7 + (sliceIndex / 32) * 0.4}) rotate(-12deg)`,
              }}
              className={`w-28 h-20 rounded-[45%_55%_65%_35%/50%_45%_55%_50%] transition-all duration-300 flex items-center justify-center ${
                filterMode === 'raw'
                  ? 'bg-slate-400 border border-slate-400 opacity-70'
                  : filterMode === 'gaussian'
                  ? 'bg-slate-400 blur-[2px] opacity-80'
                  : filterMode === 'otsu'
                  ? 'bg-slate-900 border-2 border-slate-900 text-white font-mono text-[10px]'
                  : 'bg-blue-500/20 border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.25)]'
              }`}
            >
              {filterMode === 'segmentation' && (
                <div className="text-[10px] font-mono font-bold text-blue-700">
                  Dice: 85.7%
                </div>
              )}
            </div>

            {/* Bounding Box HUD in segmentation mode */}
            {filterMode === 'segmentation' && (
              <div className="absolute inset-4 border border-dashed border-blue-500/60 rounded pointer-events-none flex flex-col justify-between p-1 text-[9px] font-mono text-blue-600">
                <span>ROI: [12, 14, {sliceIndex}]</span>
                <span className="self-end">Vol: 1,420 voxels</span>
              </div>
            )}
          </div>

          {/* Slice Slider Control */}
          <div className="w-full max-w-xs mt-3 flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500">Z=0</span>
            <input
              type="range"
              min="0"
              max="32"
              value={sliceIndex}
              onChange={(e) => setSliceIndex(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] font-mono text-slate-500">Z=32</span>
          </div>

        </div>

        {/* Quantitative Metrics & Methodology Card */}
        <div className="md:col-span-5 space-y-3 bg-[#F8FAFC] p-3.5 rounded-lg border border-slate-200">
          
          <div className="text-[11px] font-mono text-slate-800 font-semibold mb-1">
            Volumetric Segmentation Results
          </div>

          <div className="space-y-2">
            <div className="bg-white p-2.5 rounded border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">Dice Similarity Coefficient</span>
              <span className="font-mono font-bold text-blue-600 text-sm">85.7%</span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">Intersection over Union (IoU)</span>
              <span className="font-mono font-bold text-slate-900 text-sm">78.4%</span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">Voxel Sensitivity</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">90.6%</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
            Combines 3D spatial filtering with connected-component morphological isolation to preserve fine renal cortex structures.
          </p>

        </div>

      </div>

    </div>
  );
};

/* =========================================================================
   PROJECT 03: Clinical Report NLP & Summarizer (Tesseract + BART + T5)
   ========================================================================= */
export const MedicalNlpDemo: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'bart' | 't5'>('bart');
  const [activeReport, setActiveReport] = useState<number>(0);

  const reports = [
    {
      title: 'Diagnostic Renal Ultrasound',
      rawText: 'EXAM: Renal US. Right kidney measures 10.4 cm, normal cortical thickness. No hydronephrosis or calculi. Left kidney measures 10.8 cm with 4mm simple cortical cyst in mid-pole without internal septations. IMPRESSION: Unremarkable bilaterally except solitary benign left renal cyst.',
      bartSummary: 'Patient has normal kidney sizes with healthy cortical thickness. The right kidney is clear. The left kidney contains a small, harmless 4mm simple fluid cyst that requires no invasive intervention.',
      t5Summary: 'Both kidneys are normal in size. A small benign cyst was identified in the left kidney, which is a common non-cancerous finding.',
    },
    {
      title: 'Comprehensive Blood Panel',
      rawText: 'TEST: Serum Creatinine 0.92 mg/dL (Ref: 0.70-1.30). eGFR > 90 mL/min/1.73m2. BUN 14 mg/dL (Ref: 7-20). Fasting Glucose 94 mg/dL. HbA1c 5.4% (Ref < 5.7%). IMPRESSION: Normal renal function and glycemic parameters.',
      bartSummary: 'All renal function indicators (creatinine, BUN, eGFR) and blood sugar markers are within healthy standard clinical ranges.',
      t5Summary: 'Kidney filtration and blood glucose parameters are completely normal.',
    },
  ];

  const current = reports[activeReport];

  return (
    <div className="bg-white text-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 text-xs shadow-2xs">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            Clinical NLP Pipeline
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            OCR Extraction & Transformer Abstractive Summarization
          </h4>
        </div>

        {/* Model Comparator Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveModel('bart')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              activeModel === 'bart'
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            BART Transformer
          </button>
          <button
            onClick={() => setActiveModel('t5')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              activeModel === 't5'
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            T5 Model
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left: Input Diagnostic Clinical Text */}
        <div className="md:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200 text-[11px] font-mono">
              <span className="text-slate-500">Step 1: Tesseract OCR Input</span>
              <div className="flex gap-1">
                {reports.map((r, i) => (
                  <button
                    key={r.title}
                    onClick={() => setActiveReport(i)}
                    className={`px-1.5 py-0.5 rounded text-[9px] cursor-pointer ${
                      activeReport === i
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Sample {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1">
              {current.title}
            </div>
            <p className="text-[11px] font-mono text-slate-700 bg-white p-2.5 rounded border border-slate-200 leading-relaxed">
              {current.rawText}
            </p>
          </div>

          <div className="text-[10px] text-slate-500 pt-2 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Entities Normalized & Passed to {activeModel.toUpperCase()}</span>
          </div>
        </div>

        {/* Right: Patient-Friendly Synthesized Output */}
        <div className="md:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200 text-[11px] font-mono">
              <span className="text-blue-700 font-bold">Step 2: Patient-Friendly Abstractive Summary</span>
              <span className="text-[10px] text-slate-500 font-mono">Model: {activeModel.toUpperCase()}</span>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-lg text-slate-800 leading-relaxed text-xs">
              <span className="font-semibold text-blue-900 block mb-1 text-[11px]">
                Clinical Synthesis:
              </span>
              {activeModel === 'bart' ? current.bartSummary : current.t5Summary}
            </div>
          </div>

          {/* ROUGE Metric Verification */}
          <div className="mt-3 pt-2 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-1.5 rounded border border-slate-200">
              <div className="text-[9px] text-slate-500 font-mono">ROUGE-1</div>
              <div className="text-xs font-bold text-slate-900 font-mono">46.2%</div>
            </div>
            <div className="bg-white p-1.5 rounded border border-slate-200">
              <div className="text-[9px] text-slate-500 font-mono">ROUGE-2</div>
              <div className="text-xs font-bold text-slate-900 font-mono">28.5%</div>
            </div>
            <div className="bg-white p-1.5 rounded border border-slate-200">
              <div className="text-[9px] text-slate-500 font-mono">ROUGE-L</div>
              <div className="text-xs font-bold text-blue-600 font-mono">41.3%</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

/* =========================================================================
   PROJECT 04: UNSW-NB15 Network Intrusion Detection & Multi-Class Analyzer
   ========================================================================= */
export const NetworkIdsDemo: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('Exploits');

  const attackClasses = [
    { name: 'Normal', share: '45.0%', count: '37,000', risk: 'Low', accuracy: '94.2%' },
    { name: 'Generic', share: '22.9%', count: '18,871', risk: 'High', accuracy: '89.4%' },
    { name: 'Exploits', share: '13.5%', count: '11,132', risk: 'Critical', accuracy: '82.1%' },
    { name: 'Fuzzers', share: '7.4%', count: '6,062', risk: 'Medium', accuracy: '78.5%' },
    { name: 'DoS', share: '5.0%', count: '4,089', risk: 'High', accuracy: '80.3%' },
    { name: 'Reconnaissance', share: '4.2%', count: '3,496', risk: 'Medium', accuracy: '84.6%' },
  ];

  const current = attackClasses.find((c) => c.name === selectedClass) || attackClasses[0];

  return (
    <div className="bg-white text-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 text-xs shadow-2xs">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            UNSW-NB15 Benchmark (82,332 Records)
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            Multi-Class Intrusion Classifier & Decision Matrix
          </h4>
        </div>

        <div className="text-[11px] font-mono text-slate-500">
          Random Forest: <span className="text-blue-600 font-bold">86.23% Accuracy</span> | Macro-F1: <span className="text-slate-800 font-bold">57.52%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Class Selection Buttons */}
        <div className="md:col-span-5 space-y-1.5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
            Select Traffic Category (10 Categories):
          </div>
          {attackClasses.map((ac) => (
            <button
              key={ac.name}
              onClick={() => setSelectedClass(ac.name)}
              className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                selectedClass === ac.name
                  ? 'bg-blue-50 border-blue-300 text-blue-800 font-bold shadow-xs'
                  : 'bg-[#F8FAFC] border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{ac.name}</span>
              <span className="font-mono text-[10px] text-slate-500">
                {ac.share} ({ac.accuracy})
              </span>
            </button>
          ))}
        </div>

        {/* Feature Importance & Model Prediction Profile */}
        <div className="md:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900">{current.name} Traffic Profile</span>
              <span className="text-[10px] font-mono text-slate-500 block">
                Official Test Split Volume: {current.count} records
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                current.risk === 'Critical'
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : current.risk === 'High'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : current.risk === 'Medium'
                  ? 'bg-slate-200 text-slate-700 border border-slate-300'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {current.risk} Risk
            </span>
          </div>

          {/* Key Attributed Features */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Top Protocol Attributed Features (Gini Importance):
            </div>
            {[
              { name: 'sttl (Source to destination time-to-live)', weight: '34.2%' },
              { name: 'ct_state_ttl (State TTL counter)', weight: '22.8%' },
              { name: 'dbytes (Destination to source transaction bytes)', weight: '18.4%' },
              { name: 'sload (Source bits per second)', weight: '14.1%' },
            ].map((feat) => (
              <div key={feat.name} className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-700 font-mono">
                  <span className="truncate max-w-[240px]">{feat.name}</span>
                  <span className="text-blue-600 font-bold">{feat.weight}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: feat.weight }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-200 flex justify-between">
            <span>Model: Scikit-Learn Random Forest</span>
            <span>Evaluated On: 82,332 records</span>
          </div>
        </div>

      </div>

    </div>
  );
};

/* =========================================================================
   PROJECT 05: Real-Time Age & Gender Detection System (24 FPS Stream)
   ========================================================================= */
export const FaceVisionDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);

  return (
    <div className="bg-white text-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 text-xs shadow-2xs">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            OpenCV + Deep CNN Pipeline
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            Real-Time Face Region Extraction & Dual Demographic Inference
          </h4>
        </div>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-mono text-[11px] border border-slate-200 transition-colors cursor-pointer"
        >
          {isRunning ? <RotateCcw className="w-3.5 h-3.5 text-blue-600" /> : <Play className="w-3.5 h-3.5 text-blue-600" />}
          <span>{isRunning ? 'Streaming Live (24 FPS)' : 'Stream Paused'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Simulated Camera Viewport */}
        <div className="md:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-lg p-3 relative h-48 flex items-center justify-center overflow-hidden">
          
          {/* Video Grid HUD */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-50 pointer-events-none" />

          {/* Face Bounding Box Overlay */}
          <div className="relative w-36 h-40 border-2 border-blue-600 rounded-lg bg-blue-50/40 flex flex-col justify-between p-2 shadow-sm">
            
            {/* HUD Header */}
            <div className="bg-white text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-mono border border-blue-200 flex justify-between shadow-2xs">
              <span>FACE #01</span>
              <span>CONF: 98.4%</span>
            </div>

            {/* Facial Landmark Tracking Crosshairs */}
            <div className="flex justify-around items-center opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </div>

            {/* Prediction Label */}
            <div className="bg-white text-slate-900 p-1.5 rounded text-[10px] font-mono border border-slate-200 shadow-2xs">
              <div className="text-blue-700 font-bold">Female (92.3% Acc)</div>
              <div className="text-slate-600">Age: 20-22 yrs (MAE 5.1y)</div>
            </div>

          </div>

          {/* Telemetry Indicator */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            <span>24.2 FPS • LATENCY: 41ms</span>
          </div>
        </div>

        {/* Metrics Separation Card */}
        <div className="md:col-span-5 space-y-3 bg-[#F8FAFC] p-3.5 rounded-lg border border-slate-200">
          
          <div className="text-[11px] font-mono text-slate-800 font-semibold mb-1">
            Empirical Results (Clear Separation)
          </div>

          <div className="space-y-2">
            <div className="bg-white p-2 rounded border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">Gender Classification Accuracy</span>
              <span className="font-mono font-bold text-blue-600 text-sm">92.3%</span>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">Age Estimation (MAE)</span>
              <span className="font-mono font-bold text-slate-800 text-sm">5.1 Years</span>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">Real-Time Inference Throughput</span>
              <span className="font-mono font-bold text-slate-900 text-sm">24 FPS</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed">
            Note: Age is measured strictly in continuous Mean Absolute Error (MAE), while gender is evaluated via binary classification accuracy.
          </p>

        </div>

      </div>

    </div>
  );
};
