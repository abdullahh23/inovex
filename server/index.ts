import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { extractFromFile, validateFile } from './ai/extraction.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8787;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

app.use(cors({ origin: CLIENT_ORIGIN === '*' ? true : CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF, JPG, PNG, or WEBP files are allowed'));
  },
});

async function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return next();
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { user }, error } = await supabase.auth.getUser(header.slice(7));
  if (error || !user) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }
  next();
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitInfo>();
const LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 60;

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
  const now = Date.now();

  let info = rateLimits.get(ip);
  if (!info || now > info.resetTime) {
    info = {
      count: 0,
      resetTime: now + LIMIT_WINDOW_MS,
    };
  }

  if (info.count >= MAX_REQUESTS) {
    res.status(429).json({ success: false, error: 'Too many extraction requests. Please wait and try again later.' });
    return;
  }

  info.count++;
  rateLimits.set(ip, info);
  next();
}

app.post('/api/extract', requireAuth, rateLimiter, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file uploaded' });
      return;
    }

    // File validation
    const fileError = validateFile(req.file.mimetype, req.file.size);
    if (fileError) {
      res.status(400).json({ success: false, error: fileError });
      return;
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      res.status(500).json({ success: false, error: 'OpenRouter API key not configured on server' });
      return;
    }

    const model = process.env.OPENROUTER_MODEL || 'openrouter/free';

    const mock = process.env.AI_MOCK === 'true';
    if (mock) {
      res.json({
        success: true,
        data: {
          loadNumber: 'MOCK-001',
          brokerName: 'Mock Broker LLC',
          pickupDate: '2025-01-15',
          grossAmount: 2500,
          originCity: 'Chicago',
          originState: 'IL',
          destinationCity: 'Dallas',
          destinationState: 'TX',
        },
      });
      return;
    }

    console.log(`[Extract] Processing ${req.file.originalname} (${req.file.mimetype}, ${(req.file.size / 1024).toFixed(1)}KB)`);
    const result = await extractFromFile(req.file.buffer, req.file.mimetype, apiKey, model);
    res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Extraction failed';
    console.error('[Extract] Error:', message);
    res.status(500).json({ success: false, error: message });
  }
});

// Serve built frontend in production
// In production: dist-server/server/index.js -> ../../dist
// In dev with tsx: server/index.ts -> ../dist (not used)
const distPath = path.resolve(__dirname, '..', 'dist');
const distPath2 = path.resolve(__dirname, '..', '..', 'dist');
const finalDistPath = fs.existsSync(distPath) ? distPath : distPath2;
app.use(express.static(finalDistPath));
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(finalDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
