import React, { useMemo, useState } from 'react';
import Card from '../components/Card.jsx';
import Metric from '../components/Metric.jsx';
import YoloMock from '../components/YoloMock.jsx';

const SAMPLE_IMG = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'; // wildlife-like image

function randomBoxes(count) {
  const labels = ['deer', 'boar', 'rabbit', 'bird', 'fox', 'bear'];
  return Array.from({ length: count }).map(() => {
    const w = 10 + Math.random() * 20;
    const h = 8 + Math.random() * 18;
    const x = Math.random() * (100 - w);
    const y = Math.random() * (100 - h);
    const score = 0.75 + Math.random() * 0.2;
    const label = labels[Math.floor(Math.random() * labels.length)];
    const color = Math.random() > 0.5 ? '#10B981' : '#8B5CF6';
    return { x, y, w, h, score, label, color };
  });
}

export default function Analysis() {
  const [running, setRunning] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [stats, setStats] = useState({ objects: 0, species: 0, accuracy: 0.9, fp: 0, fn: 0 });

  const canRun = !running;

  const runAnalysis = async () => {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 900)); // simulate processing
    const newBoxes = randomBoxes(6 + Math.floor(Math.random() * 6));
    setBoxes(newBoxes);
    const species = new Set(newBoxes.map((b) => b.label)).size;
    const fp = Math.floor(Math.random() * 3);
    const fn = Math.floor(Math.random() * 2);
    const accuracy = 0.88 + Math.random() * 0.08;
    setStats({ objects: newBoxes.length, species, fp, fn, accuracy });
    setRunning(false);
  };

  const summaryText = useMemo(() => {
    return `Detected ${stats.objects} objects across ${stats.species} species. Accuracy ${Math.round(stats.accuracy * 100)}%. FP ${stats.fp}, FN ${stats.fn}.`;
  }, [stats]);

  return (
    <div className="space-y-6">
      <Card
        title="YOLO Analysis"
        subtitle="Run object detection and review results"
        actions={
          <button
            onClick={runAnalysis}
            disabled={!canRun}
            className={`px-4 py-2 rounded-xl text-white ${running ? 'bg-brand-secondary/60' : 'bg-brand-primary'} disabled:opacity-60`}
          >
            {running ? 'Analyzing...' : 'Run Analysis'}
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <YoloMock imgSrc={SAMPLE_IMG} boxes={boxes} />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Metric label="Objects" value={stats.objects} />
              <Metric label="Species" value={stats.species} />
              <Metric label="Accuracy" value={`${Math.round(stats.accuracy * 100)}%`} tone="success" />
              <Metric label="Detections" value={boxes.length} />
              <Metric label="False Positives" value={stats.fp} tone="warn" />
              <Metric label="Missed" value={stats.fn} tone="error" />
            </div>
            <div className="text-sm text-brand-text/80">{summaryText}</div>
          </div>
        </div>
      </Card>

      <Card title="Detected Objects" subtitle="Listing of mock detections">
        {boxes.length === 0 ? (
          <div className="text-sm text-brand-text/60">No detections yet. Click "Run Analysis".</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boxes.map((b, i) => (
              <div key={i} className="rounded-xl border border-black/5 p-3 bg-white/70">
                <div className="text-sm font-semibold capitalize">{b.label}</div>
                <div className="text-xs text-brand-text/60">Confidence: {Math.round(b.score * 100)}%</div>
                <div className="mt-2 h-2 w-full bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${Math.round(b.score * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
