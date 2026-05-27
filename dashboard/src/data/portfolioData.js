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
    title: "慶應義塾大学 SFC 入学",
    subtitle: "総合政策学部 総合政策学科",
    acquiredCapital: [
      "法学・心理学のドメイン知識体系",
      "SFCのリサーチ・ネットワーク",
      "政策立案の方法論",
    ],
    active: true,
  },
  {
    year: "2025",
    title: "情報処理学会コンテスト入選",
    subtitle: "中高生情報学研究コンテスト",
    acquiredCapital: [
      "査読付き学術発表の経験",
      "研究方法論の習得",
      "学術コミュニティへの接続",
    ],
    active: false,
  },
  {
    year: "2024",
    title: "複数企業インターン",
    subtitle: "モシーモ / VR IMAGINATORS / VRデザイン研究所",
    acquiredCapital: [
      "プロダクト開発の実務経験",
      "チーム開発・アジャイルの知見",
      "VR/XR技術スタック",
    ],
    active: false,
  },
  {
    year: "2024",
    title: "東大松尾研プログラム参加",
    subtitle: "Deep Learningの体系的学習",
    acquiredCapital: [
      "DL実装力（PyTorch / NumPy）",
      "最先端論文の読解・再現能力",
      "松尾研ネットワーク",
    ],
    active: false,
  },
  {
    year: "2023",
    title: "未踏ジュニア 一次審査通過",
    subtitle: "独創的アイデアのプロトタイピング",
    acquiredCapital: [
      "ゼロイチの企画・実装力",
      "メンターからの技術指導",
      "ピッチ・プレゼン能力",
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
