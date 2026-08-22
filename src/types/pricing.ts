export interface PricingCategory {
  categoryId: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export type PricingType = 'per_sqft' | 'fixed' | 'percentage';

export interface PricingItem {
  itemId: string;
  categoryId: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  pricingType: PricingType;
  isActive: boolean;
}

export interface PricingPackage {
  packageId: string;
  name: string;
  description: string;
  baseRate: number; // Cost per sqft
  unit: string;
  features: string[];
  recommended: boolean;
  isActive: boolean;
}

export interface QuoteCalculationLineItem {
  id: string;
  name: string;
  type: 'package' | 'addon_per_sqft' | 'addon_fixed' | 'addon_percentage' | 'discount' | 'tax';
  description: string;
  rate: number;
  quantity: number; // Usually 1 for fixed, or Area for per_sqft
  total: number;
  isDeduction?: boolean;
}

export interface QuoteCalculation {
  area: number;
  baseCost: number;
  addonsCost: number;
  subtotal: number;
  taxes: number;
  discount: number;
  finalTotal: number;
  lineItems: QuoteCalculationLineItem[];
}
