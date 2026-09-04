import { PricingPackage, PricingItem, QuoteCalculation, QuoteCalculationLineItem } from '@/types/pricing';

export interface PricingEngineInput {
  areaSqft: number;
  selectedPackage: PricingPackage | null;
  selectedItems: PricingItem[];
  discountAmount?: number; // Fixed amount discount
  discountPercentage?: number; // Percentage discount (e.g. 5 for 5%)
}

/**
 * The Galaxy Interior Dynamic Pricing Engine.
 * Calculates a complete ledger and estimated total based strictly on dynamic inputs,
 * ensuring no hardcoded prices exist in the frontend.
 */
export function calculateEstimate(input: PricingEngineInput): QuoteCalculation {
  const { areaSqft, selectedPackage, selectedItems, discountAmount = 0, discountPercentage = 0 } = input;
  
  const lineItems: QuoteCalculationLineItem[] = [];
  let baseCost = 0;
  let addonsCost = 0;
  
  // 1. Calculate Base Package Cost
  if (selectedPackage) {
    const total = selectedPackage.baseRate * areaSqft;
    baseCost = total;
    
    lineItems.push({
      id: selectedPackage.packageId,
      name: `Base Package: ${selectedPackage.name}`,
      type: 'package',
      description: `${selectedPackage.baseRate} per sq.ft × ${areaSqft} sq.ft`,
      rate: selectedPackage.baseRate,
      quantity: areaSqft,
      total: total
    });
  }

  // 2. Separate Items by Pricing Type
  const perSqftItems = selectedItems.filter(i => i.pricingType === 'per_sqft');
  const fixedItems = selectedItems.filter(i => i.pricingType === 'fixed');
  const percentageItems = selectedItems.filter(i => i.pricingType === 'percentage');

  // 3. Process Per-Sqft Addons
  perSqftItems.forEach(item => {
    const total = item.price * areaSqft;
    addonsCost += total;
    
    lineItems.push({
      id: item.itemId,
      name: item.name,
      type: 'addon_per_sqft',
      description: `${item.price} per sq.ft × ${areaSqft} sq.ft`,
      rate: item.price,
      quantity: areaSqft,
      total: total
    });
  });

  // 4. Process Fixed Addons
  fixedItems.forEach(item => {
    const total = item.price;
    addonsCost += total;
    
    lineItems.push({
      id: item.itemId,
      name: item.name,
      type: 'addon_fixed',
      description: 'Fixed cost',
      rate: item.price,
      quantity: 1,
      total: total
    });
  });

  // 5. Calculate Interim Subtotal (before percentages)
  let currentSubtotal = baseCost + addonsCost;

  // 6. Process Percentage Addons (e.g., Location Adjustment, Complexity Multiplier, Taxes)
  let taxesAndPercentageFees = 0;
  percentageItems.forEach(item => {
    // Percentage is applied to the running currentSubtotal (Base + PerSqft + Fixed)
    const total = currentSubtotal * (item.price / 100);
    taxesAndPercentageFees += total;
    
    lineItems.push({
      id: item.itemId,
      name: item.name,
      type: 'addon_percentage',
      description: `${item.price}% of ${currentSubtotal}`,
      rate: item.price,
      quantity: 1,
      total: total
    });
  });

  const fullSubtotal = currentSubtotal + taxesAndPercentageFees;

  // 7. Process Discounts
  let finalDiscount = 0;
  
  if (discountPercentage > 0) {
    const discountCalc = fullSubtotal * (discountPercentage / 100);
    finalDiscount += discountCalc;
    lineItems.push({
      id: 'discount_pct',
      name: `Discount (${discountPercentage}%)`,
      type: 'discount',
      description: 'Promotional discount',
      rate: discountPercentage,
      quantity: 1,
      total: discountCalc,
      isDeduction: true
    });
  }

  if (discountAmount > 0) {
    finalDiscount += discountAmount;
    lineItems.push({
      id: 'discount_fixed',
      name: 'Fixed Discount',
      type: 'discount',
      description: 'Manual adjustment',
      rate: discountAmount,
      quantity: 1,
      total: discountAmount,
      isDeduction: true
    });
  }

  // 8. Final Calculation
  const finalTotal = fullSubtotal - finalDiscount;

  return {
    area: areaSqft,
    baseCost,
    addonsCost,
    subtotal: fullSubtotal, // Represents Total before discounts
    taxes: taxesAndPercentageFees, // Using taxes for all percentage modifiers
    discount: finalDiscount,
    finalTotal: Math.max(0, finalTotal), // Ensure we never go negative
    lineItems
  };
}
