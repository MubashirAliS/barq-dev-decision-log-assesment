export type DecisionStatus = 'active' | 'superseded' | 'proposed' | 'deprecated';
export type DecisionCategory = 'Architecture' | 'Product' | 'Engineering' | 'Security' | 'Strategy';

export interface DecisionRecord {
  id: string;
  code: string; // e.g. DEC-001
  title: string;
  status: DecisionStatus;
  category: DecisionCategory;
  date: string;
  decider: {
    name: string;
    role: string;
    avatar?: string;
  };
  context: string;
  decision: string;
  consequences: string[];
  alternativesConsidered: {
    option: string;
    whyRejected: string;
  }[];
  impact: 'High' | 'Medium' | 'Low';
  supersededBy?: string; // code of newer decision
  supersedes?: string; // code of previous decision
  tags: string[];
}

export const INITIAL_DECISIONS: DecisionRecord[] = [
  {
    id: 'dec-1',
    code: 'DEC-042',
    title: 'Standardize on PostgreSQL with Row-Level Security for multi-tenant data isolation',
    status: 'active',
    category: 'Architecture',
    date: '2026-08-14',
    decider: {
      name: 'Elena Rostova',
      role: 'VP of Engineering'
    },
    context: 'As we expanded to enterprise customers with strict SOC2 and HIPAA compliance, database per tenant caused ballooning RDS costs and migration latency. We needed proven, granular isolation without multiplying infrastructure overhead.',
    decision: 'Adopt single PostgreSQL cluster using Row-Level Security (RLS) policies scoped to tenant_id on every query execution via tenant context middleware.',
    consequences: [
      'Zero cross-tenant data leaks guaranteed by engine-level enforcement.',
      'Reduced database infrastructure costs by 68% compared to multi-instance setup.',
      'Requires thorough query planner analysis on complex multi-join reporting queries.'
    ],
    alternativesConsidered: [
      {
        option: 'Database-per-tenant (DynamoDB / AWS Aurora)',
        whyRejected: 'Severe connection pooling overhead, 4x monthly cost, and migration tooling complexity.'
      },
      {
        option: 'Application-level WHERE tenant_id filtering',
        whyRejected: 'High risk of developer error / omission in raw ORM queries leading to compliance failure.'
      }
    ],
    impact: 'High',
    tags: ['Database', 'Compliance', 'Security', 'PostgreSQL']
  },
  {
    id: 'dec-2',
    code: 'DEC-041',
    title: 'Drop native mobile apps in favor of high-performance Progressive Web App (PWA)',
    status: 'active',
    category: 'Product',
    date: '2026-07-28',
    decider: {
      name: 'Marcus Chen',
      role: 'Head of Product'
    },
    context: 'Maintaining Swift + Kotlin native codebases consumed 55% of engineering capacity with <12% mobile-exclusive feature usage. App store review cycles delayed critical security fixes by up to 48 hours.',
    decision: 'Sunsetting native iOS & Android repositories. Consolidating all feature velocity into a unified responsive web application with offline service worker support and biometric WebAuthn.',
    consequences: [
      'Saved 2 full-time mobile developer requisitions, reallocated to core API throughput.',
      'Instant continuous deployment to all platforms without 30% App Store take or review blockers.',
      'Background push notifications require Safari 16.4+ on iOS.'
    ],
    alternativesConsidered: [
      {
        option: 'React Native cross-platform rewrite',
        whyRejected: 'Still requires dual store maintenance, native bridge debugging, and separate release cadence.'
      }
    ],
    impact: 'High',
    tags: ['Mobile', 'Velocity', 'PWA', 'Product Strategy']
  },
  {
    id: 'dec-3',
    code: 'DEC-038',
    title: 'Migrate inter-service communication from REST/JSON to gRPC & Protocol Buffers',
    status: 'active',
    category: 'Engineering',
    date: '2026-06-11',
    decider: {
      name: 'David Vance',
      role: 'Staff Infrastructure Architect'
    },
    context: 'Payload serialization overhead and schema drift across 14 microservices accounted for 30% of p99 latency spikes during peak auction events.',
    decision: 'Enforce strict protobuf contracts stored in a centralized proto repository with automated code generation on commit for Go, TypeScript, and Python services.',
    consequences: [
      'p99 RPC latency dropped from 84ms to 11ms.',
      'Compile-time validation eliminates backward-incompatible API breakage.',
      'Requires gRPC web proxy (Envoy) for external web clients.'
    ],
    alternativesConsidered: [
      {
        option: 'OpenAPI / JSON Schema validation on REST',
        whyRejected: 'Validation overhead was even higher at runtime; lacked multiplexed streaming.'
      }
    ],
    impact: 'Medium',
    tags: ['gRPC', 'Microservices', 'Performance', 'Protobuf']
  },
  {
    id: 'dec-4',
    code: 'DEC-029',
    title: 'Use Next.js SSR for marketing & docs, client-side SPA for high-density dashboard',
    status: 'superseded',
    supersededBy: 'DEC-045',
    category: 'Architecture',
    date: '2026-04-02',
    decider: {
      name: 'Elena Rostova',
      role: 'VP of Engineering'
    },
    context: 'Initial attempt to run the high-density financial workspace inside Next.js server components caused hydration mismatches with heavy charting libraries.',
    decision: 'Split into two subdomains: `www.` on Next.js edge runtime and `app.` on ultra-fast Vite SPA.',
    consequences: [
      'Clean separation of marketing SEO concerns from reactive state-heavy app.',
      'Shared session cookie across subdomains required custom edge auth proxy.'
    ],
    alternativesConsidered: [
      {
        option: 'Monolithic Next.js app',
        whyRejected: 'Hydration overhead slowed real-time WebSocket tick charts.'
      }
    ],
    impact: 'Medium',
    tags: ['Frontend', 'Vite', 'Next.js', 'Separation of Concerns']
  },
  {
    id: 'dec-5',
    code: 'DEC-019',
    title: 'Enforce 90-day retention window on raw telemetry and stream aggregates to S3 Parquet',
    status: 'active',
    category: 'Strategy',
    date: '2026-02-19',
    decider: {
      name: 'Sarah Lindqvist',
      role: 'Chief Technology Officer'
    },
    context: 'Elasticsearch cluster costs were growing quadratically relative to revenue due to infinite log retention from debug environments.',
    decision: 'Automate hot tier retention to 14 days, warm tier to 90 days, and transform older events into DuckDB-compatible Parquet files in S3 Glacier.',
    consequences: [
      'Elasticsearch cluster size reduced from 32 nodes to 8 nodes.',
      'Historical audits queryable via Athena or DuckDB within minutes.',
      'Historical ad-hoc searches take ~15s longer than live ES indexes.'
    ],
    alternativesConsidered: [
      {
        option: 'Full Datadog Log Management SaaS',
        whyRejected: 'Projected $22,000/month bill exceeded our budget tier.'
      }
    ],
    impact: 'High',
    tags: ['FinOps', 'Data', 'S3', 'Cost Optimization']
  }
];
