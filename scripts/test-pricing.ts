import { calculateEstimate } from '../src/lib/pricingEngine';
import { PricingPackage, PricingItem } from '../src/types/pricing';

const mockPackage: PricingPackage = {
  packageId: 'pkg1',
  name: 'Premium',
  description: 'Premium package',
  baseRate: 2000,
  unit: 'sqft',
  features: [],
  recommended: true,
  isActive: true
};

const mockItems: PricingItem[] = [
  {
    itemId: 'item1',
    categoryId: 'cat1',
    name: 'Italian Marble',
    description: '',
    unit: 'sqft',
    price: 500,
    pricingType: 'per_sqft',
    isActive: true
  },
  {
    itemId: 'item2',
    categoryId: 'cat2',
    name: 'Demolition Fee',
    description: '',
    unit: 'lumpsum',
    price: 50000,
    pricingType: 'fixed',
    isActive: true
  },
  {
    itemId: 'item3',
    categoryId: 'cat3',
    name: 'GST',
    description: '',
    unit: '%',
    price: 18,
    pricingType: 'percentage',
    isActive: true
  }
];

console.log("Running Pricing Engine Simulation...");
const result = calculateEstimate({
  areaSqft: 1000,
  selectedPackage: mockPackage,
  selectedItems: mockItems,
  discountPercentage: 5,
  discountAmount: 10000
});

console.log(JSON.stringify(result, null, 2));
