export type UserRole = "user" | "catechist" | "reviewer" | "admin";

export type ContentStatus =
  | "draft"
  | "review"
  | "approved"
  | "published"
  | "archived";

export type DataOriginType = "demo_sample" | "official_database";

export type VerificationState =
  | "unverified_demo"
  | "pending_imprimatur_check"
  | "verified_official";

export type LiturgicalSeason =
  | "advent"
  | "christmas"
  | "lent"
  | "easter_triduum"
  | "easter"
  | "ordinary_time";

export type LiturgicalColor = "green" | "white" | "red" | "purple" | "rose";

export type HymnCategory =
  | "ta_on"
  | "cau_nguyen"
  | "binh_an"
  | "gia_dinh"
  | "duc_me"
  | "giang_sinh"
  | "mua_chay"
  | "phuc_sinh"
  | "thieu_nhi";

export type TnttBranch =
  | "au_nhi"
  | "thieu_nhi"
  | "nghia_si"
  | "hiep_si"
  | "huynh_truong";

export interface BibleSource {
  id: string;
  code: string;
  name: string;
  imprimaturInfo: string;
  copyrightNotice: string;
  licenseStatus: string;
  isVerified: boolean;
  verificationNote: string;
}

export interface DevotionalImage {
  id: string;
  slug: string;
  title: string;
  theme: string;
  description: string;
  imageUrl: string;
  fallbackUrl: string;
  licenseType: string;
  usageRights: string;
  attribution: string;
  artStyleAssessment: string;
}

export interface ScripturePassage {
  id: string;
  bibleSourceId: string;
  bibleSource: BibleSource;
  bookName: string;
  bookAbbr: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  referenceLabel: string;
  passageText: string;
  status: ContentStatus;
  verificationState: VerificationState;
  verifiedBy: string;
  verifiedAt: string | null;
}

export interface LiturgicalDayInfo {
  id: string;
  liturgicalDate: string; // YYYY-MM-DD
  title: string;
  season: LiturgicalSeason;
  seasonLabelVi: string;
  liturgicalColor: LiturgicalColor;
  liturgicalColorLabelVi: string;
  liturgicalRank: string;
  liturgicalYear: string;
  sourceReference: string;
  isVerified: boolean;
}

export interface HymnItem {
  id: string;
  slug: string;
  title: string;
  composer: string;
  composerVerified: boolean;
  category: HymnCategory;
  categoryLabelVi: string;
  thumbnailUrl: string;
  legalSourceName: string;
  usageRights: string;
  listenUrl: string;
  youtubeVideoId?: string;
  allowDirectEmbed: boolean;
  durationLabel: string;
  status: ContentStatus;
}

export interface DailyDevotional {
  id: string;
  publishDate: string; // YYYY-MM-DD theo Asia/Ho_Chi_Minh
  themeTitle: string;
  liturgicalDay?: LiturgicalDayInfo;
  scripture: ScripturePassage;
  chibiImage: DevotionalImage;
  suggestedHymn: HymnItem;
  reflectionBody: string; // 100-150 từ
  reflectionWordCount: number;
  practicalAction: string;
  prayerText: string; // 40-80 từ
  prayerWordCount: number;
  isDemoData: boolean;
  dataOrigin: DataOriginType;
  verificationState: VerificationState;
  status: ContentStatus;
  reviewedBy: string;
  approvedBy: string;
  publishedAt: string | null;
}

export interface TraditionalPrayer {
  id: string;
  slug: string;
  title: string;
  latinTitle: string;
  category: string;
  content: string;
  sourceVerification: string;
  usageRights: string;
  isVerified: boolean;
}

export interface PrayerJournalEntry {
  id: string;
  title: string;
  prayerContent: string;
  intentionTag: string;
  prayerDate: string;
  isPrivate: true;
  isTemporaryLocal: boolean;
  createdAt: string;
}
