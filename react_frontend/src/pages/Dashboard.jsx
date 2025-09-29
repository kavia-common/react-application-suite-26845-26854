import React from 'react';
import Card from '../components/Card.jsx';
import Metric from '../components/Metric.jsx';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Legend } from 'recharts';

const trendData = [
  { name: 'Mon', detections: 24, accuracy: 0.86 },
  { name: 'Tue', detections: 31, accuracy: 0.89 },
  { name: 'Wed', detections: 28, accuracy: 0.88 },
  { name: 'Thu', detections: 41, accuracy: 0.92 },
  { name: 'Fri', detections: 38, accuracy: 0.9 },
  { name: 'Sat', detections: 52, accuracy: 0.93 },
  { name: 'Sun', detections: 47, accuracy: 0.91 }
];

const distData = [
  { name: 'Mobility', value: 62 },
  { name: 'Non-Mobility', value: 38 }
];
const COLORS = ['#10B981', '#8B5CF6'];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Quick Upload"
          subtitle="Import new images or videos for analysis"
          actions={<a href="/upload" className="px-3 py-2 rounded-xl bg-brand-primary text-white">Open</a>}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Metric label="Total Detections (wk)" value="261" />
            <Metric label="Avg Accuracy" value="91%" tone="success" />
            <Metric label="Images" value="132" />
            <Metric label="Videos" value="24" />
          </div>
        </Card>

        <Card title="Results Snapshot" subtitle="Latest YOLO run overview">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Objects" value="19" />
            <Metric label="Species" value="7" />
            <Metric label="False Positives" value="2" tone="warn" />
            <Metric label="Missed" value="1" tone="error" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Detections Trend" subtitle="Weekly activity" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorDet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="detections" stroke="#8B5CF6" fill="url(#colorDet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Mobility Distribution" subtitle="Mobility vs Non-Mobility">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distData} dataKey="value" nameKey="name" outerRadius={80} innerRadius={40} label>
                  {distData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
