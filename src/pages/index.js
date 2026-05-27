import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import matrixPoisonPaperPdf from '@site/static/papers/self-evolving-matrix-poison-agent-on-recommender-system.pdf';
import paper01Figure from '@site/static/img/papers/paper-01.png';
import paper02Figure from '@site/static/img/papers/paper-02.png';
import paper03Figure from '@site/static/img/papers/paper-03.png';
import paper04Figure from '@site/static/img/papers/paper-04.png';
import paper05Figure from '@site/static/img/papers/paper-05.png';
import paper06Figure from '@site/static/img/papers/paper-06.png';
import paper07Figure from '@site/static/img/papers/paper-07.png';
import xjtluLogo from '@site/static/img/logos/xjtlu.png';
import liverpoolLogo from '@site/static/img/logos/university_of_liverpool.png';
import rutgersLogo from '@site/static/img/logos/rutgers.png';
import northwesternLogo from '@site/static/img/logos/northwestern.png';
import ritLogo from '@site/static/img/logos/rit.png';
import cuhkLogo from '@site/static/img/logos/cuhk.png';
import usfLogo from '@site/static/img/logos/usf.png';

const paperList = [
  {
    id: '01',
    title:
      'Goal-guided Generative Prompt Injection Attack on Large Language Models',
    source: 'ICDM 2024',
    url: 'https://ieeexplore.ieee.org/abstract/document/10884369',
    image: paper01Figure,
    description:
      'Abstract: This work introduces G2PIA, a query-free black-box prompt injection attack for LLMs. It formulates attack optimization as maximizing KL divergence between clean and injected prompts, and links this objective to representation-level distance changes. Experiments on seven LLMs and four datasets show effective attacks with low computational cost.',
  },
  {
    id: '02',
    title: 'Target-driven Attack for Large Language Models',
    source: 'ECAI 2024',
    url: 'https://ebooks.iospress.nl/doi/10.3233/FAIA240685',
    image: paper02Figure,
    description:
      "Abstract: This paper proposes a target-driven black-box attack that optimizes KL divergence between model outputs on clean and adversarial inputs. The method derives convex objectives for attack text and covariance estimation, then uses projected optimization with token manipulation and misinformation strategies. Results on multiple LLMs and datasets show consistent effectiveness.",
  },
  {
    id: '03',
    title:
      'Semantic-Preserving Prompt Hijacking: A Black-Box Adversarial Attack on Auto-Prompt Optimization',
    source: 'ICME 2026',
    url: 'https://scholar.xjtlu.edu.cn/en/publications/semantic-preserving-prompt-hijacking-a-black-box-adversarial-atta/',
    image: paper03Figure,
    description:
      'Abstract: This paper studies attacks on visible auto-prompt optimization and proposes Adaptive Greedy Local Search (AGLS) under black-box access. AGLS decomposes input hierarchically, masks key units, and updates candidates at semantic checkpoints to maximize output deviation while preserving meaning. Across commercial and open-source LLMs, it reports higher success under equal similarity constraints.',
  },
  {
    id: '04',
    title:
      'Efficient and Stealthy Jailbreak Attacks via Adversarial Prompt Distillation from LLMs to SLMs',
    source: 'Technical Report',
    url: 'https://arxiv.org/abs/2506.17231',
    image: paper04Figure,
    description:
      'Abstract: This work presents Adversarial Prompt Distillation, transferring jailbreak capability from large models to smaller language models (SLMs). By combining masked language modeling, reinforcement learning, and dynamic temperature control, it improves efficiency while retaining strong attack effectiveness. Experiments show competitive jailbreak success with lower deployment cost and better cross-model practicality.',
  },
  {
    id: '05',
    title: 'Self-Evolving Matrix-Poison Agent on Recommender System',
    source: 'Pre-Print',
    url: matrixPoisonPaperPdf,
    image: paper05Figure,
    local: true,
    description:
      'Abstract: Matrix-Poison is a self-evolving LLM agent for poisoning recommender systems through coordinated multi-account behaviors. It targets category-level manipulation and addresses vulnerability discovery, black-box planning, account collaboration, and stealthy self-correction. On real-world datasets, it outperforms prior baselines and shows strong cross-market portability.',
  },
  {
    id: '06',
    title:
      'AttackEval: How to Evaluate the Effectiveness of Jailbreak Attacking on Large Language Models',
    source: 'SIGKDD Exploration',
    url: 'https://dl.acm.org/doi/abs/10.1145/3748239.3748242',
    image: paper06Figure,
    description:
      "Abstract: AttackEval introduces coarse-grained and fine-grained metrics (0-1 scale) to evaluate jailbreak prompt effectiveness beyond binary success or failure. It also provides a dedicated ground-truth dataset for benchmarking harmful prompt strength. Compared with conventional evaluation, the framework offers more nuanced differentiation and better identification of subtly risky prompts.",
  },
  {
    id: '07',
    title: 'Large Vision-Language Model Security: A Survey',
    source: 'FCS 2024',
    url: 'https://link.springer.com/chapter/10.1007/978-981-96-0151-6_1',
    image: paper07Figure,
    description:
      'Abstract: This survey reviews security risks in large vision-language models, including jailbreaks, backdoors, hallucinations, privacy leakage, and deployment reliability challenges. It summarizes current defenses and discusses legal and ethical issues in real applications. The paper also highlights open limitations and outlines priorities for safer future LVLM research.',
  },
];

const institutionList = [
  {
    name: "Xi'an Jiaotong-Liverpool University",
    logo: xjtluLogo,
  },
  {
    name: 'University of Liverpool',
    logo: liverpoolLogo,
  },
  {
    name: 'Rutgers University',
    logo: rutgersLogo,
  },
  {
    name: 'Northwestern University',
    logo: northwesternLogo,
  },
  {
    name: 'Rochester Institute of Technology',
    logo: ritLogo,
  },
  {
    name: 'The Chinese University of Hong Kong',
    logo: cuhkLogo,
  },
  {
    name: 'University of South Florida',
    logo: usfLogo,
    darkPanel: true,
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className={styles.kicker}>Project Homepage</p>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Distribution-guided adversarial attack literature homepage for LLM and LVLM security.">
      <HomepageHeader />
      <main className={styles.mainContent}>
        <section className={styles.overview}>
          <div className="container">
            <Heading as="h2">Collection Scope</Heading>
            <p>
              This page tracks a focused sequence of seven papers around prompt
              injection, jailbreak transfer, adversarial optimization, and
              attack evaluation for large language models and vision-language
              models.
            </p>
          </div>
        </section>
        <section id="paper-list" className={styles.paperSection}>
          <div className="container">
            <Heading as="h2">Paper List</Heading>
            <div className={styles.paperList}>
              {paperList.map((paper) => (
                <article key={paper.id} className={styles.paperCard}>
                  <div className={styles.paperMeta}>
                    <div className={styles.paperTop}>
                      <span className={styles.paperId}>Paper {paper.id}</span>
                      <span className={styles.paperSource}>{paper.source}</span>
                    </div>
                    <Heading as="h3" className={styles.paperTitle}>
                      {paper.title}
                    </Heading>
                    <p className={styles.paperDesc}>{paper.description}</p>
                    <a
                      className={styles.paperLink}
                      href={paper.url}
                      target={!paper.local ? '_blank' : undefined}
                      rel={!paper.local ? 'noreferrer noopener' : undefined}>
                      View paper
                    </a>
                  </div>
                  <figure className={styles.methodFigure}>
                    <img src={paper.image} alt={`Method figure for paper ${paper.id}`} />
                  </figure>
                </article>
              ))}
            </div>
            <section className={styles.institutionSection}>
              <div className={styles.institutionHeader}>
                <span className={styles.institutionLine} />
                <Heading as="h3" className={styles.institutionTitle}>
                  University Institutions
                </Heading>
                <span className={styles.institutionLine} />
              </div>
              <div className={styles.institutionGrid}>
                {institutionList.map((institution) => (
                  <article key={institution.name} className={styles.institutionItem}>
                    <div
                      className={clsx(
                        styles.institutionLogoWrap,
                        institution.darkPanel && styles.institutionLogoWrapDark
                      )}>
                      <img
                        className={styles.institutionLogo}
                        src={institution.logo}
                        alt={`${institution.name} logo`}
                      />
                    </div>
                    <p className={styles.institutionName}>{institution.name}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
