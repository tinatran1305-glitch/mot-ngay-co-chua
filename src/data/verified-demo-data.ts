import {
  BibleSource,
  DailyDevotional,
  DevotionalImage,
  HymnItem,
  TraditionalPrayer,
} from "@/types/catholic";
import { getDeterministicDaySeed, getVietnamDateIso } from "@/lib/date-vn";

export const VERIFIED_BIBLE_SOURCE: BibleSource = {
  id: "src-cgkpv-demo-unverified",
  code: "CGKPV_DEMO_UNVERIFIED",
  name: "Bản dịch tham khảo Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (Bản Demo — Chưa xác minh quyền sử dụng)",
  imprimaturInfo:
    "CHƯA XÁC MINH: Cần đối chiếu bản in có Imprimatur chính thức của HĐGMVN và xin phép sử dụng bản quyền trước khi đưa lên Production.",
  copyrightNotice:
    "Tình trạng quyền sử dụng: CHƯA XÁC MINH (Unverified). Chỉ dùng làm dữ liệu mẫu kiểm thử giao diện trong giai đoạn phát triển, tuyệt đối không dùng làm nội dung chính thức.",
  licenseStatus: "unverified_demo_only",
  isVerified: false,
  verificationNote:
    "Chưa có văn bản cấp phép bản quyền và chưa qua bước đối chiếu chữ chuẩn ấn bởi Ban Kiểm Duyệt Giáo Lý.",
};

export const DEVOTIONAL_IMAGES: DevotionalImage[] = [
  {
    id: "img-chua-giesu-cau-nguyen",
    slug: "chua-giesu-cau-nguyen",
    title: "Chúa Giêsu Cầu Nguyện (Vector SVG Placeholder)",
    theme: "Chúa Giêsu cầu nguyện",
    description:
      "Hình vector SVG cơ bản minh họa Chúa Giêsu chắp tay cầu nguyện trên nền pastel.",
    imageUrl: "/images/chibi/chua-giesu-cau-nguyen.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản (cần nâng cấp lên minh họa Chibi chi tiết).",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Hiện là hình ghép từ các khối hình học phẳng (hình tròn, elip, đường cong cơ bản), thiếu nét vẽ biểu cảm Chibi mềm mại.",
  },
  {
    id: "img-chua-giesu-va-dan-chien",
    slug: "chua-giesu-va-dan-chien",
    title: "Chúa Giêsu Và Đàn Chiên (Vector SVG Placeholder)",
    theme: "Chúa Giêsu và đàn chiên",
    description:
      "Hình vector SVG cơ bản minh họa Chúa Giêsu và hai chú chiên trắng.",
    imageUrl: "/images/chibi/chua-giesu-va-dan-chien.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Các chú chiên và nhân vật được ghép từ hình tròn cơ bản, chưa có chiều sâu minh họa Chibi.",
  },
  {
    id: "img-chua-giesu-voi-tre-em",
    slug: "chua-giesu-voi-tre-em",
    title: "Chúa Giêsu Với Trẻ Em (Vector SVG Placeholder)",
    theme: "Chúa Giêsu với trẻ em",
    description:
      "Hình vector SVG cơ bản minh họa Chúa Giêsu và hai em thiếu nhi.",
    imageUrl: "/images/chibi/chua-giesu-voi-tre-em.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Hình vẽ thiếu tay, nếp áo và biểu cảm khuôn mặt trẻ em còn quá sơ sài.",
  },
  {
    id: "img-chua-giesu-ben-bo-ho",
    slug: "chua-giesu-ben-bo-ho",
    title: "Chúa Giêsu Bên Bờ Hồ (Vector SVG Placeholder)",
    theme: "Chúa Giêsu bên bờ hồ",
    description:
      "Hình vector SVG cơ bản minh họa Chúa Giêsu bên bờ hồ và thuyền nhỏ.",
    imageUrl: "/images/chibi/chua-giesu-ben-bo-ho.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Bố cục vector tối giản, thuyền và sóng nước chỉ là các đường cong phẳng.",
  },
  {
    id: "img-chua-giesu-trong-vuon-hoa",
    slug: "chua-giesu-trong-vuon-hoa",
    title: "Chúa Giêsu Trong Vườn Hoa (Vector SVG Placeholder)",
    theme: "Chúa Giêsu trong vườn hoa",
    description:
      "Hình vector SVG cơ bản minh họa Chúa Giêsu giữa các chấm hoa tròn.",
    imageUrl: "/images/chibi/chua-giesu-trong-vuon-hoa.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Hoa chỉ là các hình tròn đồng tâm, nhân vật dùng lại khung hình học cũ.",
  },
  {
    id: "img-duc-me-maria",
    slug: "duc-me-maria",
    title: "Đức Mẹ Maria (Vector SVG Placeholder)",
    theme: "Đức Mẹ Maria",
    description:
      "Hình vector SVG cơ bản minh họa Đức Mẹ Maria trong khăn choàng xanh.",
    imageUrl: "/images/chibi/duc-me-maria.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Khăn choàng và tràng hạt chỉ là các nét vẽ hình học phẳng, thiếu vẻ dịu dàng tinh tế.",
  },
  {
    id: "img-thanh-giuse",
    slug: "thanh-giuse",
    title: "Thánh Cả Giuse (Vector SVG Placeholder)",
    theme: "Thánh Giuse",
    description:
      "Hình vector SVG cơ bản minh họa Thánh Giuse và cành hoa huệ.",
    imageUrl: "/images/chibi/thanh-giuse.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Hoa huệ chỉ gồm 3 hình tròn trắng ghép lại, phần râu và trang phục còn thô.",
  },
  {
    id: "img-cac-thien-than",
    slug: "cac-thien-than",
    title: "Các Thiên Thần (Vector SVG Placeholder)",
    theme: "Các thiên thần",
    description:
      "Hình vector SVG cơ bản minh họa thiên thần nhỏ có cánh trắng.",
    imageUrl: "/images/chibi/cac-thien-than.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Đôi cánh và khuôn mặt còn mang tính biểu tượng hình học đơn giản.",
  },
  {
    id: "img-canh-giang-sinh",
    slug: "canh-giang-sinh",
    title: "Cảnh Giáng Sinh (Vector SVG Placeholder)",
    theme: "Cảnh Giáng Sinh",
    description:
      "Hình vector SVG cơ bản minh họa máng cỏ và ngôi sao Bê-lem.",
    imageUrl: "/images/chibi/canh-giang-sinh.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Chỉ có khung mái gỗ sơ sài và hình tròn đại diện Chúa Hài Đồng, thiếu Đức Mẹ và Thánh Giuse.",
  },
  {
    id: "img-canh-phuc-sinh",
    slug: "canh-phuc-sinh",
    title: "Cảnh Phục Sinh (Vector SVG Placeholder)",
    theme: "Cảnh Phục Sinh",
    description:
      "Hình vector SVG cơ bản minh họa Chúa Giêsu trong ánh sáng vàng.",
    imageUrl: "/images/chibi/canh-phuc-sinh.svg",
    fallbackUrl: "/images/chibi/fallback-chibi.svg",
    licenseType: "original_project_svg_placeholder",
    usageRights:
      "File SVG tự vẽ thuộc dự án — hiện ở mức vector hình học đơn giản.",
    attribution: "Một Ngày Có Chúa (SVG Placeholder)",
    artStyleAssessment:
      "Chưa đạt chuẩn Chibi chi tiết: Gần như trùng lặp khung nhân vật với các hình khác, chỉ đổi màu nền sang vàng.",
  },
];

export const HYMN_LIBRARY: HymnItem[] = [
  {
    id: "hymn-khuc-ca-ta-on",
    slug: "khuc-ca-ta-on",
    title: "Khúc Ca Tạ Ơn",
    composer: "LM. Kim Long (Thông tin tham khảo — Chưa xác minh giấy phép phát)",
    composerVerified: false,
    category: "ta_on",
    categoryLabelVi: "Tạ ơn",
    thumbnailUrl: "/images/chibi/chua-giesu-trong-vuon-hoa.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube (Chưa có nguồn phát trực tiếp được cấp phép)",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Kh%C3%BAc+Ca+T%E1%BA%A1+%C6%A0n+Kim+Long+Th%C3%A1nh+Ca",
    allowDirectEmbed: false,
    durationLabel: "04:20",
    status: "draft",
  },
  {
    id: "hymn-kinh-hoa-binh",
    slug: "kinh-hoa-binh",
    title: "Kinh Hòa Bình",
    composer: "LM. Kim Long (Thông tin tham khảo — Chưa xác minh giấy phép phát)",
    composerVerified: false,
    category: "binh_an",
    categoryLabelVi: "Bình an",
    thumbnailUrl: "/images/chibi/chua-giesu-cau-nguyen.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube (Chưa có nguồn phát trực tiếp được cấp phép)",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Kinh+H%C3%B2a+B%C3%ACnh+Kim+Long+Th%C3%A1nh+Ca",
    allowDirectEmbed: false,
    durationLabel: "04:05",
    status: "draft",
  },
  {
    id: "hymn-chua-la-muc-tu",
    slug: "chua-la-muc-tu",
    title: "Chúa Là Mục Tử (Thánh Vịnh 22/23)",
    composer: "Thông tin tham khảo — Chưa xác minh tác giả bản thu cụ thể",
    composerVerified: false,
    category: "cau_nguyen",
    categoryLabelVi: "Cầu nguyện",
    thumbnailUrl: "/images/chibi/chua-giesu-va-dan-chien.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Ch%C3%BAa+L%C3%A0+M%E1%BB%A5c+T%E1%BB%AD+Th%C3%A1nh+V%E1%BB%8Bnh+22",
    allowDirectEmbed: false,
    durationLabel: "03:50",
    status: "draft",
  },
  {
    id: "hymn-cau-cho-cha-me",
    slug: "cau-cho-cha-me",
    title: "Cầu Cho Cha Mẹ",
    composer: "Phanxicô (Thông tin tham khảo — Chưa xác minh giấy phép phát)",
    composerVerified: false,
    category: "gia_dinh",
    categoryLabelVi: "Gia đình",
    thumbnailUrl: "/images/chibi/thanh-giuse.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=C%E1%BA%A7u+Cho+Cha+M%E1%BA%B9+Phanxic%C3%B4+Th%C3%A1nh+Ca",
    allowDirectEmbed: false,
    durationLabel: "04:45",
    status: "draft",
  },
  {
    id: "hymn-nguoi-me-cua-con",
    slug: "ung-khen-duc-me",
    title: "Linh Hồn Tôi Tung Hô Chúa (Magnificat)",
    composer: "LM. Kim Long (Thông tin tham khảo — Chưa xác minh giấy phép phát)",
    composerVerified: false,
    category: "duc_me",
    categoryLabelVi: "Đức Mẹ",
    thumbnailUrl: "/images/chibi/duc-me-maria.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Linh+H%E1%BB%93n+T%C3%B4i+Tung+H%C3%B4+Ch%C3%BAa+Kim+Long",
    allowDirectEmbed: false,
    durationLabel: "03:55",
    status: "draft",
  },
  {
    id: "hymn-dem-thanh-vo-cung",
    slug: "dem-thanh-vo-cung",
    title: "Đêm Thánh Vô Cùng (Silent Night)",
    composer: "Franz Xaver Gruber / Lời Việt: Hùng Lân (Chưa xác minh bản thu)",
    composerVerified: false,
    category: "giang_sinh",
    categoryLabelVi: "Giáng Sinh",
    thumbnailUrl: "/images/chibi/canh-giang-sinh.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Giai điệu gốc Public Domain nhưng bản thu âm cụ thể chưa xác minh quyền sử dụng.",
    listenUrl:
      "https://www.youtube.com/results?search_query=%C4%90%C3%AAm+Th%C3%A1nh+V%C3%B4+C%C3%B9ng+Th%C3%A1nh+Ca",
    allowDirectEmbed: false,
    durationLabel: "04:15",
    status: "draft",
  },
  {
    id: "hymn-con-nay-ve",
    slug: "chua-nhan-tu",
    title: "Lạy Chúa Con Đường Nào Chúa Đã Đi Qua",
    composer: "LM. Văn Chi (Thông tin tham khảo — Chưa xác minh giấy phép phát)",
    composerVerified: false,
    category: "mua_chay",
    categoryLabelVi: "Mùa Chay",
    thumbnailUrl: "/images/chibi/chua-giesu-ben-bo-ho.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Con+%C4%90%C6%B0%E1%BB%9Dng+N%C3%A0o+Ch%C3%BAa+%C4%90%C3%A3+%C4%90i+Qua+V%C4%83n+Chi",
    allowDirectEmbed: false,
    durationLabel: "04:30",
    status: "draft",
  },
  {
    id: "hymn-chua-da-song-lai",
    slug: "chua-da-song-lai",
    title: "Alleluia Chúa Đã Sống Lại",
    composer: "Chưa xác minh tác giả bản phối",
    composerVerified: false,
    category: "phuc_sinh",
    categoryLabelVi: "Phục Sinh",
    thumbnailUrl: "/images/chibi/canh-phuc-sinh.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Ch%C3%BAa+%C4%90%C3%A3+S%E1%BB%91ng+L%E1%BA%A1i+Th%C3%A1nh+Ca+Ph%E1%BB%A5c+Sinh",
    allowDirectEmbed: false,
    durationLabel: "03:40",
    status: "draft",
  },
  {
    id: "hymn-de-em-nho-den-voi-chua",
    slug: "tuoi-tho-co-chua",
    title: "Để Các Em Nhỏ Đến Với Thầy",
    composer: "Chưa xác minh tác giả",
    composerVerified: false,
    category: "thieu_nhi",
    categoryLabelVi: "Thiếu nhi",
    thumbnailUrl: "/images/chibi/chua-giesu-voi-tre-em.svg",
    legalSourceName: "Liên kết tìm kiếm ngoài trên YouTube",
    usageRights:
      "Chưa xác minh quyền nhúng trực tiếp; hiện chỉ chuyển hướng tìm kiếm sang YouTube.",
    listenUrl:
      "https://www.youtube.com/results?search_query=Th%C3%A1nh+Ca+Thi%E1%BA%BFu+Nhi+Th%C3%A1nh+Th%E1%BB%83",
    allowDirectEmbed: false,
    durationLabel: "03:25",
    status: "draft",
  },
];

export const TRADITIONAL_PRAYERS: TraditionalPrayer[] = [
  {
    id: "prayer-lay-cha",
    slug: "kinh-lay-cha",
    title: "Kinh Lạy Cha",
    latinTitle: "Pater Noster",
    category: "Kinh căn bản Công giáo",
    content:
      "Lạy Cha chúng con ở trên trời, chúng con nguyện danh Cha cả sáng, nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời.\n\nXin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con như chúng con cũng tha kẻ có nợ chúng con. Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ. Amen.",
    sourceVerification:
      "Bản kinh truyền thống — Cần Ban Giáo Lý đối chiếu bản in chính thức của HĐGMVN trước khi xuất bản Production.",
    usageRights:
      "Kinh chung Công giáo (Đang ở trạng thái Demo chờ duyệt chính thức).",
    isVerified: false,
  },
  {
    id: "prayer-kinh-mung",
    slug: "kinh-kinh-mung",
    title: "Kinh Kính Mừng",
    latinTitle: "Ave Maria",
    category: "Kinh căn bản Công giáo",
    content:
      "Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà, Bà có phúc lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phúc lạ.\n\nThánh Maria Đức Mẹ Chúa Trời, cầu cho chúng con là kẻ có tội khi này và trong giờ lâm tử. Amen.",
    sourceVerification:
      "Bản kinh truyền thống — Cần Ban Giáo Lý đối chiếu bản in chính thức của HĐGMVN trước khi xuất bản Production.",
    usageRights:
      "Kinh chung Công giáo (Đang ở trạng thái Demo chờ duyệt chính thức).",
    isVerified: false,
  },
  {
    id: "prayer-sang-danh",
    slug: "kinh-sang-danh",
    title: "Kinh Sáng Danh",
    latinTitle: "Gloria Patri",
    category: "Kinh căn bản Công giáo",
    content:
      "Sáng danh Đức Chúa Cha và Đức Chúa Con và Đức Chúa Thánh Thần.\n\nNhư đã có trước vô cùng và bây giờ và hằng có và đời đời chẳng cùng. Amen.",
    sourceVerification:
      "Bản kinh truyền thống — Cần Ban Giáo Lý đối chiếu bản in chính thức của HĐGMVN trước khi xuất bản Production.",
    usageRights:
      "Kinh chung Công giáo (Đang ở trạng thái Demo chờ duyệt chính thức).",
    isVerified: false,
  },
];

/**
 * Danh sách bản ghi Lời Chúa Mỗi Ngày (DỮ LIỆU DEMO — CHƯA XÁC MINH QUYỀN SỬ DỤNG CHÍNH THỨC)
 * Phân biệt rõ 3 trạng thái để kiểm thử:
 * - Bản ghi 1 (2026-10-31): Demo Sample • Mô phỏng trạng thái hiển thị trang chủ (isDemoData: true, verificationState: 'unverified_demo')
 * - Bản ghi 2 (2026-11-01): Demo Sample • Trạng thái 'approved' (Đã duyệt nội bộ nhưng CHƯA Published)
 * - Bản ghi 3 (2026-11-02): Demo Sample • Trạng thái 'review' (Đang chờ duyệt, KHÔNG được phép hiển thị như bản xuất bản)
 */
export const PUBLISHED_DEMO_DEVOTIONALS: DailyDevotional[] = [
  {
    id: "dev-2026-10-31",
    publishDate: "2026-10-31",
    themeTitle: "[DEMO] Tìm Về Bến Bình An Trong Trái Tim Chúa",
    liturgicalDay: {
      id: "lit-2026-10-31",
      liturgicalDate: "2026-10-31",
      title: "Dữ liệu Lịch Minh Họa (Chưa xác minh Lịch Phụng Vụ HĐGMVN năm 2026)",
      season: "ordinary_time",
      seasonLabelVi: "Mùa Thường Niên (Demo)",
      liturgicalColor: "green",
      liturgicalColorLabelVi: "Áo lễ Xanh",
      liturgicalRank: "Dữ liệu mẫu chưa xác minh",
      liturgicalYear: "Chưa xác minh",
      sourceReference:
        "CHƯA XÁC MINH: Không tự suy đoán lịch phụng vụ chính thức khi chưa nhập dữ liệu từ Ủy ban Phụng tự HĐGMVN.",
      isVerified: false,
    },
    scripture: {
      id: "scr-mt-11-28-30",
      bibleSourceId: VERIFIED_BIBLE_SOURCE.id,
      bibleSource: VERIFIED_BIBLE_SOURCE,
      bookName: "Tin Mừng theo Thánh Mát-thêu",
      bookAbbr: "Mt",
      chapter: 11,
      verseStart: 28,
      verseEnd: 30,
      referenceLabel: "Mt 11, 28-30",
      passageText:
        "“Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng tôi, tôi sẽ cho nghỉ ngơi bồi dưỡng. Anh em hãy mang lấy ách của tôi, và hãy học với tôi, vì tôi có lòng hiền hậu và khiêm nhường. Tâm hồn anh em sẽ được nghỉ ngơi bồi dưỡng. Vì ách tôi êm ái, và gánh tôi nhẹ nhàng.”",
      status: "draft",
      verificationState: "unverified_demo",
      verifiedBy: "Chưa xác minh (Dữ liệu Demo Giai đoạn B)",
      verifiedAt: null,
    },
    chibiImage: DEVOTIONAL_IMAGES[0],
    suggestedHymn: HYMN_LIBRARY[1],
    reflectionBody:
      "Giữa nhịp sống hối hả với biết bao lo toan về công việc, học tập và gia đình, đôi vai chúng ta đôi khi mỏi mệt vì những áp lực vô hình. Lời mời gọi của Đức Giêsu trong Tin Mừng Thánh Mát-thêu mở ra cho người tín hữu một điểm tựa dịu dàng và vững chắc. Đến với Chúa không phải là trốn chạy trách nhiệm hằng ngày, nhưng là đón nhận sức mạnh nội tâm từ Đấng hiền hậu và khiêm nhường. Khi biết kết hợp những hy sinh âm thầm của mình với tình yêu Thiên Chúa, gánh nặng cuộc đời không còn là sự đơn độc nặng nề, mà trở thành hành trình trưởng thành trong đức tin và bình an đích thực.",
    reflectionWordCount: 121,
    practicalAction:
      "Dành 3 phút thinh lặng trước khi bắt đầu công việc hôm nay để hít thở sâu, phó thác một nỗi lo cụ thể cho Chúa và nói lời dịu dàng với người thân bên cạnh.",
    prayerText:
      "Lạy Chúa Giêsu hiền lành và khiêm nhường trong lòng, chúng con cảm tạ Chúa đã ban cho chúng con một ngày sống mới. Xin dạy chúng con biết tìm đến bên Chúa mỗi khi tâm hồn mỏi mệt, để được Chúa nâng đỡ và biến đổi. Xin cho gia đình chúng con luôn tràn ngập sự bình an và yêu thương của Chúa. Amen.",
    prayerWordCount: 64,
    isDemoData: true,
    dataOrigin: "demo_sample",
    verificationState: "unverified_demo",
    status: "published", // Bản ghi mẫu duy nhất dùng để demo giao diện trang chủ ở Giai đoạn B
    reviewedBy: "Chưa kiểm duyệt thật (Bản mẫu UI Giai đoạn B)",
    approvedBy: "Chưa phê duyệt thật (Bản mẫu UI Giai đoạn B)",
    publishedAt: null,
  },
  {
    id: "dev-2026-11-01",
    publishDate: "2026-11-01",
    themeTitle: "[DEMO - ĐÃ DUYỆT NỘI BỘ / CHƯA XUẤT BẢN] Mục Tử Nhân Lành",
    liturgicalDay: {
      id: "lit-2026-11-01",
      liturgicalDate: "2026-11-01",
      title: "Dữ liệu Lịch Minh Họa (Chưa xác minh Lịch Phụng Vụ HĐGMVN)",
      season: "ordinary_time",
      seasonLabelVi: "Mùa Thường Niên (Demo)",
      liturgicalColor: "white",
      liturgicalColorLabelVi: "Áo lễ Trắng",
      liturgicalRank: "Dữ liệu mẫu chưa xác minh",
      liturgicalYear: "Chưa xác minh",
      sourceReference:
        "CHƯA XÁC MINH: Chỉ dùng để minh họa trạng thái Approved (Đã duyệt nhưng chưa Published).",
      isVerified: false,
    },
    scripture: {
      id: "scr-tv-23-1-4",
      bibleSourceId: VERIFIED_BIBLE_SOURCE.id,
      bibleSource: VERIFIED_BIBLE_SOURCE,
      bookName: "Sách Thánh Vịnh",
      bookAbbr: "Tv",
      chapter: 23,
      verseStart: 1,
      verseEnd: 4,
      referenceLabel: "Tv 23 (22), 1-4",
      passageText:
        "“Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì. Trong đồng cỏ xanh tươi, Người cho tôi nằm nghỉ. Người đưa tôi tới dòng nước trong lành và bổ sức cho tâm hồn tôi. Người dẫn tôi trên đường ngay nẻo chính vì danh dự của Người. Lạy Chúa, dầu qua lũng âm u con sợ gì nguy khốn, vì có Chúa ở cùng. Côn trượng Chúa trên tay, làm con vững dạ.”",
      status: "approved",
      verificationState: "pending_imprimatur_check",
      verifiedBy: "Đang chờ xác minh quyền sử dụng",
      verifiedAt: null,
    },
    chibiImage: DEVOTIONAL_IMAGES[1],
    suggestedHymn: HYMN_LIBRARY[2],
    reflectionBody:
      "Hình ảnh vị Mục Tử nhân lành trong Thánh Vịnh 23 luôn đem lại niềm an ủi sâu sắc cho tâm hồn người tín hữu qua mọi thời đại. Sự đầy đủ mà tác giả Thánh Vịnh cảm nghiệm không nằm ở của cải vật chất dư thừa, nhưng ở niềm xác tín rằng Thiên Chúa luôn đồng hành trong từng bước đường đời. Ngay cả khi phải đi qua những thung lũng thử thách hay những giai đoạn chưa rõ hướng đi, người tin Chúa vẫn giữ được sự bình tâm vì biết mình không đơn độc. Lòng tín thác giúp chúng ta nhìn nhận bàn tay quan phòng của Chúa đang âm thầm dẫn dắt mình trên nẻo chính đường ngay.",
    reflectionWordCount: 120,
    practicalAction:
      "Viết ra 3 điều tốt lành bạn đã nhận được trong tuần qua để dâng lời tạ ơn Chúa và khích lệ một người bạn đang gặp khó khăn.",
    prayerText:
      "Lạy Chúa là Mục Tử nhân lành của đoàn chiên, chúng con xin đặt trọn ngày sống hôm nay trong bàn tay quan phòng yêu thương của Chúa. Xin dẫn dắt từng suy nghĩ, lời nói và việc làm của chúng con đi trên đường ngay nẻo chính, để dù gặp thử thách nào, chúng con vẫn vững lòng cậy trông nơi Chúa. Amen.",
    prayerWordCount: 63,
    isDemoData: true,
    dataOrigin: "demo_sample",
    verificationState: "pending_imprimatur_check",
    status: "approved", // CHƯA PUBLISHED -> Không được hiển thị như bản xuất bản chính thức
    reviewedBy: "Mô phỏng trạng thái Approved",
    approvedBy: "Mô phỏng trạng thái Approved",
    publishedAt: null,
  },
  {
    id: "dev-2026-11-02",
    publishDate: "2026-11-02",
    themeTitle: "[DEMO - CHỜ KIỂM DUYỆT (REVIEW)] Bình An Giữa Dòng Đời",
    liturgicalDay: {
      id: "lit-2026-11-02",
      liturgicalDate: "2026-11-02",
      title: "Dữ liệu Lịch Minh Họa (Chưa xác minh Lịch Phụng Vụ HĐGMVN)",
      season: "ordinary_time",
      seasonLabelVi: "Mùa Thường Niên (Demo)",
      liturgicalColor: "green",
      liturgicalColorLabelVi: "Áo lễ Xanh",
      liturgicalRank: "Dữ liệu mẫu chưa xác minh",
      liturgicalYear: "Chưa xác minh",
      sourceReference:
        "CHƯA XÁC MINH: Chỉ dùng để minh họa trạng thái Review (Đang chờ duyệt).",
      isVerified: false,
    },
    scripture: {
      id: "scr-ga-14-27",
      bibleSourceId: VERIFIED_BIBLE_SOURCE.id,
      bibleSource: VERIFIED_BIBLE_SOURCE,
      bookName: "Tin Mừng theo Thánh Gio-an",
      bookAbbr: "Ga",
      chapter: 14,
      verseStart: 27,
      referenceLabel: "Ga 14, 27",
      passageText:
        "“Thầy để lại bình an cho anh em, Thầy ban cho anh em bình an của Thầy. Thầy ban cho anh em không theo kiểu thế gian. Lòng anh em đừng xao xuyến cũng đừng sợ hãi.”",
      status: "review",
      verificationState: "unverified_demo",
      verifiedBy: "Chưa xác minh",
      verifiedAt: null,
    },
    chibiImage: DEVOTIONAL_IMAGES[3],
    suggestedHymn: HYMN_LIBRARY[0],
    reflectionBody:
      "Trong bữa Tiệc Ly, trước khi bước vào cuộc Thương Khó, món quà quý giá mà Đức Giêsu trao lại cho các môn đệ chính là sự bình an. Bình an của Chúa khác với sự yên ổn bề ngoài theo kiểu thế gian: đó không phải là một cuộc sống hoàn toàn vắng bóng thử thách, mà là sự vững vàng từ sâu thẳm tâm hồn vì biết Thiên Chúa luôn hiện diện. Khi chúng ta đặt niềm cậy trông nơi Lời Chúa, những xao xuyến và sợ hãi dần nhường chỗ cho niềm hy vọng. Mỗi Kitô hữu được mời gọi đón nhận sự bình an ấy và trở nên khí cụ mang lại sự hòa giải cho môi trường xung quanh.",
    reflectionWordCount: 122,
    practicalAction:
      "Hôm nay, hãy chủ động mỉm cười, lắng nghe kiên nhẫn và trao một lời chúc bình an chân thành cho đồng nghiệp hoặc người thân trong gia đình.",
    prayerText:
      "Lạy Chúa Giêsu là Vua Bình An, xin ngự trị trong tâm hồn và gia đình chúng con hôm nay. Khi chúng con đứng trước những lo âu của cuộc sống, xin nhắc nhở chúng con nhớ đến lời hứa yêu thương của Chúa, để chúng con luôn giữ được lòng bình tĩnh, bác ái và tín thác trọn vẹn nơi Chúa. Amen.",
    prayerWordCount: 62,
    isDemoData: true,
    dataOrigin: "demo_sample",
    verificationState: "unverified_demo",
    status: "review", // ĐANG REVIEW -> Tuyệt đối không hiển thị cho người dùng cuối
    reviewedBy: "Chưa kiểm duyệt",
    approvedBy: "Chưa phê duyệt",
    publishedAt: null,
  },
];

/**
 * Lấy bản ghi Lời Chúa cho Trang chủ:
 * - Phân biệt rõ:
 *   1. Dữ liệu chính thức đã xác minh & xuất bản (dataOrigin === 'official_database' && verificationState === 'verified_official' && status === 'published')
 *   2. Dữ liệu Demo mẫu giao diện (isDemoData === true && status === 'published'), chỉ hiển thị khi bật allowDemoFallback = true
 * - Các bản ghi ở trạng thái 'draft', 'review', 'approved' (chưa 'published') TUYỆT ĐỐI không được trả về cho Trang chủ.
 */
export function getPublishedDevotionalForDate(
  isoDateVn: string = getVietnamDateIso(),
  allowDemoFallback = true
): DailyDevotional | null {
  const publishedOnly = PUBLISHED_DEMO_DEVOTIONALS.filter(
    (item) => item.status === "published"
  );

  // Nếu không cho phép dùng dữ liệu Demo (chế độ chỉ nhận dữ liệu chính thức đã xác minh)
  if (!allowDemoFallback) {
    const officialVerified = publishedOnly.find(
      (item) =>
        item.publishDate === isoDateVn &&
        !item.isDemoData &&
        item.verificationState === "verified_official"
    );
    return officialVerified ?? null;
  }

  const exactMatch = publishedOnly.find(
    (item) => item.publishDate === isoDateVn
  );
  if (exactMatch) {
    return exactMatch;
  }

  if (publishedOnly.length === 0) {
    return null;
  }

  const seed = getDeterministicDaySeed(isoDateVn);
  const index = seed % publishedOnly.length;
  return publishedOnly[index];
}
