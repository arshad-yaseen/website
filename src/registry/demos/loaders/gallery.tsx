import {
  Attention,
  AuthHandshake,
  Backprop,
  Beacon,
  Bloom,
  CacheWarm,
  ClusterSync,
  Compile,
  Constellation,
  Cron,
  Deploy,
  Diffusion,
  Drift,
  Embedding,
  FlowerBloom,
  GradientDescent,
  Hash,
  HeartPulse,
  Helix,
  IndexBuild,
  Lattice,
  Orbit,
  PlusPulse,
  Quantize,
  RateLimit,
  Ripple,
  Snowflake,
  SoundBars,
  StarBurst,
  Sync,
  TokenStream,
  TwinHelix,
  VectorIndex,
  Webhook,
} from "@/ui/dot-matrix";

const LOADERS = [
  { name: "attention", Loader: Attention },
  { name: "auth-handshake", Loader: AuthHandshake },
  { name: "backprop", Loader: Backprop },
  { name: "beacon", Loader: Beacon },
  { name: "bloom", Loader: Bloom },
  { name: "cache-warm", Loader: CacheWarm },
  { name: "cluster-sync", Loader: ClusterSync },
  { name: "compile", Loader: Compile },
  { name: "constellation", Loader: Constellation },
  { name: "cron", Loader: Cron },
  { name: "deploy", Loader: Deploy },
  { name: "diffusion", Loader: Diffusion },
  { name: "drift", Loader: Drift },
  { name: "embedding", Loader: Embedding },
  { name: "flower-bloom", Loader: FlowerBloom },
  { name: "gradient-descent", Loader: GradientDescent },
  { name: "hash", Loader: Hash },
  { name: "heart-pulse", Loader: HeartPulse },
  { name: "helix", Loader: Helix },
  { name: "index-build", Loader: IndexBuild },
  { name: "lattice", Loader: Lattice },
  { name: "orbit", Loader: Orbit },
  { name: "plus-pulse", Loader: PlusPulse },
  { name: "quantize", Loader: Quantize },
  { name: "rate-limit", Loader: RateLimit },
  { name: "ripple", Loader: Ripple },
  { name: "snowflake", Loader: Snowflake },
  { name: "sound-bars", Loader: SoundBars },
  { name: "star-burst", Loader: StarBurst },
  { name: "sync", Loader: Sync },
  { name: "token-stream", Loader: TokenStream },
  { name: "twin-helix", Loader: TwinHelix },
  { name: "vector-index", Loader: VectorIndex },
  { name: "webhook", Loader: Webhook },
];

export default function LoadersGalleryDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
      {LOADERS.map(({ name, Loader }) => (
        <div key={name} className="flex flex-col items-center gap-4">
          <div className="flex h-8 items-center justify-center">
            <Loader aria-label={name} />
          </div>
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{name}</span>
        </div>
      ))}
    </div>
  );
}
