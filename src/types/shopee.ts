export interface TitleOption {
  type: 'seo_rank' | 'ctr_magnet' | 'shopee_mall' | 'long_tail';
  label: string;
  title: string;
  charCount: number;
  score: number;
  formulaBreakdown: {
    brand: string;
    category: string;
    primaryKeyword: string;
    feature: string;
    specOrVariant: string;
  };
  explanation: string;
}

export interface ShopeeAdsTip {
  keyword: string;
  matchType: string;
  bidEstimate: string;
  competition: string;
  strategy: string;
}

export interface PhotoSlotGuide {
  slot: number;
  name: string;
  focus: string;
  importance: string;
}

export interface VoucherSuggestion {
  name: string;
  amount: string;
  minSpend: string;
}

export interface OptimizationData {
  productSummary: string;
  titles: TitleOption[];
  keywords: {
    highVolume: string[];
    longTail: string[];
    seasonalOrTrending: string[];
    hashtagTags: string;
    shopeeAdsTips: ShopeeAdsTip[];
  };
  description: {
    fullText: string;
    sections: {
      hook: string;
      keyBenefits: string[];
      specifications: string;
      sizeOrUsageGuide: string;
      guaranteeAndShipping: string;
      callToAction: string;
    };
  };
  visualOptimization: {
    coverPhotoStrategy: string;
    photoSlots: PhotoSlotGuide[];
    videoRecommendation: string;
  };
  pricingStrategy: {
    recommendedOriginalPrice: number;
    recommendedDiscountPrice: number;
    discountPercent: number;
    psychologicalTriggers: string[];
    voucherSuggestions: VoucherSuggestion[];
  };
  shopeeAlgorithmSecrets: string[];
}

export interface AuditViolation {
  wordOrPhrase: string;
  reason: string;
  severity: 'TINGGI' | 'SEDANG' | 'RENDAH';
  recommendation: string;
}

export interface AuditResult {
  overallScore: number;
  seoTitleScore: number;
  descriptionScore: number;
  policyRisk: 'AMAN' | 'PERINGATAN' | 'BAHAYA';
  policyRiskExplanation: string;
  detectedViolations: AuditViolation[];
  titleAudit: {
    length: number;
    status: string;
    missingElements: string[];
    critique: string;
  };
  descriptionAudit: {
    readability: string;
    hasSizeChart: boolean;
    hasGuarantee: boolean;
    hasMobileFormatting: boolean;
    critique: string;
  };
  strengths: string[];
  weaknesses: string[];
  actionSteps: string[];
  improvedTitle: string;
  estimatedTrafficIncrease: string;
}

export interface KeywordResearchResult {
  seedKeyword: string;
  estimatedSearchTrend: string;
  topKeywords: {
    keyword: string;
    searchIntent: string;
    competitionLevel: string;
    monthlySearchEstimate: string;
    recommendedTag: boolean;
  }[];
  longTailKeywords: {
    keyword: string;
    conversionPotential: string;
    reason: string;
  }[];
  shopeeAdsStrategy: {
    broadMatchBid: string;
    exactMatchBid: string;
    budgetTips: string;
  };
  copyPasteTags: string;
}

export interface PresetProduct {
  id: string;
  name: string;
  badge: string;
  category: string;
  brand: string;
  sellingPoints: string;
  targetAudience: string;
  targetPrice: number;
  currentTitle?: string;
  currentDescription?: string;
}
