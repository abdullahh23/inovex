export interface Load {
  id: string;
  loadNumber: string;
  brokerName: string;
  pickupDate: string;
  grossAmount: number;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  source?: 'extract' | 'manual';
}

export interface CompanySettings {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  paymentInstructions: string;
  zelle: string;
  payoneer: string;
  bankInformation: string;
  cashApp: string;
  accountHolderName: string;
  dispatchPercentage: number;
  templateId?: string;
  companyLogo?: string;
  companyHeaderText?: string;
}

export interface CarrierSettings {
  carrierName: string;
  carrierAddress: string;
  mcNumber: string;
  carrierPhone: string;
}

export interface SavedCarrier {
  id: string;
  carrierName: string;
  carrierAddress: string;
  mcNumber: string;
  carrierPhone: string;
}

export interface WeeklyInvoice {
  id: string;
  weekLabel: string;
  loads: Load[];
  company: CompanySettings;
  carrier: CarrierSettings;
  invoiceNumber: string;
  invoiceDate: string;
}

export interface InvoiceRecord {
  id: string;
  userId: string;
  invoiceNumber: string;
  invoiceDate: string;
  weekLabel: string;
  dispatchPercentage: number;
  totalGrossRevenue: number;
  dispatchFee: number;
  status: 'paid' | 'unpaid';
  carrierName: string;
  paymentMethod: string;
  companySnapshot: CompanySettings;
  carrierSnapshot: CarrierSettings;
  createdAt: string;
}

export interface CarrierHistory {
  carrierName: string;
  totalLoads: number;
  totalInvoices: number;
  totalGrossAmount: number;
  totalDispatchFees: number;
  totalPaid: number;
  totalUnpaid: number;
}

