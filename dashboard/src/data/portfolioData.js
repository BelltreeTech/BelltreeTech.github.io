// Portfolio Data — Single Source of Truth
export const profile = {
  name: "Shinri Suzuki",
  handle: "BelltreeTech",
  tagline: "Hybrid Architect — AI Implementation × Law & Psychology Domain",
  affiliation: "慶應義塾大学 SFC / 東大松尾研プログラム",
  statement:
    "SFCの法・心理ドメイン知識 × 東大松尾研のDL実装力。市場の空白地帯を独占するハイブリッド・アーキテクト。",
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
      "既存のメンタルケアAIはAPI依存で精度・コストに課題。表情認識の学術的厳密性が欠如している。",
    solution:
      "FACSコーディングとNumPyスクラッチ実装による独自深層学習モデルで、表情からの感情推定精度を最大化。",
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
      "AI開発現場でELSI（倫理的・法的・社会的課題）のチェックが属人的かつ非体系的。",
    solution:
      "法的要件をルールエンジン化し、AIシステムの開発プロセスに統合可能なコンプライアンスチェッカーを構築。",
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
      "既存の表情認識APIはブラックボックスで、学術研究での再現性・透明性が確保できない。",
    solution:
      "FACS Action Unit検出をスクラッチ実装し、推論過程が透明なオープンソースSDKを提供。",
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
    title: "東大松尾研 公開講座への挑戦",
    subtitle: "GLOBAL CONSUMER INTELLIGENCE / DeepLearning基礎講座",
    acquiredCapital: [
      "",
      "",
      "",
    ],
    active: true,
  },
  {
    year: "2026",
    title: "慶應義塾大学 SFCへの入学入学",
    subtitle: "総合政策学部 総合政策学科",
    acquiredCapital: [
      "",
      "",
      "",
    ],
    active: true,
  },
  {
    year: "",
    title: "",
    subtitle: "",
    acquiredCapital: [
      "",
      "",
      "",
    ],
    active: false,
  },
  {
    year: "2024",
    title: "高校生インターン",
    subtitle: "株式会社モシーモ / 株式会社VR IMAGINATORS / 株式会社VRデザイン研究所",
    acquiredCapital: [
      "実践的な企画開発実用化のプロセス",
      "",
      "",
    ],
    active: false,
  },
  {
    year: "2023",
    title: "未来構想キャンプin鳥取2023を修了",
    subtitle: "2泊3日の",
    acquiredCapital: [
      "文理融合型の研究の実践",
      "課題発見・解決の実践",
      "フィールドワークの実践",
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
      "表情分析（FACS: Facial Action Coding System）を基盤とした感情認識技術。AIに「共感」を実装することで、孤独な入院患者の心に寄り添う。",
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
      "技術の独走を防ぎ、人が幸せになるための法・倫理的フレームワークを研究。AIの社会実装における倫理的・法的・社会的課題（ELSI）に取り組む。",
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
  { name: "PyTorch", level: 85, category: "framework" },
  { name: "NumPy / SciPy", level: 88, category: "framework" },
  { name: "Infrastructure", level: 65, category: "infra" },
  { name: "Mathematical Statistics", level: 78, category: "theory" },
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
    description: "大規模モデル学習のためのA100/H100 GPUクラスタ、またはクラウドクレジット",
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
