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
  'eye-search': {
    slug: 'eye-search',
    codename: 'OP. CLEAR SIGHT',
    classification: 'FIELD STUDY · CLR-3',
    sector: 'MED-HCI',
    coordinates: '51.52°N 0.13°W',
    objective:
      'Deliver a gaze-driven visual-field therapy that clinicians can deploy on consumer-grade webcams.',
    status: 'ACTIVE',
    duration: '2023 — PRESENT',
    role: ['Lead Engineer', 'HCI Researcher'],
    stack: ['TypeScript', 'WebGL', 'MediaPipe', 'Python', 'FastAPI', 'Postgres'],
    sections: [
      {
        heading: 'Background',
        body:
          'Patients recovering from occipital-lobe stroke typically lose function in a quadrant of the visual field. Traditional rehabilitation relies on lab-grade eye trackers priced beyond the reach of most outpatient clinics. Eye-Search set out to deliver clinically useful therapy sessions using only the webcam the patient already owns.',
      },
      {
        heading: 'Approach',
        body:
          'A lightweight calibration pass estimates the patient\'s gaze vector using MediaPipe Face Mesh, with a project-tuned regressor on top. Sessions are structured as short visual search tasks that adapt difficulty in real time based on fixation accuracy. Clinicians log in through a separate operator console to review session telemetry and adjust plans.',
      },
      {
        heading: 'Outcome',
        body:
          'Deployed in a 40-patient cohort across two clinics. Task completion held within 8% of the reference eye-tracker condition. The operator console shipped as the primary clinical interface; patients use a stripped-down mobile view.',
      },
      {
        heading: 'Notes',
        body:
          'Currently preparing for a multi-site trial with expanded task variety and a recalibration loop that runs every 90 seconds to fight drift from lighting changes.',
      },
    ],
    metrics: [
      { label: 'Patients enrolled', value: '40' },
      { label: 'Session accuracy', value: '92%' },
      { label: 'Clinic deployments', value: '2' },
      { label: 'Cost per seat', value: '< $50' },
    ],
  },

  readright: {
    slug: 'readright',
    codename: 'OP. READRIGHT',
    classification: 'THERAPY · CLR-3',
    sector: 'MED-HCI',
    coordinates: '51.52°N 0.13°W',
    objective:
      'Browser-based reading therapy for hemianopia patients, usable at home without supervision.',
    status: 'SHIPPED',
    duration: '2022 — 2023',
    role: ['Full-Stack Engineer', 'Clinical Integrator'],
    stack: ['React', 'TypeScript', 'WebGL', 'Node.js', 'Redis'],
    sections: [
      {
        heading: 'Background',
        body:
          'Hemianopia severely disrupts reading because the eye must make compensatory saccades across the blind field. ReadRight trains those saccades using controlled reading exercises with moving text and fixation cues.',
      },
      {
        heading: 'Approach',
        body:
          'Text is rendered on a WebGL scroller so motion is frame-locked. The reading pace adapts to measured saccade latency, and sessions end when fatigue thresholds are hit rather than on a fixed clock.',
      },
      {
        heading: 'Outcome',
        body:
          'Live at two UK rehabilitation centres; patients run sessions from home, progress syncs to their case file on the clinician side.',
      },
    ],
    metrics: [
      { label: 'Active patients', value: '120+' },
      { label: 'Clinics', value: '2' },
      { label: 'Avg session', value: '18 min' },
    ],
  },

  coaniquem: {
    slug: 'coaniquem',
    codename: 'OP. COANIQUEM',
    classification: 'PEDIATRIC · CLR-2',
    sector: 'MED-GAME',
    coordinates: '33.45°S 70.67°W',
    objective:
      'Turn a painful burn-rehabilitation exercise into a playable experience for children.',
    status: 'SHIPPED',
    duration: '2020 — 2021',
    role: ['Gameplay Programmer', 'UX Designer'],
    stack: ['Unity', 'C#', 'Kinect', 'JSON Telemetry'],
    sections: [
      {
        heading: 'Background',
        body:
          'Children recovering from severe burns must perform repetitive range-of-motion exercises. Adherence collapses because the exercises are painful and boring. The clinical team asked for an intervention that children would choose to do.',
      },
      {
        heading: 'Approach',
        body:
          'A lightweight adventure game where clinically prescribed motions drive the avatar. Exercise sets are parametrised per patient via a clinician-facing editor. A Kinect camera tracks motion; fallbacks to a webcam pose estimator were added for home use.',
      },
      {
        heading: 'Outcome',
        body:
          'Adherence rose from ~45% to ~85% in the pilot cohort. Clinicians reported the sessions became the part of treatment children asked for.',
      },
    ],
    metrics: [
      { label: 'Adherence lift', value: '+40 pts' },
      { label: 'Pilot patients', value: '28' },
      { label: 'Exercise types', value: '11' },
    ],
  },

  alerce: {
    slug: 'alerce',
    codename: 'OP. ALERCE',
    classification: 'DATA PIPELINE · CLR-1',
    sector: 'ASTRO-DATA',
    coordinates: '33.45°S 70.67°W',
    objective:
      'Ingest, classify, and serve astronomical alert streams to the research community in near real time.',
    status: 'SHIPPED',
    duration: '2019 — 2020',
    role: ['Backend Engineer'],
    stack: ['Python', 'Kafka', 'Airflow', 'Postgres', 'Docker', 'AWS'],
    sections: [
      {
        heading: 'Background',
        body:
          'ALeRCE (Automatic Learning for the Rapid Classification of Events) is a broker that consumes alert streams from telescopes and serves classified events to astronomers. Latency and throughput both matter because transient events fade quickly.',
      },
      {
        heading: 'Approach',
        body:
          'Kafka topics fan in raw alerts; Airflow orchestrates classification workers; a Postgres store serves the web API. Work focused on the ingestion layer and on keeping the classification step deterministic under backpressure.',
      },
      {
        heading: 'Outcome',
        body:
          'Pipeline handled ZTF alert volume without drop during the observation season. Architecture in use for the Rubin Observatory era.',
      },
    ],
    metrics: [
      { label: 'Alerts / night', value: '1M+' },
      { label: 'Median latency', value: '< 30s' },
    ],
  },

  sinapp: {
    slug: 'sinapp',
    codename: 'OP. SINAPP',
    classification: 'CIVIC · CLR-1',
    sector: 'GOV-OPS',
    coordinates: '33.45°S 70.67°W',
    objective:
      'Mobile-first incident reporting system for a municipal emergency service.',
    status: 'ARCHIVED',
    duration: '2018',
    role: ['Full-Stack Engineer'],
    stack: ['React Native', 'Node.js', 'MongoDB'],
    sections: [
      {
        heading: 'Background',
        body:
          'Field teams needed to file structured incident reports from patrol without returning to base. Paper forms were causing multi-day delays in analytics.',
      },
      {
        heading: 'Approach',
        body:
          'A React Native client with offline-first queuing synced to a Node backend. The reporting schema was co-designed with dispatch staff so fields mapped to the way they already spoke about incidents.',
      },
      {
        heading: 'Outcome',
        body:
          'Adopted by the pilot unit; time-to-record dropped from days to minutes. Project archived when the agency standardised on a national platform.',
      },
    ],
  },

  mdv: {
    slug: 'mdv',
    codename: 'OP. MDV',
    classification: 'EDU · CLR-1',
    sector: 'EDU-TOOL',
    coordinates: '33.45°S 70.67°W',
    objective:
      'Data-viz toolkit for classroom use in statistics courses.',
    status: 'SHIPPED',
    duration: '2017 — 2018',
    role: ['Engineer'],
    stack: ['D3.js', 'TypeScript', 'Python'],
    sections: [
      {
        heading: 'Background',
        body:
          'Stats courses assume students can read charts they have never had to build. MDV gave them a sandbox for constructing the charts that matched each week\'s content.',
      },
      {
        heading: 'Approach',
        body:
          'Thin D3 layer with a constraints-based API; content bank authored by the teaching team.',
      },
      {
        heading: 'Outcome',
        body:
          'Rolled out across two cohorts; exam performance on chart-reading items rose materially.',
      },
    ],
  },

  'education-platform': {
    slug: 'education-platform',
    codename: 'OP. CLASSROOM',
    classification: 'EDU · CLR-1',
    sector: 'EDU-TOOL',
    coordinates: '33.45°S 70.67°W',
    objective:
      'Course-delivery platform for a bootcamp-style programme.',
    status: 'SHIPPED',
    duration: '2016 — 2017',
    role: ['Engineer', 'Content Systems'],
    stack: ['React', 'Node.js', 'Postgres'],
    sections: [
      {
        heading: 'Background',
        body:
          'Existing LMS options were too heavy. The programme needed a thin platform with strong authoring ergonomics.',
      },
      {
        heading: 'Approach',
        body:
          'Markdown-first authoring with runnable code blocks; lightweight cohort model; instructor dashboards for progress.',
      },
      {
        heading: 'Outcome',
        body:
          'Ran for multiple cohorts before the programme shifted to an external provider.',
      },
    ],
  },

  'bit-heroes': {
    slug: 'bit-heroes',
    codename: 'OP. BIT HEROES',
    classification: 'LIVE-OPS · CLR-2',
    sector: 'GAME-OPS',
    coordinates: '43.66°N 79.39°W',
    objective:
      'Live-ops engineering on a long-running mobile RPG.',
    status: 'ONGOING',
    duration: '2021 — PRESENT',
    role: ['Gameplay Engineer', 'Live-Ops'],
    stack: ['Unity', 'C#', 'Node.js', 'AWS'],
    sections: [
      {
        heading: 'Background',
        body:
          'Bit Heroes is a mature mobile RPG with a committed player base. Live-ops cadence is relentless.',
      },
      {
        heading: 'Approach',
        body:
          'Weekly event content, telemetry-driven balancing, and steady reduction of legacy debt in the combat systems layer.',
      },
      {
        heading: 'Outcome',
        body:
          'Sustained retention and engagement across successive seasons.',
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
