import { useRef, useState, useCallback } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { extractRateConfirmation } from '../lib/api';
import type { Load } from '../types';
import { generateId } from '../lib/calc';
import type { ExtractionResult } from '../../shared/schema';

interface UploadZoneProps {
  onLoadExtracted: (load: Load) => void;
  disabled?: boolean;
  disabledMessage?: string;
}

export function UploadZone({ onLoadExtracted, disabled, disabledMessage }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [lastFile, setLastFile]   = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (file.size > 20 * 1024 * 1024) { setError('File is too large. Maximum size is 20 MB.'); return; }
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (disabled) { setError(disabledMessage || 'Uploads are currently disabled for your account.'); return; }
    if (!allowed.includes(file.type)) { setError('Please upload a PDF or image file (JPG, PNG, WEBP).'); return; }

    setError(null);
    setLoading(true);
    setLastFile(file.name);

    try {
      const result = await extractRateConfirmation(file);
      if (!result.success || !result.data) {
        setError(result.error || 'Extraction failed. Make sure the file is a clear rate confirmation document.');
        setLoading(false);
        return;
      }
      const d: ExtractionResult = result.data;
      const load: Load = {
        id:               generateId(),
        loadNumber:       d.loadNumber       || '',
        brokerName:       d.brokerName       || '',
        pickupDate:       d.pickupDate       || '',
        grossAmount:      d.grossAmount      || 0,
        originCity:       d.originCity       || '',
        originState:      d.originState      || '',
        destinationCity:  d.destinationCity  || '',
        destinationState: d.destinationState || '',
      };
      onLoadExtracted(load);
    } catch {
      setError('Network error. Check your connection or server configurations.');
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [onLoadExtracted, disabled, disabledMessage]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload rate confirmation file"
        className={`
          border-2 border-dashed rounded-lg p-10 text-center cursor-pointer
          transition-all duration-200 relative
          ${dragging  ? 'border-signal bg-blue-50 dark:bg-blue-950/20 ring-2 ring-signal/20 scale-[0.995]'
                      : 'border-gray-200 dark:border-gray-700 hover:border-signal/50 dark:hover:border-signal/40 bg-white dark:bg-gray-900/40 hover:bg-blue-50/30 dark:hover:bg-blue-950/10'}
          ${loading   ? 'pointer-events-none opacity-70' : ''}
          ${disabled  ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !loading && !disabled && inputRef.current?.click()}
        onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !loading && !disabled) { e.preventDefault(); inputRef.current?.click(); } }}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }}
        />

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <Loader2 size={30} className="text-signal animate-spin" />
            <div>
              <div className="font-semibold text-ink dark:text-gray-200 text-sm">
                Processing Document...
              </div>
              <div className="text-xs text-steel dark:text-gray-400 mt-1">
                Analyzing layout &amp; extracting fields
              </div>
              {lastFile && <div className="text-[11px] text-steel/60 dark:text-gray-500 italic mt-1">{lastFile}</div>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-signal">
              <Upload size={21} />
            </div>
            <div>
              <div className="font-semibold text-ink dark:text-gray-200 text-sm">
                Drop Rate Confirmation here
              </div>
              <div className="text-xs text-steel dark:text-gray-400 mt-1.5">
                Supports PDF, JPG, PNG, or WEBP — up to 20 MB
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-ink dark:text-gray-200 hover:border-signal dark:hover:border-signal hover:text-signal shadow-sm px-4 py-2 rounded-md transition-colors"
            >
              Select File
            </button>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg text-red-700 dark:text-red-400 text-xs font-medium animate-fade-in">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}
    </div>
  );
}
