// Long-form project dossiers for the RA2 briefing page.
// Keyed by the same slug values used in src/data/portfolio.ts.

export interface BriefingSection {
  heading: string;
  body: string;
}

export interface Briefing {
  slug: string;
  codename: string;           // e.g. "OP. CLEAR SIGHT"
  classification: string;     // e.g. "CLASSIFIED · CLR-4"
  sector: string;             // e.g. "MED-HCI"
  coordinates: string;        // e.g. "43.66°N 79.39°W"
  objective: string;          // one-sentence mission statement
  status: 'ACTIVE' | 'SHIPPED' | 'ARCHIVED' | 'ONGOING';
  duration: string;           // "2023 — PRESENT"
  role: string[];             // ["Lead Engineer", "HCI Researcher"]
  stack: string[];            // tech listed as dog-tags
  sections: BriefingSection[]; // Background / Approach / Outcome / Notes
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
}

export const briefings: Record<string, Briefing> = {
  'claws-cue-balls': {
    slug: 'claws-cue-balls',
    codename: 'CLAWS & CUE BALLS',
    classification: 'GAME DEV',
    sector: 'INDIE GAMES',
    coordinates: 'Remote Development',
    objective:
      'Deliver a unique fusion of roguelike mechanics and precision billiards gameplay set in a stylized noir cat-mafia underworld.',
    status: 'ONGOING',
    duration: '2025 — Q4 2026',
    role: ['Game Designer', 'Gameplay Programmer', 'Systems Designer'],
    stack: ['Unreal Engine 5.7', 'C++', 'Blueprint'],
    sections: [
      {
        heading: 'Concept',
        body:
          'Claws & Cue Balls is a roguelike billiards game that combines the precision and strategy of pool with the unpredictability and replayability of roguelike gameplay. Set in a stylized noir underworld run by cat mobsters, players navigate procedurally generated pool tables filled with obstacles, power-ups, and environmental hazards. Each run presents unique challenges requiring players to adapt their strategy and master increasingly complex trick shots.',
      },
      {
        heading: 'Gameplay Systems',
        body:
          'The game features physics-based billiards mechanics built on Unreal Engine 5.7, ensuring realistic ball behavior and collision physics. Procedural generation creates unique table layouts for each run, incorporating obstacles, hazards, and power-ups. A roguelike progression system allows players to unlock new abilities, modifiers, and equipment between runs. Strategic depth emerges from resource management, shot planning, and risk-reward decision making.',
      },
      {
        heading: 'Visual Design',
        body:
          'Claws & Cue Balls embraces a noir aesthetic with hand-crafted cat-mafia characters inhabiting moody, atmospheric environments. The art direction blends stylized character designs with detailed environmental storytelling, creating a memorable visual identity. Unreal Engine 5.7 enables next-generation visual fidelity with advanced lighting, materials, and post-processing effects that enhance the noir atmosphere.',
      },
      {
        heading: 'Development Status',
        body:
          'Currently in active development for PC release via Steam in Q4 2026. Core billiards physics and procedural generation systems are implemented. Character design and environmental art production are underway. Focus areas include expanding the roguelike progression system, refining trick shot mechanics, and developing narrative content that reveals the cat-mafia underworld through gameplay.',
      },
    ],
  },

  'rock-goblin': {
    slug: 'rock-goblin',
    codename: 'ROCK & GOBLIN',
    classification: 'GAME DEV',
    sector: 'INDIE GAMES',
    coordinates: 'Remote Development',
    objective:
      'Create an innovative tower defense experience where mineral properties and resource management drive strategic combat decisions.',
    status: 'ONGOING',
    duration: '2025 — Q1 2027',
    role: ['Game Designer', 'Gameplay Programmer', 'Systems Designer'],
    stack: ['Unity 6', 'C#'],
    sections: [
      {
        heading: 'Concept',
        body:
          'Rock & Goblin reimagines tower defense through a unique mineral-based damage system where different ores and minerals deal varying damage to different enemy types. Players command a chaotic workforce of goblins who mine resources, construct towers, and defend against waves of enemies. The core innovation lies in discovering which mineral combinations are most effective against specific threats, creating a rock-paper-scissors style combat system with significant strategic depth.',
      },
      {
        heading: 'Mineral Combat System',
        body:
          'The mineral-based damage system is the game\'s defining mechanic. Different minerals exhibit unique properties: some are effective against armored enemies, others against fast-moving threats, while rare minerals provide special effects like area damage or status effects. Players must balance mining operations to gather the right resources while simultaneously defending their base. Tower effectiveness depends on correct mineral selection, encouraging experimentation and strategic adaptation as new enemy types appear.',
      },
      {
        heading: 'Goblin Workforce',
        body:
          'Goblin workers add personality and management challenges to the tower defense formula. Each goblin has AI-driven behavior that influences their efficiency and decision-making. Players assign goblins to mining, tower construction, or resource transport tasks, but goblins have their own quirks and preferences that affect performance. Managing this chaotic workforce creates emergent gameplay situations where optimal strategy meets unpredictable goblin behavior.',
      },
      {
        heading: 'Development Status',
        body:
          'In active development for PC release via Steam in Q1 2027. Built with Unity 6 to leverage the latest engine features for performance and visual quality. Core systems implemented include mineral resource extraction, tower construction framework, and goblin AI behavior. Current development focuses on enemy variety, mineral property balancing, campaign structure, and level design that introduces mechanics progressively while maintaining challenge and strategic depth.',
      },
    ],
  },

  'eye-search': {
    slug: 'eye-search',
    codename: 'EYE-SEARCH',
    classification: 'MED-HCI',
    sector: 'THERAPEUTIC SERIOUS GAMES',
    coordinates: 'UCL, London-UK',
    objective:
      'Deliver a gamified, self-guided web-based therapy for hemianopia patients using compensatory visual search training.',
    status: 'ACTIVE',
    duration: '2020 — PRESENT',
    role: ['Full-Stack Developer', 'Gameplay Systems Developer', 'UX Designer', 'HCI Researcher'],
    stack: ['Unity WebGL', 'Node.js', 'MySQL', 'AWS', 'React'],
    sections: [
      {
        heading: 'Background',
        body:
          'Eye-Search is a free, open, self-guided, web-based therapeutic intervention designed to support patients with hemianopia, a visual impairment caused by damage to visual processing areas of the brain. The condition frequently occurs after stroke, traumatic brain injury, or tumors and is often accompanied by visual neglect. The objective is to improve visual search speed and accuracy in real-world daily tasks by training compensatory strategies. The therapy does not restore lost visual fields but enhances the effective use of remaining vision through structured practice.',
      },
      {
        heading: 'Approach',
        body:
          'A major challenge in web-based therapies is long-term adherence. To address this, Eye-Search was designed as a gamified therapeutic system focused on engagement and motivation. The framework included intrinsic and extrinsic reward systems based on daily tasks with in-game items, an NPC companion to increase social relatedness and user motivation, and spaced practice mechanics to support motor skill learning and long-term retention. The system was migrated from legacy Flash-based architecture to Unity WebGL with cloud-based backends to improve performance and scalability.',
      },
      {
        heading: 'Outcome',
        body:
          'Eye-Search was successfully deployed and is currently live. The complete redesign improved user engagement metrics significantly. The project was developed as part of a research collaboration between the University of Chile and University College London, resulting in published HCI research on gamification mechanisms applied to hemianopia therapy. The application is open-source and freely accessible worldwide.',
      },
      {
        heading: 'Research',
        body:
          'The project resulted in a study on the application of gamification mechanisms to improve patient adherence in web-based hemianopia therapy. User studies and quantitative data analysis were conducted to evaluate engagement metrics and therapeutic outcomes over extended therapy periods.',
      },
    ],
    links: [
      { label: 'Live Application', href: 'https://eye-search.co.uk/' },
    ],
  },

  readright: {
    slug: 'readright',
    codename: 'READRIGHT',
    classification: 'MED-HCI',
    sector: 'THERAPEUTIC APPS',
    coordinates: 'UCL, London-UK',
    objective:
      'Practice-based therapy application designed to improve reading speed in patients with Hemianopic Alexia through structured exercises and progress tracking.',
    status: 'ACTIVE',
    duration: '2020 — 2023',
    role: ['Backend Developer', 'Full-Stack Contributor'],
    stack: ['Unity', 'React', 'Node.js', 'WebGL'],
    sections: [
      {
        heading: 'Background',
        body:
          'ReadRight is a therapeutic application targeting Hemianopic Alexia, a reading disorder that often accompanies hemianopia after stroke. Patients experience severe disruption to reading ability as the eye must make compensatory saccades across the blind visual field.',
      },
      {
        heading: 'Approach',
        body:
          'The application focuses on structured reading exercises combined with progress tracking for both patients and clinicians. Backend architecture was designed to enable real-time data collection, progress visualization, and clinician access to patient performance metrics. The system provides seamless integration with clinical workflows.',
      },
      {
        heading: 'Outcome',
        body:
          'ReadRight successfully deployed with robust backend systems supporting multiple clinical sites. The platform enables clinicians to monitor patient progress remotely and adjust therapy parameters based on performance data.',
      },
    ],
  },

  coaniquem: {
    slug: 'coaniquem',
    codename: 'COANIQUEM',
    classification: 'PEDIATRIC',
    sector: 'SERIOUS GAMES',
    coordinates: 'UCH, Santiago-Chile',
    objective:
      'Gamified rehabilitation applications for pediatric burn injury recovery, focusing on social reintegration and joint range-of-motion therapy.',
    status: 'ONGOING',
    duration: '2022 — 2024',
    role: ['Game Designer', 'Gameplay Developer', 'UX Researcher'],
    stack: ['Unity 3D', 'R', 'Python'],
    sections: [
      {
        heading: 'Background',
        body:
          'COANIQUEM is a non-profit institution dedicated to the rehabilitation of children and adolescents with burn injuries. In collaboration with the University of Chile, two rehabilitation-focused applications were developed using gamification principles. Children recovering from severe burns must perform repetitive range-of-motion exercises that are both painful and tedious, leading to poor adherence.',
      },
      {
        heading: 'Project 1: VR Social Reintegration',
        body:
          'A virtual reality application designed to support social reintegration sessions by placing children in controlled simulated environments. The system allowed therapists to observe reactions, emotional responses, and behavioral patterns during rehabilitation exercises in safe, controlled settings before facing real-world situations.',
      },
      {
        heading: 'Project 2: Motion-Based Rehabilitation Game',
        body:
          'A video game designed to support children with joint mobility limitations resulting from burn injuries. The game captured joint range-of-motion data during play, providing therapists with measurable indicators to track patient progress while maintaining engagement. Exercise sets were parametrized per patient via a clinician-facing editor.',
      },
      {
        heading: 'Collaboration',
        body:
          'Both projects were developed in close collaboration with rehabilitation specialists at COANIQUEM who validated design decisions and participated in iterative testing. The clinical team provided ongoing feedback to ensure therapeutic effectiveness while maintaining engagement.',
      },
    ],
  },

  alerce: {
    slug: 'alerce',
    codename: 'ALERCE',
    classification: 'DATA PIPELINE',
    sector: 'ASTRO-DATA',
    coordinates: 'UCH NLHPC, Santiago-Chile',
    objective:
      'Real-time astronomical alert broker processing and classifying transient events from the Zwicky Transient Facility at massive scale.',
    status: 'SHIPPED',
    duration: '2018',
    role: ['Backend Developer'],
    stack: ['Python', 'Node.js', 'MongoDB', 'Apache Kafka', 'Apache Spark'],
    sections: [
      {
        heading: 'Background',
        body:
          'ALeRCE (Automatic Learning for the Rapid Classification of Events) is a Chilean-led astronomical alert broker that processes data from the Zwicky Transient Facility (ZTF). The system classifies and distributes transient astronomical alerts at scale for the research community worldwide. Latency and throughput both matter because transient astronomical events fade quickly.',
      },
      {
        heading: 'Approach',
        body:
          'Backend development focused on high-throughput data pipelines using distributed systems and streaming architectures. The system processes millions of alerts per night, applying machine learning classification to identify supernovae, variable stars, asteroids, and other transient events in real-time.',
      },
      {
        heading: 'Outcome',
        body:
          'ALeRCE successfully deployed and continues operating as a critical resource for the astronomical community. The distributed architecture handles massive data volumes with low latency, enabling rapid follow-up observations of time-critical events.',
      },
    ],
    links: [
      { label: 'Live System', href: 'https://alerce.science' },
    ],
  },

  sinapp: {
    slug: 'sinapp',
    codename: 'SINAPP',
    classification: 'EDU-GAME',
    sector: 'SERIOUS GAMES',
    coordinates: 'Gero, Santiago-Chile',
    objective:
      'Educational serious game teaching children and general audiences about lifestyle habits contributing to cognitive health and Alzheimer\'s disease prevention.',
    status: 'SHIPPED',
    duration: '2017',
    role: ['Gameplay Programmer'],
    stack: ['Unity 3D'],
    sections: [
      {
        heading: 'Background',
        body:
          'Sinapp is a mobile serious game developed for the GERO Institute in Chile focused on Alzheimer\'s disease prevention education. The game targets children and general audiences, teaching about lifestyle factors that contribute to cognitive health through engaging gameplay mechanics.',
      },
      {
        heading: 'Approach',
        body:
          'The player maintains and expands a neuronal network over the lifespan of a character by balancing four core activities: physical exercise, reading, sports, and healthy diet. Each activity affects gameplay systems differently, reinforcing the educational message through mechanics rather than exposition. The neuronal network metaphor provides a visual representation of brain health throughout the character\'s simulated lifespan.',
      },
      {
        heading: 'Outcome',
        body:
          'Sinapp successfully launched and achieved positive reception from the target audience. The game effectively communicated complex health concepts through intuitive gameplay systems, making cognitive health education accessible and engaging for younger audiences.',
      },
    ],
  },

  mdv: {
    slug: 'mdv',
    codename: 'Multi Dimensional Viewer',
    classification: 'RESEARCH ',
    sector: 'BIO-DATA',
    coordinates: 'Oxford MSD, London-UK',
    objective:
      'Platform for analyzing, annotating, and sharing multi-dimensional biological data with interactive visualizations and flexible data source integration.',
    status: 'SHIPPED',
    duration: '2024 — 2025',
    role: ['Full-Stack Developer'],
    stack: ['React', 'TypeScript', 'Node.js', 'Python', 'Flask', 'Apache Kafka', 'PostgreSQL', 'Polars', 'Dask', 'Celery'],
    sections: [
      {
        heading: 'Background',
        body:
          'The Multi-Dimensional Viewer (MDV) is a platform developed at the University of Oxford Medical Sciences Division for analyzing, annotating, and sharing multi-dimensional biological data. The system provides researchers with powerful capabilities for multiome analysis, spatial clustering, network analysis, and image management.',
      },
      {
        heading: 'Approach',
        body:
          'Full-stack architecture designed using React, TypeScript, Node.js, Python, Flask, Apache Kafka, and PostgreSQL. The platform features interactive charts and widgets including spreadsheets, genome browsers, image viewers, and 3D scatter plots. Multiple data sources can be loaded with defined links between them, supporting diverse data formats from API calls to static files. Focus on application performance optimization and user experience through optimized data ingestion and visualization pipelines.',
      },
      {
        heading: 'Collaboration',
        body:
          'Worked closely with researchers across the Medical Sciences Division to implement computational methods for biological data analysis. The platform supports multiple views of the same data with charts that can pop out into separate windows, enabling multi-screen workflows for complex research tasks.',
      },
    ],
  },

  'education-platform': {
    slug: 'education-platform',
    codename: 'OP. EDUDATA',
    classification: 'EDU-PLATFORM',
    sector: 'BIG DATA',
    coordinates: '33.45°S 70.67°W',
    objective:
      'Large-scale education data synchronization and analytics platform for school management systems with real-time data processing.',
    status: 'ARCHIVED',
    duration: '2019',
    role: ['Backend and Full-Stack Developer'],
    stack: ['Vue', 'Ruby on Rails', 'Python', 'Node.js', 'MongoDB', 'GCP'],
    sections: [
      {
        heading: 'Background',
        body:
          'Platform designed for the analysis and synchronization of large-scale education data used in school management systems. The system needed to handle real-time data ingestion, transformation, and reporting across multiple educational institutions with thousands of concurrent users.',
      },
      {
        heading: 'Approach',
        body:
          'Architecture designed as a scalable microservices system using Vue, Ruby on Rails, Python, Node.js, and MongoDB deployed on Google Cloud Platform. Full-Stack development and implementation of Big Data ETL pipelines enabled continuous data updates and analytics across multiple institutions. The system was built to support high concurrency and data consistency across distributed systems.',
      },
      {
        heading: 'Outcome',
        body:
          'Successfully deployed platform supporting large-scale education data operations. The microservices architecture provided the scalability needed for multiple institutions while maintaining data consistency and real-time synchronization capabilities.',
      },
    ],
  },

};

// Fallback builder for projects that don't have a hand-written dossier.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getBriefing(slug: string, project: any): Briefing {
  const hand = briefings[slug];
  if (hand) return hand;
  return {
    slug,
    codename: `OP. ${(project?.title ?? slug).toString().toUpperCase()}`,
    classification: 'UNCLASSIFIED · CLR-1',
    sector: (project?.tag ?? 'GEN').toString().toUpperCase(),
    coordinates: project?.coordinates ?? '—',
    objective: project?.subtitle ?? project?.description ?? 'Mission objective on file.',
    status: 'ARCHIVED',
    duration: project?.year ?? project?.duration ?? '—',
    role: project?.role ?? ['Engineer'],
    stack: project?.technologies ?? [],
    sections: [
      { heading: 'Summary', body: project?.description ?? 'No extended briefing on file.' },
    ],
  };
}
