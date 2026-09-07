import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Plus,
  Mail,
  ChevronDown,
} from "lucide-react";
import {
  profile,
  projects,
  internships,
  achievements,
  qualifications,
  media,
  activities,
  domains,
  skills,
  roadmap,
  contact,
} from "../data/portfolioData";

function SectionHeading({ number, en, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span className="section-number">{number}</span><span>{en}</span>
        </p>
        <h2 tabIndex={-1}>{title}</h2>
      </div>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}

function ExternalLink({ url, label }) {
  return (
    <a
      className="text-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <ArrowUpRight size={17} aria-hidden="true" />
      <span className="sr-only">（新しいタブで開く）</span>
    </a>
  );
}

function Tags({ items }) {
  return (
    <ul className="tags" aria-label="関連する技術・領域">
      {items.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

const focusItems = [
  { id: "research", label: "研究", en: "CURRENT RESEARCH" },
  { id: "internships", label: "経験", en: "IN THE FIELD" },
  { id: "approach", label: "考え方", en: "ACROSS DISCIPLINES" },
];

function FocusFrame() {
  const researchIntro = `${projects[0].summary.split("。")[0]}。`;
  const introBreak = researchIntro.indexOf("、") + 1;
  const [selected, setSelected] = useState("research");
  const current = focusItems.find((item) => item.id === selected);
  return (
    <div className="focus-frame">
      <div className="focus-controls" role="group" aria-label="焦点を切り替える">
        {focusItems.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={selected === item.id}
            aria-controls="focus-reading" onClick={() => setSelected(item.id)}>
            <span aria-hidden="true">0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="focus-reading" id="focus-reading" aria-live="polite" aria-atomic="true">
        <p className="eyebrow">{current.en}</p>
        {selected === "research" && <>
          <h2 className="focus-title">{projects[0].name}<span className="focus-dot" aria-hidden="true">.</span></h2>
          <p className="focus-tagline">{projects[0].tagline}</p>
          <p className="focus-copy">{researchIntro.slice(0, introBreak)}<br />{researchIntro.slice(introBreak)}</p>
        </>}
        {selected === "internships" && <>
          <h2 className="focus-title focus-title-ja">現場から、<br />考える。</h2>
          <p className="focus-tagline">事業・技術・人をつなぐ経験</p>
          <p className="focus-copy">企画開発、プロトタイプ開発、<br />学習支援。{internships.length}つのインターンの現場へ。</p>
        </>}
        {selected === "approach" && <>
          <h2 className="focus-title focus-title-ja">分野の間に、<br />問いを置く。</h2>
          <p className="focus-tagline">{profile.fields}</p>
          <p className="focus-copy">{profile.thinking}<br />{profile.building}</p>
        </>}
        <a className="text-link focus-link" href={`#${selected}`}>
          {selected === "research" ? "研究・制作を見る" : selected === "internships" ? "インターンでの経験へ" : "考え方・技術を見る"}
          <ArrowDown size={22} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    <section className="page-section profile-section" id="profile" aria-labelledby="profile-title">
      <div className="section-topline"><span>01 / PROFILE</span><span>OPEN VARIABLES</span></div>
      <div className="hero-grid">
        <div className="hero-intro">
          <p className="eyebrow">{profile.role.toUpperCase()}</p>
          <h1 id="profile-title" tabIndex={-1}>{profile.nameJa}</h1>
          <p className="identity-reading">{profile.nameEn}</p>
          <div className="hero-identity">
            <p className="hero-question">問い、つくり、{" "}<br />また問う。</p>
            <p className="affiliation">{profile.affiliation}</p>
            <p className="hero-fields">{profile.fields}</p>
          </div>
        </div>
        <FocusFrame />
      </div>
      <div className="profile-context">
        <div className="profile-statement">
          <p className="eyebrow">{profile.focus}</p>
          <p>{profile.statement}</p>
        </div>
        <div className="roles-block">
          <h2>現在の活動</h2>
          <ul>{profile.roles.map((item) => <li key={item.organization}>{item.organization}<span>{item.role}</span></li>)}</ul>
        </div>
      </div>
      <div className="principles-strip">
        <p><span>THINK</span><strong>{profile.thinking}</strong></p>
        <p><span>BUILD</span><strong>{profile.building}</strong></p>
        <p className="future-motto"><strong>{profile.motto}</strong><span>{profile.mottoJa}</span></p>
      </div>
    </section>
  );
}

export function Research() {
  return (
    <section
      className="page-section research-section"
      id="research"
      aria-label="研究・制作"
    >
      <SectionHeading number="02" en="RESEARCH & PROJECTS" title="研究・制作">
        感情を理解するAIを軸に、実装と、人や社会への問いを行き来しています。
      </SectionHeading>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            className={`project${index === 0 ? " project-featured" : ""}`}
            key={project.id}
          >
            <div className="project-kicker">
              <span className="eyebrow">PROJECT 0{index + 1}</span>
              <span className="status-label">{project.status}</span>
            </div>
            <div className="project-overview">
              <div className="project-title-block">
                <h3>{project.name}</h3>
                <p className="project-tagline">{project.tagline}</p>
              </div>
              <p className="project-summary">{project.summary}</p>
            </div>
            <Tags items={project.stack} />
            <details className="project-detail" id={project.id} open>
              <summary>
                <span>{project.name} の詳細</span>
                <Plus size={18} aria-hidden="true" />
              </summary>
              <div className="detail-body">
                <dl>
                  <div>
                    <dt>目指すこと</dt>
                    <dd>{project.aim}</dd>
                  </div>
                  <div>
                    <dt>取り組み</dt>
                    <dd>{project.approach}</dd>
                  </div>
                </dl>
                {project.links.map((link) => (
                  <ExternalLink key={link.url} {...link} />
                ))}
              </div>
            </details>
          </article>
        ))}
      </div>
      <div className="section-next">
        <a className="text-link" href="#internships">
          現場での経験へ <ArrowDown size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function Internships() {
  return (
    <section
      className="page-section internships-section"
      id="internships"
      aria-label="インターン"
    >
      <SectionHeading number="03" en="EXPERIENCE" title="インターン">
        事業を考えること、技術をつくること、人に届けること。3つの現場で学びました。
      </SectionHeading>
      <div className="experience-list">
        {internships.map((item, index) => (
          <article className="experience" key={item.id}>
            <div className="experience-date">
              <span className="experience-index" aria-hidden="true">
                0{index + 1}
              </span>
              <p>{item.period}</p>
              <span className="status-label">インターン期間</span>
            </div>
            <div className="experience-content">
              <h3>{item.organization}</h3>
              <p className="experience-role">{item.role}</p>
              <h4 className="minor-label">担当</h4>
              <ul className="responsibilities">
                {item.responsibilities.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
            <details className="experience-detail" id={item.id} open>
                <summary>
                  <span>{item.organization} での学び</span>
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <div className="detail-body">
                  {item.learnings.map((learning) => (
                    <p key={learning}>{learning}</p>
                  ))}
                </div>
            </details>
          </article>
        ))}
      </div>
      <div className="section-next">
        <a className="text-link" href="#achievements">
          大会・受賞等へ <ArrowDown size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function Achievements() {
  const [category, setCategory] = useState("all");
  useEffect(() => {
    const revealLinkedRecord = () => {
      let id;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (achievements.some((item) => item.id === id)) setCategory("all");
    };
    window.addEventListener("hashchange", revealLinkedRecord);
    return () => window.removeEventListener("hashchange", revealLinkedRecord);
  }, []);
  const categories = [
    ...new Map(
      achievements.map((item) => [item.category, item.categoryLabel]),
    ).entries(),
  ];
  const shown = achievements.filter(
    (item) => category === "all" || item.category === category,
  );
  return (
    <section
      className="page-section achievements-section"
      id="achievements"
      aria-label="大会・受賞等"
    >
      <SectionHeading number="04" en="ACHIEVEMENTS" title="大会・受賞等">
        研究を発表し、対話し、次の問いへ。受賞から研究支援、学びの機会まで。
      </SectionHeading>
      <div className="achievements-toolbar">
        <label htmlFor="achievement-category">
          表示する実績の区分
          <span className="select-wrap">
            <select
              id="achievement-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="all">すべての区分</option>
              {categories.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="select-chevron"
              aria-hidden="true"
            />
          </span>
        </label>
        <p aria-live="polite">{shown.length}件の活動記録</p>
      </div>
      <div className="achievement-list">
        {achievements.map((item) => (
          <details
            key={item.id}
            id={item.id}
            className="achievement"
            data-category={item.category}
            hidden={category !== "all" && item.category !== category}
          >
            <summary>
              <span className="achievement-meta">
                <time dateTime={item.date}>{item.dateLabel}</time>
                <span className="category-label">{item.categoryLabel}</span>
              </span>
              <span className="achievement-heading">
                <h3>{item.title}</h3>
                <span className="achievement-result">{item.result}</span>
              </span>
              <Plus className="detail-icon" size={19} aria-hidden="true" />
            </summary>
            <div className="achievement-body">
              <p>{item.description}</p>
              {item.organization && (
                <p className="organizer">
                  関連団体・プログラム：{item.organization}
                </p>
              )}
              <div className="record-links">
                {item.links.map((link) => (
                  <ExternalLink key={link.url} {...link} />
                ))}
                <a className="record-permalink" href={`#${item.id}`}>
                  この記録へのリンク
                  <span className="sr-only">：{item.title}</span>
                </a>
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="qualifications">
        <h3 className="subsection-title">資格</h3>
        {qualifications.map((item) => (
          <article key={item.id} id={item.id} className="qualification-row">
            <time dateTime={item.date}>{item.dateLabel}</time>
            <div>
              <h4>
                {item.title}{" "}
                <span className="category-label">{item.result}</span>
              </h4>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="media-block">
        <h3 className="subsection-title">メディア掲載</h3>
        <div className="media-grid">
          {media.map((item) => (
            <article className="media-item" key={item.id} id={item.id}>
              <p className="minor-label">
                <time dateTime={item.date}>{item.dateLabel}</time>
              </p>
              <h4>{item.title}</h4>
              <p className="media-result">{item.result}</p>
              <p>{item.description}</p>
              {item.links.map((link) => (
                <ExternalLink
                  key={link.url}
                  url={link.url}
                  label={`${item.title}の記事を読む`}
                />
              ))}
            </article>
          ))}
        </div>
      </div>
      <div className="section-next">
        <a className="text-link" href="#contact">
          研究・活動について連絡する <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section
      className="page-section approach-section"
      id="approach"
      aria-label="考え方・技術"
    >
      <SectionHeading number="05" en="APPROACH & SKILLS" title="考え方・技術">
        仕組みを基礎から理解し、手を動かして考える。分野の境界を越えて問いを育てます。
        <span className="approach-principle">
          <span>{profile.thinking}</span>
          <ArrowRight size={18} aria-hidden="true" />
          <span>{profile.building}</span>
        </span>
      </SectionHeading>
      <div className="domain-grid">
        {domains.map((item, index) => (
          <article className="domain" key={item.id}>
            <span className="domain-index" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{item.name}</h3>
            <p className="domain-en">{item.nameEn}</p>
            <p>{item.description}</p>
            <Tags items={item.topics} />
          </article>
        ))}
      </div>
      <div className="skills-block">
        <h3 className="subsection-title">研究・制作を支える技術</h3>
        <div className="skills-grid">
          {skills.map((item) => (
            <article className="skill" key={item.name}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <Tags items={item.technologies} />
            </article>
          ))}
        </div>
      </div>
      <div className="activity-block">
        <h3 className="subsection-title">学びと活動の歩み</h3>
        {activities.map((item) => (
          <article className="activity-row" key={item.id} id={item.id}>
            <div>
              {item.date && item.dateLabel && (
                <time dateTime={item.date}>{item.dateLabel}</time>
              )}
              <span className="status-label">{item.status}</span>
            </div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="roadmap-block">
        <h3 className="subsection-title">これからの目標</h3>
        <div className="roadmap-grid">
          {roadmap.map((item) => (
            <article key={item.id} id={item.id}>
              <p className="eyebrow">{item.period}</p>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      className="page-section contact-section"
      id="contact"
      aria-label="連絡先"
    >
      <SectionHeading
        number="06"
        en="CONTACT"
        title={
          <>
            次の問いを、
            <wbr />
            <span className="keep-phrase">一緒に。</span>
          </>
        }
      />
      <div className="contact-grid">
        <div>
          <p className="contact-invitation">{contact.invitation}</p>
          <a className="contact-email" href={`mailto:${contact.email}`}>
            <Mail size={24} aria-hidden="true" />
            <span>{contact.email}</span>
            <ArrowUpRight size={24} aria-hidden="true" />
          </a>
          <p className="minor-label">メールアプリが開きます</p>
          <nav className="social-links" aria-label="SNS・プロフィール">
            {profile.socials.map((link) => (
              <ExternalLink key={link.url} {...link} />
            ))}
          </nav>
        </div>
        <div className="contact-topics">
          <h3>お話ししたいこと</h3>
          <ul>
            {contact.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <p>{contact.support}</p>
        </div>
      </div>
      <footer className="site-footer">
        <div>
          <p>{profile.motto}</p>
          <span>{profile.mottoJa}</span>
        </div>
        <a className="text-link" href="#profile">
          ページの先頭へ <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <small>© 2026 {profile.nameEn}</small>
      </footer>
    </section>
  );
}
