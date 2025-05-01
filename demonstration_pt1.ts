export enum AccountIndustry {
  "Appliance Repair" = "Appliance Repair",
  "Tree Service" = "Tree Service",
  "Cleaning" = "Cleaning",
  "Electrical" = "Electrical",
  "Plumbing" = "Plumbing",
}

export enum AccountFeatures {
  "checkins" = "checkins",
  "reviews" = "reviews",
  "widgets" = "widgets",
}

export enum PublicContentDelay {
  "Immediately" = "immediately",
  "Tomorrow" = "tomorrow",
  "Never" = "never",
}

export enum PrivateReviewRating {
  "Never" = "never",
  "LessThan4" = "lessThan4",
  "LessThan5" = "lessThan5",
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export interface VisibilitySettings {
  makeNewJobsPublic: boolean;
  showJobsWithOnlyDescription: boolean;
  makeContentPublicAfter: PublicContentDelay;
  makeReviewsPublicAfter?: PublicContentDelay;
  hideReviewsUnder: PrivateReviewRating;
  makeCRMContentPublicAfter?: PublicContentDelay;
  makeMobileAppContentPublicAfter?: PublicContentDelay;
}

export interface BusinessContactInfo {
  businessPhone?: string;
  businessEmail?: string;
  businessContactUsLink?: string;
}

export interface MapSettings {
  icon: string;
  color: Color;
  maxZoom?: number;
  pinAccuracyFt?: number;
}

export interface SMSSettings {
  enabled?: boolean;
  number?: string;
  numberOrderId?: string;
  brandId?: string;
  campaignId?: string;
  status?:
    | "pendingBrand"
    | "pendingCampaign"
    | "pendingNumber"
    | "campaignError"
    | "ready";
}

export interface TagAutomation {
  skipAutomation: boolean;
  lastRunAt: number;
  lastRunById: string;
  lastRunDoneAt?: number;
}

export interface AccountSettings {
  checkInGoals?: number;
  reviewGoal?: number;
  defaultNumberOfPostsPerWeek: number;
  defaultPostScheduleDayOfWeek: number;
  defaultPostScheduleHour: number;
  autoPosting?: boolean;
  primaryReviewPropertyId?: string;
  package?: string;
  expectedWeeklyJobs?: number;
  mapSettings?: MapSettings;
  visibilitySettings?: VisibilitySettings;
  requireOwnSMSNumber?: boolean;
  smsSettings?: SMSSettings;
  tagAutomation?: TagAutomation;
  importMapping?: Record<string, string>;
  workSiteAgeWarningInDays?: number;
  enableMediaOnReviews?: boolean;
  sendAutomaticReviewFollowUps?: boolean;
  businessContactInfo?: BusinessContactInfo;
  hideInternalReviews?: boolean;
  showcaseOnlyPortfolio?: boolean;
}

export interface Account {
  name: string;
  industry?: AccountIndustry;
  features: AccountFeatures[];
  settings: AccountSettings;
  logo?: string;
  domain?: string;
  timezone: string;
  betas?: string[];
}

// Defaults
export const defaultVisibilitySettings: VisibilitySettings = {
  makeNewJobsPublic: true,
  showJobsWithOnlyDescription: false,
  makeContentPublicAfter: PublicContentDelay.Tomorrow,
  makeReviewsPublicAfter: PublicContentDelay.Immediately,
  hideReviewsUnder: PrivateReviewRating.LessThan4,
  makeCRMContentPublicAfter: PublicContentDelay.Tomorrow,
  makeMobileAppContentPublicAfter: PublicContentDelay.Tomorrow,
};

export const defaultAccountSettings: AccountSettings = {
  defaultNumberOfPostsPerWeek: 1,
  defaultPostScheduleDayOfWeek: 2,
  defaultPostScheduleHour: 9,
  hideInternalReviews: false,
  showcaseOnlyPortfolio: false,
};

export class AccountClass {
  private _data: Account;

  constructor(data: Partial<Account> = {}) {
    this._data = {
      name: "",
      features: [],
      settings: defaultAccountSettings,
      timezone: "UTC",
      ...data,
    };
  }

  // Basic getters/setters
  get name(): string {
    return this._data.name;
  }

  set name(name: string) {
    this._data.name = name;
  }

  get industry(): AccountIndustry | undefined {
    return this._data.industry;
  }

  set industry(industry: AccountIndustry | undefined) {
    this._data.industry = industry;
  }

  get features(): AccountFeatures[] {
    return this._data.features;
  }

  set features(features: AccountFeatures[]) {
    this._data.features = features;
  }

  // Settings getters/setters
  get settings(): AccountSettings {
    return this._data.settings;
  }

  set settings(settings: AccountSettings) {
    this._data.settings = settings;
  }

  public getSetting<T extends keyof AccountSettings>(
    name: T
  ): AccountSettings[T] {
    return this.settings[name];
  }

  public setSetting<T extends keyof AccountSettings>(
    name: T,
    value: AccountSettings[T]
  ): void {
    const settings: AccountSettings = this.settings || ({} as AccountSettings);

    if (value === undefined) {
      delete settings[name];
    } else {
      settings[name] = value;
    }
    this.settings = settings;
  }

  // Convert to plain object
  toJSON(): Account {
    return { ...this._data };
  }
}

// Example usage
const account = new AccountClass({
  name: "John's Plumbing",
  industry: AccountIndustry.Plumbing,
  features: [AccountFeatures.checkins, AccountFeatures.reviews],
  settings: {
    defaultNumberOfPostsPerWeek: 2,
    defaultPostScheduleDayOfWeek: 3,
    defaultPostScheduleHour: 10,
    visibilitySettings: {
      makeNewJobsPublic: true,
      showJobsWithOnlyDescription: false,
      makeContentPublicAfter: PublicContentDelay.Tomorrow,
      makeReviewsPublicAfter: PublicContentDelay.Immediately,
      hideReviewsUnder: PrivateReviewRating.LessThan4,
    },
  },
});

const test = account.getSetting("visibilitySettings");
