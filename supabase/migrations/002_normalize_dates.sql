-- Migrate date columns from text to proper date types with fallback casting
BEGIN;

-- 1. Migrate public.loads.pickup_date
ALTER TABLE public.loads 
  ALTER COLUMN pickup_date TYPE date 
  USING (CASE WHEN pickup_date = '' THEN NULL ELSE pickup_date::date END);

-- 2. Migrate public.invoices.invoice_date
-- Casts MM/DD/YYYY text format to standard date type
ALTER TABLE public.invoices 
  ALTER COLUMN invoice_date TYPE date 
  USING (to_date(invoice_date, 'MM/DD/YYYY'));

-- 3. Migrate public.invoice_loads.pickup_date
ALTER TABLE public.invoice_loads 
  ALTER COLUMN pickup_date TYPE date 
  USING (CASE WHEN pickup_date = '' THEN NULL ELSE pickup_date::date END);

-- 4. Add performance indexes for date sorting and queries
CREATE INDEX IF NOT EXISTS loads_pickup_date_idx ON public.loads(pickup_date);
CREATE INDEX IF NOT EXISTS invoices_invoice_date_idx ON public.invoices(invoice_date);

COMMIT;
