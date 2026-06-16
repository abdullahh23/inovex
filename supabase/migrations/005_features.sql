-- Migration 005: Add invoice status, carrier tracking, payment method

-- Add status column to invoices (paid/unpaid)
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'unpaid';
ALTER TABLE invoices ADD CONSTRAINT invoices_status_check CHECK (status IN ('paid', 'unpaid'));

-- Add carrier_name to invoices for history queries
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS carrier_name text NOT NULL DEFAULT '';

-- Add payment_method to invoices
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT '';

-- Create indexes
CREATE INDEX IF NOT EXISTS invoices_status_idx ON invoices(status);
CREATE INDEX IF NOT EXISTS invoices_carrier_name_idx ON invoices(carrier_name);
