// Shared public content for every viewport. Evidence and release decisions stay outside the published app.
export const profile = {
  nameJa: "鈴木 真理",
  name: "Shinri Suzuki",
  nameEn: "SHINRI SUZUKI",
  handle: "BelltreeTech",
  role: "Researcher & Developer",
  affiliation: "慶應義塾大学 総合政策学部",
  fields: "情報科学 × 心理学 × 法律・倫理",
  fieldsEn: "Computer Science × Psychology × Law & Ethics",
  focus: "Emotion-Aware AI",
  thinking: "From first principles",
  building: "From scratch",
  motto: "Future = [ ]",
  mottoJa: "無色透明なら何色にもなれる",
  futureVariable: "Future = Variable",
  futureMeaning: "未来は固定されたものではなく、選択を加え、手放し、ときには白紙から始めながら、自分で変えていくもの。",
  startingLine: "後悔するよりはスタートラインを描こう",
  blueRoseMeaning: "夢が叶う、奇跡、可能性。青い薔薇に重ねている、大切な言葉です。",
  statement:
    "人の感情や背景を理解するAIを、技術と人間の両側から考える。情報科学・心理学・法律と倫理の接点を探り、研究を社会につながる形へ育てていきます。",
  roles: [
    {
      organization: "一般社団法人ウェルネステックラボ",
      role: "代表理事 / CTO",
    },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/BelltreeTech" },
    { label: "X", url: "https://x.com/BelltreeTech82" },
    { label: "Qiita", url: "https://qiita.com/BelltreeTech" },
  ],
};

export const projects = [
  {
    id: "polaris",
    name: "Polaris",
    tagline: "感情を理解し、対話に生かすAI",
    summary:
      "入院中の中高生に向けた、お悩み相談AIの研究・開発。相手の感情や置かれた状況を、対話の設計にどう取り入れられるかを探っています。",
    aim: "入院生活の中で悩みを話せる場をつくり、一人ひとりに寄り添う対話を目指す。",
    approach:
      "表情分析（FACS）と大規模言語モデル（LLM）の接点を研究。発表やユーザーテストで得た気づきを、設計の見直しにつなげています。",
    stack: ["Python", "PyTorch", "NumPy", "FACS", "LLM"],
    status: "研究・開発",
    links: [],
  },
];

export const internships = [
  {
    id: "mocmo",
    organization: "株式会社モシーモ（mocmo）",
    period: "2024年1月",
    startDate: "2024-01",
    endDate: "2024-01",
    role: "未来探求事業・企画部 インターン",
    responsibilities: [
      "競合他社のリサーチ",
      "新規事業の開拓",
      "プロダクトのコスト検討",
      "プロトタイプ開発",
    ],
    learnings: [
      "新規事業の提案や教材開発を通じて、AIを社会実装するためのプロセスを学びました。",
      "相談AIの知見を得るとともに、事業・コスト・開発をつなげて考える経験になりました。",
    ],
  },
  {
    id: "vr-design",
    organization: "株式会社VRデザイン研究所",
    period: "2024年11月〜2025年3月",
    startDate: "2024-11",
    endDate: "2025-03",
    role: "U-15プロジェクト インターン",
    responsibilities: [
      "イベント運営",
      "技術スタッフ",
      "プログラミング講師",
      "Unityを学ぶ中学生の学習支援・講座運営",
    ],
    learnings: [
      "AI・VRを社会に開かれた形で届ける責任を学びました。",
      "学ぶ人と接する現場を通じて、技術を使い手へつなぐことの重要性を実感しました。",
    ],
  },
  {
    id: "vr-imaginators",
    organization: "株式会社VR IMAGINATORS",
    period: "2024年9月〜2025年6月",
    startDate: "2024-09",
    endDate: "2025-06",
    role: "企画開発・広報 インターン",
    responsibilities: ["企画開発", "広報"],
    learnings: [
      "感情理解をAIに組み込む手法に触れ、対話AIと感情分析を統合するための実務知識を学びました。",
    ],
  },
];

export const achievements = [
  {
    id: "science-castle-world-2025",
    title: "サイエンスキャッスルワールド2025",
    category: "award",
    categoryLabel: "受賞",
    date: "2025-12",
    dateLabel: "2025年12月",
    result: "アステラス製薬賞・優秀賞",
    description:
      "「入院中の中高生に特化した感情を理解できるAIの開発」で、同大会の2つの賞を受賞しました。",
    organization: "株式会社リバネス",
    links: [
      {
        label: "主催者の結果発表",
        url: "https://lne.st/2025/12/15/scien-cecastle-world2025/",
      },
    ],
  },
  {
    id: "global-link-2025",
    title: "Global Link Singapore 2025",
    category: "participation",
    categoryLabel: "大会出場",
    date: "2025-07",
    dateLabel: "2025年7月",
    result: "Applied Science / Medical Science 分野で出場",
    description:
      "国際大会に出場。幅広い研究や価値観に触れ、対話AIの設計についてフィードバックを受けました。",
    organization: "Global Link Singapore",
    links: [],
  },
  {
    id: "science-grant-2024",
    title: "サイエンスキャッスル研究費 ベネッセこども基金D&I賞2024",
    category: "research-support",
    categoryLabel: "研究支援",
    date: "2025-03",
    dateLabel: "2025年3月 修了",
    result: "研究支援プログラム修了",
    description:
      "「入院中の中高生を対象としたお悩み相談アプリ Polaris の開発」をテーマに、2024年度の研究支援活動を修了しました。",
    organization: "ベネッセこども基金 / リバネス",
    links: [],
  },
  {
    id: "gakugei-68",
    title: "第68回 全国学芸サイエンスコンクール",
    category: "award",
    categoryLabel: "受賞",
    date: "2025-03",
    dateLabel: "2025年3月",
    result: "高校生の部・スタートアップ部門 銀賞",
    description:
      "Polarisを発表。社会実装や収益性の観点からフィードバックを受け、開発とユーザーテストの取り組みが評価されました。",
    organization: "株式会社旺文社",
    links: [],
  },
  {
    id: "symposium-10",
    title: "第10回 高校生国際シンポジウム",
    category: "award",
    categoryLabel: "受賞",
    date: "2025-02",
    dateLabel: "2025年2月",
    result: "ポスター部門・医療／医学分野 最優秀賞",
    description:
      "研究発表と質疑応答を通じて、課題の捉え方や手法を選んだ理由を伝えました。部門・分野における最優秀賞です。",
    organization: "一般社団法人Glocal Academy",
    links: [],
  },
  {
    id: "my-project-2024",
    title: "My Project Award 2024",
    category: "award",
    categoryLabel: "受賞",
    date: "2025-02",
    dateLabel: "2025年2月",
    result: "地域Summit特別賞",
    description:
      "Polarisの活動で受賞。AIとの対話だからこそできる支援や、対話の受け止められ方について考えを深めました。",
    organization: "全国高校生マイプロジェクト全国事務局",
    links: [],
  },
  {
    id: "inquiry-2025",
    title: "中高生探究コンテスト2025",
    category: "selection",
    categoryLabel: "選考実績",
    date: "2025",
    dateLabel: "2025年",
    result: "困りごと部門 セミファイナリスト",
    description:
      "入院中の中高生に特化したお悩み相談AIの開発で、困りごと部門のセミファイナリストに選出されました。",
    organization: "一般社団法人CREATION DRIVE",
    links: [],
  },
  {
    id: "makers-10",
    title: "Makers University U-18 第10期生",
    category: "adoption",
    categoryLabel: "採択",
    date: "2025",
    dateLabel: "2025年",
    result: "第10期生として採択",
    description:
      "選考を経て第10期生として採択。事業や社会との接点を考え、挑戦する同世代との学びにつなげています。",
    organization: "MAKERS UNIVERSITY U-18",
    links: [{ label: "プログラム公式サイト", url: "https://makers-u18.jp/" }],
  },
  {
    id: "science-castle-2024",
    title: "サイエンスキャッスル2024 東京・関東大会",
    category: "award",
    categoryLabel: "受賞",
    date: "2024-12",
    dateLabel: "2024年12月",
    result: "東武不動産賞・奨励賞",
    description:
      "ポスター発表部門で、入院中の中高生を対象としたお悩み相談サービスを発表。同大会の企業賞と奨励賞を受賞しました。",
    organization: "株式会社リバネス",
    links: [],
  },
];

export const qualifications = [
  {
    id: "it-passport",
    title: "ITパスポート試験",
    category: "qualification",
    categoryLabel: "資格",
    date: "2024-03",
    dateLabel: "2024年3月",
    result: "合格",
    description:
      "経営戦略や法務、マネジメントを含むITの基礎知識を学び、情報処理技術者試験に合格しました。",
    links: [],
  },
];

export const media = [
  {
    id: "steenz",
    title: "Steenz",
    category: "media",
    categoryLabel: "メディア掲載",
    date: "2026-08",
    dateLabel: "2026年8月",
    result: "インタビュー掲載",
    description: "研究や活動について紹介いただきました。",
    links: [{ label: "掲載記事を読む", url: "https://steenz.jp/59653/" }],
  },
  {
    id: "dempa",
    title: "電波新聞",
    category: "media",
    categoryLabel: "メディア掲載",
    date: "2025-09",
    dateLabel: "2025年9月",
    result: "研究・活動の紹介",
    description:
      "表情分析（FACS）とLLMを組み合わせるAIの研究について紹介いただきました。",
    links: [
      {
        label: "掲載記事を読む",
        url: "https://dempa-digital.com/article/695253",
      },
    ],
  },
  {
    id: "larva06",
    title: "Larva06",
    category: "media",
    categoryLabel: "メディア掲載",
    date: "2025-07",
    dateLabel: "2025年7月",
    result: "インタビュー掲載",
    description:
      "Polarisの開発に取り組む背景や、研究・活動についてお話ししました。",
    links: [
      {
        label: "掲載記事を読む",
        url: "https://larva06.com/2025/07/suzuki-shinri-interview",
      },
    ],
  },
];

export const activities = [
  {
    id: "keio",
    date: "2026",
    dateLabel: "2026年〜",
    title: "慶應義塾大学 総合政策学部",
    status: "学び",
    description: "SFCで情報科学・心理学・法律と倫理の接点を探っています。",
  },
  {
    id: "wellness-tech",
    date: "2025",
    dateLabel: "2025年〜",
    title: "一般社団法人ウェルネステックラボ",
    status: "活動",
    description:
      "代表理事 / CTOとして、研究を社会につなげる活動に取り組んでいます。",
  },
  {
    id: "vr-academy",
    date: null,
    dateLabel: null,
    title: "VRプロフェッショナルアカデミー",
    status: "学び・制作",
    description:
      "VRを学び、ハッカソン・フェスでチームリーダーを経験。企画や開発、チームでの協働に取り組みました。",
  },
];

export const domains = [
  {
    id: "computer-science",
    name: "情報科学",
    nameEn: "Computer Science",
    description:
      "数理と実装を行き来しながら、AIの仕組みを理解する。数値計算、深層学習、画像処理を研究・制作に生かします。",
    topics: ["Deep Learning", "Numerical Computing", "Computer Vision"],
  },
  {
    id: "psychology",
    name: "心理学",
    nameEn: "Psychology",
    description:
      "表情や対話、感情の背景を考える。FACSやAffective Computingを手がかりに、人の状態をどう捉えるかを探ります。",
    topics: ["FACS", "Affective Computing", "Emotion-Aware AI"],
  },
  {
    id: "law-ethics",
    name: "法律・倫理",
    nameEn: "Law & Ethics",
    description:
      "技術が人や社会に与える影響を考える。倫理的・法的・社会的課題を、AIの設計と実装の中に位置づけます。",
    topics: ["ELSI", "Responsible AI", "AI Governance"],
  },
];

export const skills = [
  {
    name: "実装・機械学習",
    description: "研究・制作で扱う技術",
    technologies: ["Python", "PyTorch", "TensorFlow", "scikit-learn"],
  },
  {
    name: "データ・数値計算",
    description: "データを読み、数理と実装をつなぐ",
    technologies: ["NumPy", "Pandas", "Matplotlib"],
  },
  {
    name: "数学・理論",
    description: "仕組みを基礎から理解するための学び",
    technologies: ["線形代数", "微積分", "確率・統計", "深層学習理論"],
  },
  {
    name: "技術を届ける",
    description: "制作と現場の接点",
    technologies: ["Unity", "XR", "プロトタイプ開発", "インフラの基礎"],
  },
];

export const roadmap = [
  {
    id: "foundation",
    period: "2026〜2027",
    title: "研究の基盤を深める",
    description:
      "研究テーマの具体化、データサイエンス・深層学習の学び、Polarisの改良と公開を目指します。",
  },
  {
    id: "exploration",
    period: "2027〜2028",
    title: "外にひらき、検証する",
    description:
      "学会発表や共同研究、AIと法律・倫理に関する発信を目指し、研究と事業の接点を探ります。",
  },
  {
    id: "connection",
    period: "2028〜2029",
    title: "社会につながる形へ",
    description:
      "社会実装、海外での研究経験、事業や大学院での研究への展開を将来の選択肢として考えています。",
  },
];

export const contact = {
  email: "shinri.suzuki@keio.jp",
  invitation: "研究・開発の相談や、異なる専門からの対話をお待ちしています。",
  topics: [
    "AI・感情理解の共同研究",
    "医療・心理・法律と倫理の接点",
    "技術開発・研究活動への支援",
  ],
  support:
    "計算資源やクラウド環境、研究・プロトタイプ開発への支援、専門家とのつながりについてもご相談ください。",
};
