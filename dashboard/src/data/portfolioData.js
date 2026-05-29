// Portfolio Data — Single Source of Truth
export const profile = {
  name: "Shinri Suzuki",
  handle: "BelltreeTech",
  tagline: "Hybrid Architect — AI Implementation × Law & Psychology Domain",
  affiliation: "慶應義塾大学 総合政策学部 / 一般社団法人ウェルネステックラボ/ 株式会社肌マッチ / Makers University U-18",
  statement:
    " SFCの法・心理ドメイン知識 × 東大松尾研のDL実装力．市場の空白地帯を独占するハイブリッド・アーキテクト．",
  socials: {
    github: "https://github.com/BelltreeTech",
    linkedin: "https://www.linkedin.com/in/shinri-suzuki-605475312/",
    x: "https://x.com/BelltreeTech82",
    qiita: "https://qiita.com/BelltreeTech",
  },
};

export const projects = [
  {
    id: 1,
    name: "Medical AI Polaris",
    tagline: "FACS × LLM 統合メンタルケアAI",
    problem:
      "既存のメンタルケアAIはAPI依存で精度・コストに課題．表情認識の学術的厳密性が欠如している．",
    solution:
      "FACSコーディングとNumPyスクラッチ実装による独自深層学習モデルで，表情からの感情推定精度を最大化．",
    stack: ["Python", "PyTorch", "NumPy", "FACS", "Deep Learning"],
    metrics: [
      { label: "Model Accuracy", value: "98.5%", icon: "target" },
      { label: "Latency", value: "12ms", icon: "zap" },
      { label: "Parameters", value: "1.2M", icon: "cpu" },
    ],
    github: "https://github.com/BelltreeTech",
    demo: null,
    status: "In Development",
  },
  {
    id: 2,
    name: "ELSI Compliance Engine",
    tagline: "AI倫理・法規制チェックフレームワーク",
    problem:
      "AI開発現場でELSI（倫理的・法的・社会的課題）のチェックが属人的かつ非体系的．",
    solution:
      "法的要件をルールエンジン化し，AIシステムの開発プロセスに統合可能なコンプライアンスチェッカーを構築．",
    stack: ["Python", "NLP", "Knowledge Graph", "FastAPI"],
    metrics: [
      { label: "Rule Coverage", value: "94%", icon: "shield" },
      { label: "Check Speed", value: "< 3s", icon: "zap" },
      { label: "Regulations", value: "120+", icon: "file-text" },
    ],
    github: "https://github.com/BelltreeTech",
    demo: null,
    status: "Prototype",
  },
  {
    id: 3,
    name: "Affective Computing SDK",
    tagline: "リアルタイム表情分析エンジン",
    problem:
      "既存の表情認識APIはブラックボックスで，学術研究での再現性・透明性が確保できない．",
    solution:
      "FACS Action Unit検出をスクラッチ実装し，推論過程が透明なオープンソースSDKを提供．",
    stack: ["Python", "OpenCV", "NumPy", "ONNX"],
    metrics: [
      { label: "AU Detection", value: "96.2%", icon: "eye" },
      { label: "FPS", value: "30+", icon: "activity" },
      { label: "Model Size", value: "45MB", icon: "hard-drive" },
    ],
    github: "https://github.com/BelltreeTech",
    demo: null,
    status: "Research",
  },
];

export const timeline = [
  {
    year: "2026",
    title: "明治大学 スマートメカトロニクス研究室 共同研究",
    subtitle: "Coming soon...",
    acquiredCapital: [
    ],
    active: true,
    url: "https://weblab.t.u-tokyo.ac.jp/",
  },
  {
    year: "2026",
    title: "東京大学 松尾・岩澤研究室 プログラム",
    subtitle: "GLOBAL CONSUMER INTELLIGENCE 2026 Summer / Deep Learning Basic 2026 Spring",
    acquiredCapital: [
      "Coming soon...",
    ],
    active: true,
    url: "https://weblab.t.u-tokyo.ac.jp/",
  },
  {
    year: "2026",
    title: "慶應義塾大学 SFC 入学",
    subtitle: "総合政策学部 総合政策学科",
    acquiredCapital: [
      "Coming soon...",
    ],
    active: true,
    url: "https://www.sfc.keio.ac.jp/",
  },
  {
    year: "2025",
    title: "一般社団法人ウェルネス・テックラボ 設立",
    subtitle: "代表理事 / CTOとして就任",
    acquiredCapital: [
      "法人設立・組織運営における起業家としての胆力",
      "多様な専門家(医療・教育等)を巻き込む巻き込み力",
      "研究を「実社会のプロダクト」へ昇華させる事業設計",
    ],
    active: true,
    url: null,
  },
  {
    year: "2025",
    title: "MAKERS UNIVERSITY U-18の第10期生 採択",
    subtitle: "日本最高峰の次世代起業家育成プログラム",
    acquiredCapital: [
      "トップメンターによる事業解像度の引き上げ",
      "社会課題解決に挑む異能の同世代ネットワーク",
      "プロダクト(Polaris)の市場価値検証とピッチ力",
    ],
    active: false,
    url: "https://makers-u18.jp/",
  },
  {
    year: "2024",
    title: "ITベンチャー3社でのエンジニアリング実装",
    subtitle: "株式会社モシーモ / VR IMAGINATORS / VRデザイン研究所",
    acquiredCapital: [
      "対話AIと感情分析を統合する実務レベルの開発力",
      "社会に開かれたプロダクトをデリバリーする責任と品質担保",
      "競合リサーチ・コスト検討を含む新規事業開発のプロセス",
    ],
    active: false,
  },
  {
    year: "2023",
    title: "慶應SFC主催の未来構想キャンプin鳥取 2023 修了",
    subtitle: "XRとロボティクスで人々の健康を支える",
    acquiredCapital: [
      "『つくる』から『届ける』へ，社会実装を前提とした技術視点",
      "医療現場のリアルなペインを引き出すヒアリング力",
      "先端技術をエンドユーザーに適応させるUI/UX設計",
    ],
    active: false,
  },
  {
    year: "2022",
    title: "平均年齢32歳のハッカソン/フェスでリーダーを経験",
    subtitle: "VRプロフェッショナルアカデミー 最年少入学",
    acquiredCapital: [
      "現役シニアエンジニアと対等に議論・協働するコミュニケーション力",
      "全体を俯瞰してそれぞれにタスクを振り分けるマネジメント力",
      "課題発見からXRプラン立案・デモ開発までを統括する統率力",
    ],
    active: false,
  },
];
export const domains = {
  psychology: {
    title: "Psychology",
    subtitle: "FACS & Affective Computing",
    icon: "brain",
    description:
      "表情分析（FACS: Facial Action Coding System）を基盤とした感情認識技術．AIに「共感」を実装することで，孤独な入院患者の心に寄り添う．",
    points: [
      "Facial Action Coding System (FACS) — 表情筋の動きをコード化",
      "Affective Computing — 感情の計算的モデリング",
      "Emotion Recognition — マルチモーダル感情推定",
      "Therapeutic AI — 心理的介入のためのAI設計",
    ],
  },
  governance: {
    title: "AI Governance",
    subtitle: "ELSI & Responsible AI",
    icon: "scale",
    description:
      "技術の独走を防ぎ，人が幸せになるための法・倫理的フレームワークを研究．AIの社会実装における倫理的・法的・社会的課題（ELSI）に取り組む．",
    points: [
      "ELSI Framework — 倫理的・法的・社会的影響評価",
      "AI Safety — アラインメントと安全性の担保",
      "Regulatory Compliance — 各国AI規制への準拠",
      "Responsible Innovation — 責任あるイノベーション設計",
    ],
  },
};

export const skills = [
  { name: "Python", level: 92, category: "language" },
  { name: "Artificial Intelligence (sklearn, PyTorch, TensorFlow, Scikit-learn)", level: 85, category: "framework" },
  { name: "Data Science (Numpy, Pandas, Matplotlib)", level: 88, category: "framework" },
  { name: "Infrastructure", level: 65, category: "infra" },
  { name: "Mathematical  (Linear Algebra, Calculus, Statistics and Probability)", level: 78, category: "theory" },
  { name: "Deep Learning Theory", level: 82, category: "theory" },
];

export const radarData = {
  labels: ["Python", "PyTorch", "NumPy", "インフラ", "数理統計", "DL理論"],
  values: [92, 85, 88, 65, 78, 82],
};

export const roadmap = [
  {
    year: "Year 1 (2026–2027)",
    title: "Foundation",
    milestones: [
      "SFC研究会配属 & 研究テーマ確定",
      "松尾研プログラム修了 & 論文投稿",
      "Polaris v1.0 リリース",
    ],
  },
  {
    year: "Year 2 (2027–2028)",
    title: "Acceleration",
    milestones: [
      "国際学会発表 (ACM / IEEE)",
      "AI Governance フレームワーク公開",
      "スタートアップ創業 or VC連携",
    ],
  },
  {
    year: "Year 3 (2028–2029)",
    title: "Scale",
    milestones: [
      "プロダクトの社会実装 & 収益化",
      "海外リサーチインターン",
      "シリーズA調達 or 大学院進学",
    ],
  },
];

export const resourceRequests = [
  {
    title: "Compute Resources",
    subtitle: "GPU / Cloud Credits",
    description: "大規模モデル学習のためのA100/H100 GPUクラスタ，またはクラウドクレジット",
    icon: "server",
    priority: "HIGH",
  },
  {
    title: "Seed Funding",
    subtitle: "研究 & プロトタイプ開発",
    description: "Polaris の臨床試験・データ収集・プロダクト化に必要な初期資金",
    icon: "banknote",
    priority: "HIGH",
  },
  {
    title: "Domain Expert Connections",
    subtitle: "医療 / 法律 / 心理学",
    description: "臨床心理士・医師・AI法規制の専門家とのコネクション",
    icon: "users",
    priority: "MEDIUM",
  },
];

export const validations = [
  {
    id: 1,
    type: "Award",
    date: "2023-08",
    title: "慶應義塾大学SFC主催 未来構想キャンプin鳥取2023 修了",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 2,
    type: "Award",
    date: "2024-12",
    title: "サイエンスキャッスル2024 東京・関東大会 東武不動産賞 / 奨励賞",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 3,
    type: "Award",
    date: "2025-02",
    title: "MY PROJECT AWARD 2024 地域Summit特別賞",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 4,
    type: "Award",
    date: "2025-02",
    title: "第10回高校生国際シンポジウム 医療医学部門 最優秀賞",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 5,
    type: "Award",
    date: "2025-03",
    title: "第68回全国学芸サイエンスコンクール 高校生の部 スタートアップ部門 銀賞",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 6,
    type: "Award",
    date: "2025-03",
    title: "中高生探究コンテスト困りごと部門 セミファイナリスト",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 7,
    type: "Award",
    date: "2025-03",
    title: "MAKERS UNIVERSITY U-18 第10期生 採択",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 8,
    type: "Award",
    date: "2025-07",
    title: "Global Link Singapore2025（国際大会） 推薦出場",
    issuer: null,
    description: null,
    link: null,
  },
  {
    id: 9,
    type: "Award",
    date: "2025-12",
    title: "サイエンスキャッスルワールド2025 アステラス製薬賞 / 優秀賞",
    issuer: null,
    description: null,
    link: null,
  },
];

export const siteConfig = {
  meta: {
    title: "Shinri Suzuki — Hybrid Architect Portfolio",
    description:
      "AI Implementation × Law & Psychology Domain. SFCの法・心理ドメイン知識 × 東大松尾研のDL実装力．",
  },
  nav: [
    { id: "executive", label: "Summary" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Timeline" },
    { id: "validations", label: "Validation" },
    { id: "domain", label: "Domain" },
    { id: "tech", label: "Tech" },
    { id: "roadmap", label: "Roadmap" },
  ],
  hero: {
    titleLine1: "Hybrid",
    titleLine2: "Architect",
    subtitle: "AI Implementation × Law & Psychology Domain",
    terminalFile: "value_proposition.sh",
    statusBadge: "System Online — Portfolio v1.0",
    chips: ["SFC '26", "東大松尾研", "AI Engineer", "法 × 心理 × AI"],
    navigateHint: "Navigate",
  },
  sections: {
    projects: {
      number: "02",
      slug: "Proof of Work",
      title: "Projects",
      labels: { problem: "Problem", solution: "Solution" },
    },
    timeline: {
      number: "03",
      slug: "Timeline of Arbitrage",
      title: "Leverage Accumulation",
      labels: { acquiredCapital: "Acquired Capital", current: "Current" },
    },
    validations: {
      number: "04",
      slug: "Third-Party Validation",
      title: "Awards & Press",
      description:
        "第三者機関による客観的な評価．技術力とビジョンの社会的信頼性を証明する．",
      labels: { award: "Award", press: "Press" },
    },
    domain: {
      number: "05",
      slug: "Domain Expertise",
      title: "Two Pillars of Knowledge",
      description:
        "単なるコーダーではなく「思想家」として，技術と人間社会の接点を設計する．",
      intersection: {
        formula: "Psychology × AI × Law",
        result: "Unique Position",
      },
    },
    tech: {
      number: "06",
      slug: "Technical Stack Spec",
      title: "Capability Matrix",
      labels: {
        radarTitle: "Skill Radar",
        barsTitle: "Proficiency Levels",
      },
      legend: [
        { label: "Language", color: "var(--color-cyber-blue)" },
        { label: "Framework", color: "var(--color-neon-emerald)" },
        { label: "Theory", color: "var(--color-neon-purple)" },
      ],
    },
    roadmap: {
      number: "07",
      slug: "Resource Request & Roadmap",
      title: "Strategic Roadmap",
      resourcePanel: {
        title: "Resource Request",
        subtitle: "ミッション達成に必要なリソース",
      },
      cta: {
        label: "Schedule a Meeting",
        href: "https://calendly.com",
        subtext: "投資家・メンター・研究者の方はお気軽にご連絡ください",
      },
      footer: {
        builtWith: "Built with React + Tailwind CSS + Framer Motion",
      },
    },
  },
};
