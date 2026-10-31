-- ============================================================================
-- DỰ ÁN: MỘT NGÀY CÓ CHÚA (Cùng Chúa lớn lên mỗi ngày)
-- Migration: 0001_initial_schema.sql
-- Mô tả: Thiết kế CSDL chuẩn cho Lời Chúa mỗi ngày, Thư viện Chibi, Thánh Ca,
--        Nhật ký cầu nguyện, Quản trị kiểm duyệt và kiến trúc mở rộng TNTT.
-- ============================================================================

-- Kích hoạt extensions cần thiết
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'catechist', 'reviewer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_status AS ENUM ('draft', 'review', 'approved', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE liturgical_season AS ENUM (
        'advent',           -- Mùa Vọng
        'christmas',        -- Mùa Giáng Sinh
        'lent',             -- Mùa Chay
        'easter_triduum',   -- Tam Nhật Thánh
        'easter',           -- Mùa Phục Sinh
        'ordinary_time'     -- Mùa Thường Niên
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE hymn_category AS ENUM (
        'ta_on',            -- Tạ ơn
        'cau_nguyen',       -- Cầu nguyện
        'binh_an',          -- Bình an
        'gia_dinh',         -- Gia đình
        'duc_me',           -- Đức Mẹ
        'giang_sinh',       -- Giáng Sinh
        'mua_chay',         -- Mùa Chay
        'phuc_sinh',        -- Phục Sinh
        'thieu_nhi'         -- Thiếu nhi
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tntt_branch AS ENUM (
        'au_nhi',           -- Ấu Nhi (6-8 tuổi)
        'thieu_nhi',        -- Thiếu Nhi (9-12 tuổi)
        'nghia_si',         -- Nghĩa Sĩ (13-15 tuổi)
        'hiep_si',          -- Hiệp Sĩ (16-17 tuổi)
        'huynh_truong'      -- Huynh Trưởng
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 1. BẢNG USERS (Đồng bộ với auth.users của Supabase)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. BẢNG USER_PROFILES (Thông tin hồ sơ người dùng)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    saint_name TEXT,                    -- Tên Thánh (VD: Têrêsa, Giuse, Phêrô...)
    display_name TEXT NOT NULL,         -- Tên hiển thị
    avatar_url TEXT,
    parish_name TEXT,                   -- Giáo xứ (tùy chọn)
    diocese_name TEXT,                  -- Giáo phận (tùy chọn)
    tntt_branch tntt_branch,            -- Ngành TNTT (nếu là Huynh trưởng / Giáo lý viên)
    parental_consent_verified BOOLEAN NOT NULL DEFAULT FALSE, -- Không thu thập dữ liệu trẻ em khi chưa có đồng ý phụ huynh
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. BẢNG BIBLE_SOURCES (Nguồn bản dịch Kinh Thánh hợp pháp & xác minh)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bible_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,          -- VD: 'CGKPV_2011'
    name TEXT NOT NULL,                 -- VD: 'Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (2011)'
    imprimatur_info TEXT NOT NULL,      -- Thông tin chuẩn ấn (Imprimatur / Nihil Obstat)
    copyright_notice TEXT NOT NULL,     -- Ghi chú bản quyền và phép trích dẫn
    license_status TEXT NOT NULL,       -- VD: 'verified_liturgical_quote'
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. BẢNG DEVOTIONAL_IMAGES (Thư viện hình ảnh Chúa Giêsu Chibi & Các Thánh)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.devotional_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,          -- VD: 'chua-giesu-cau-nguyen'
    title TEXT NOT NULL,                -- Tên bức hình
    theme TEXT NOT NULL,                -- Chủ đề (Cầu nguyện, Trẻ em, Đàn chiên, Bờ hồ, Vườn hoa, Đức Mẹ, Thánh Giuse, Thiên thần, Giáng Sinh, Phục Sinh)
    description TEXT NOT NULL,          -- Mô tả chi tiết (dùng làm alt text cho accessibility)
    image_url TEXT NOT NULL,            -- Đường dẫn ảnh chính (WebP/AVIF/SVG)
    fallback_url TEXT NOT NULL,         -- Đường dẫn ảnh dự phòng khi lỗi tải
    license_type TEXT NOT NULL,         -- VD: 'original_project_asset' (Bản quyền thuộc dự án)
    usage_rights TEXT NOT NULL,         -- Quyền sử dụng rõ ràng
    attribution TEXT,                   -- Nguồn ghi công (nếu có)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. BẢNG SCRIPTURE_PASSAGES (Các đoạn Kinh Thánh đã kiểm duyệt)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.scripture_passages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bible_source_id UUID NOT NULL REFERENCES public.bible_sources(id) ON DELETE RESTRICT,
    book_name TEXT NOT NULL,            -- Tên sách (VD: Tin Mừng theo Thánh Mát-thêu)
    book_abbr TEXT NOT NULL,            -- Viết tắt chuẩn (VD: Mt, Mc, Lc, Ga, Tv...)
    chapter INTEGER NOT NULL CHECK (chapter > 0),
    verse_start INTEGER NOT NULL CHECK (verse_start > 0),
    verse_end INTEGER CHECK (verse_end IS NULL OR verse_end >= verse_start),
    reference_label TEXT NOT NULL,      -- Hiển thị chuẩn: VD 'Mt 11, 28-30'
    passage_text TEXT NOT NULL,         -- Nội dung câu Kinh Thánh nguyên văn đã xác minh
    verified_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    status content_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (bible_source_id, book_abbr, chapter, verse_start, verse_end)
);

-- ============================================================================
-- 6. BẢNG LITURGICAL_CALENDAR (Lịch Phụng Vụ Công giáo Rôma tại Việt Nam)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.liturgical_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    liturgical_date DATE UNIQUE NOT NULL, -- Ngày theo lịch Asia/Ho_Chi_Minh
    title TEXT NOT NULL,                  -- VD: 'Chúa Nhật XXXI Thường Niên - Năm B'
    season liturgical_season NOT NULL DEFAULT 'ordinary_time',
    liturgical_color TEXT NOT NULL DEFAULT 'green', -- green, white, red, purple, rose
    liturgical_rank TEXT NOT NULL,        -- Lễ Trọng, Lễ Kính, Lễ Nhớ, Ngày Thường
    liturgical_year TEXT,                 -- Năm A, Năm B, Năm C (Chúa Nhật) / Năm I, II (Ngày thường)
    source_reference TEXT NOT NULL,       -- Nguồn lịch phụng vụ chính thức (Ủy ban Phụng tự HĐGMVN)
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. BẢNG HYMNS (Thư viện Thánh Ca Công Giáo hợp pháp)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.hymns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,                  -- Tên bài hát
    composer TEXT,                        -- Tác giả (chỉ ghi khi xác minh được)
    composer_verified BOOLEAN NOT NULL DEFAULT FALSE,
    category hymn_category NOT NULL,      -- Chủ đề: Tạ ơn, Cầu nguyện, Bình an, Gia đình...
    thumbnail_url TEXT NOT NULL,          -- Hình đại diện
    legal_source_name TEXT NOT NULL,      -- Nguồn phát hợp pháp (VD: Kênh YouTube chính thức)
    usage_rights TEXT NOT NULL,           -- Quyền sử dụng (VD: 'YouTube Official Link / Standard Embed Allowed')
    listen_url TEXT NOT NULL,             -- Liên kết nghe chính thức
    youtube_video_id TEXT,                -- ID YouTube (chỉ nhúng nếu chủ sở hữu cho phép nhúng)
    allow_direct_embed BOOLEAN NOT NULL DEFAULT FALSE,
    duration_label TEXT,                  -- Thời lượng tham khảo (VD: '04:35')
    status content_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. BẢNG DAILY_DEVOTIONALS (Lời Chúa Mỗi Ngày - Đã kiểm duyệt theo ngày)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.daily_devotionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publish_date DATE UNIQUE NOT NULL,    -- Mỗi ngày 1 bản ghi duy nhất (múi giờ Asia/Ho_Chi_Minh)
    liturgical_day_id UUID REFERENCES public.liturgical_calendar(id) ON DELETE SET NULL,
    scripture_passage_id UUID NOT NULL REFERENCES public.scripture_passages(id) ON DELETE RESTRICT,
    chibi_image_id UUID NOT NULL REFERENCES public.devotional_images(id) ON DELETE RESTRICT,
    suggested_hymn_id UUID REFERENCES public.hymns(id) ON DELETE SET NULL,
    theme_title TEXT NOT NULL,            -- Chủ đề trong ngày
    reflection_body TEXT NOT NULL,        -- Suy niệm 100–150 từ (không giả danh lời trực tiếp của Chúa)
    reflection_word_count INTEGER NOT NULL CHECK (reflection_word_count BETWEEN 50 AND 300),
    practical_action TEXT NOT NULL,       -- Lời khuyên thực hành cụ thể trong ngày
    prayer_text TEXT NOT NULL,            -- Lời cầu nguyện 40–80 từ
    prayer_word_count INTEGER NOT NULL CHECK (prayer_word_count BETWEEN 20 AND 150),
    is_demo_data BOOLEAN NOT NULL DEFAULT FALSE, -- Cờ đánh dấu dữ liệu minh họa/demo
    status content_status NOT NULL DEFAULT 'draft',
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 9. BẢNG FAVORITE_DEVOTIONALS (Lưu Lời Chúa yêu thích của người dùng)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.favorite_devotionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    devotional_id UUID NOT NULL REFERENCES public.daily_devotionals(id) ON DELETE CASCADE,
    personal_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, devotional_id)
);

-- ============================================================================
-- 10. BẢNG PRAYER_JOURNALS (Nhật ký cầu nguyện riêng tư)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.prayer_journals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    devotional_id UUID REFERENCES public.daily_devotionals(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    prayer_content TEXT NOT NULL,
    intention_tag TEXT DEFAULT 'Tâm tình cá nhân', -- Tạ ơn, Xin ơn bình an, Gia đình, Phó thác...
    is_private BOOLEAN NOT NULL DEFAULT TRUE CHECK (is_private = TRUE), -- Luôn bảo mật riêng tư mặc định
    prayer_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 11. BẢNG USER_PREFERENCES (Tùy chỉnh giao diện & thông báo của người dùng)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    theme_mode TEXT NOT NULL DEFAULT 'light' CHECK (theme_mode IN ('light', 'dark', 'system')),
    font_scale TEXT NOT NULL DEFAULT 'normal' CHECK (font_scale IN ('normal', 'large', 'extra_large')),
    daily_reminder_time TIME DEFAULT '06:00:00',
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 12. BẢNG CONTENT_AUDIT_LOGS (Nhật ký kiểm duyệt nội dung: Draft -> Review -> Approved -> Published)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.content_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('daily_devotional', 'scripture_passage', 'hymn', 'liturgical_calendar', 'tntt_module')),
    entity_id UUID NOT NULL,
    previous_status content_status,
    new_status content_status NOT NULL,
    actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    review_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- MODULE MỞ RỘNG: THIẾU NHI THÁNH THỂ (TNTT) - Kiến trúc chuẩn bị sẵn
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tntt_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch tntt_branch NOT NULL,          -- Ấu Nhi, Thiếu Nhi, Nghĩa Sĩ, Hiệp Sĩ
    module_type TEXT NOT NULL CHECK (module_type IN (
        'truyen_tranh_kinh_thanh',
        'hoc_kinh',
        'tro_choi_giao_ly',
        'viec_tot_moi_ngay',
        'hoat_dong_xu_doan',
        'bai_hoc_huynh_truong'
    )),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    status content_status NOT NULL DEFAULT 'draft',
    catechist_reviewer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES TỐI ƯU TRUY VẤN
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_daily_devotionals_publish_date ON public.daily_devotionals(publish_date);
CREATE INDEX IF NOT EXISTS idx_daily_devotionals_status_date ON public.daily_devotionals(status, publish_date);
CREATE INDEX IF NOT EXISTS idx_scripture_passages_ref ON public.scripture_passages(book_abbr, chapter, verse_start);
CREATE INDEX IF NOT EXISTS idx_hymns_category_status ON public.hymns(category, status);
CREATE INDEX IF NOT EXISTS idx_devotional_images_theme ON public.devotional_images(theme);
CREATE INDEX IF NOT EXISTS idx_favorite_devotionals_user ON public.favorite_devotionals(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_journals_user_date ON public.prayer_journals(user_id, prayer_date DESC);
CREATE INDEX IF NOT EXISTS idx_content_audit_logs_entity ON public.content_audit_logs(entity_type, entity_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - BẢO MẬT DỮ LIỆU NGƯỜI DÙNG & NỘI DUNG
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devotional_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripture_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liturgical_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hymns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tntt_lessons ENABLE ROW LEVEL SECURITY;

-- 1. Policies cho prayer_journals: CHỈ CHỦ SỞ HỮU MỚI ĐƯỢC XEM, THÊM, SỬA, XÓA
CREATE POLICY "Users can view own prayer journals"
    ON public.prayer_journals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer journals"
    ON public.prayer_journals FOR INSERT
    WITH CHECK (auth.uid() = user_id AND is_private = TRUE);

CREATE POLICY "Users can update own prayer journals"
    ON public.prayer_journals FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id AND is_private = TRUE);

CREATE POLICY "Users can delete own prayer journals"
    ON public.prayer_journals FOR DELETE
    USING (auth.uid() = user_id);

-- 2. Policies cho favorite_devotionals: Chỉ chủ sở hữu quản lý danh sách yêu thích
CREATE POLICY "Users manage own favorites"
    ON public.favorite_devotionals FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 3. Policies cho user_profiles & user_preferences: Chỉ chủ sở hữu xem và cập nhật
CREATE POLICY "Users manage own profile"
    ON public.user_profiles FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own preferences"
    ON public.user_preferences FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 4. Policies cho daily_devotionals: Người dùng thường CHỈ ĐỌC được bản ghi 'published'
CREATE POLICY "Public can view published daily devotionals"
    ON public.daily_devotionals FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins and reviewers can manage all devotionals"
    ON public.daily_devotionals FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid() AND u.role IN ('admin', 'reviewer')
        )
    );

-- 5. Policies cho scripture_passages, hymns, devotional_images, bible_sources, liturgical_calendar
CREATE POLICY "Public can view published scripture passages"
    ON public.scripture_passages FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view published hymns"
    ON public.hymns FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view active devotional images"
    ON public.devotional_images FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Public can view verified bible sources"
    ON public.bible_sources FOR SELECT
    USING (is_verified = TRUE);

CREATE POLICY "Public can view verified liturgical calendar"
    ON public.liturgical_calendar FOR SELECT
    USING (is_verified = TRUE);

