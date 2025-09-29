import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import UploadDropzone from '../components/UploadDropzone.jsx';

export default function Upload() {
  const [files, setFiles] = useState([]);

  return (
    <div className="space-y-6">
      <Card
        title="Upload & Import"
        subtitle="Drag and drop images or videos, or use the file picker."
      >
        <UploadDropzone onFiles={setFiles} />
      </Card>

      {files.length > 0 && (
        <Card title="Selected Files" subtitle="Review your selection before analysis">
          <ul className="list-disc pl-6 space-y-1 text-sm">
            {files.map((f, i) => (
              <li key={i}>{f.name} — {(f.size / 1024 / 1024).toFixed(2)} MB</li>
            ))}
          </ul>
          <div className="mt-4">
            <a href="/analysis" className="px-4 py-2 rounded-xl bg-brand-primary text-white">Proceed to Analysis</a>
          </div>
        </Card>
      )}
    </div>
  );
}
