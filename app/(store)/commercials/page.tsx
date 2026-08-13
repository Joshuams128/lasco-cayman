import { client } from "@/sanity/client";

interface CommercialVideo {
  title?: string;
  youtubeId?: string;
}

interface SiteSettings {
  commercialVideos?: CommercialVideo[];
}

async function getSiteSettings() {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] { commercialVideos }`
  );
}

// Real LASCO Cayman commercials found on the current live site — used
// whenever no videos have been added yet in Sanity.
const DEFAULT_VIDEOS: Required<CommercialVideo>[] = [
  { title: "LASCO Cayman Commercial 1", youtubeId: "n1d-7ZjgPFA" },
  { title: "LASCO Cayman Commercial 2", youtubeId: "WY1OkhAC_Yg" },
  { title: "LASCO Cayman Commercial 3", youtubeId: "3MN6SxH5DyY" },
  { title: "LASCO Cayman Commercial 4", youtubeId: "Clbj-26y4XM" },
];

export default async function CommercialsPage() {
  const settings = await getSiteSettings();
  const videos =
    settings?.commercialVideos && settings.commercialVideos.length > 0
      ? settings.commercialVideos.filter((v) => v.youtubeId)
      : DEFAULT_VIDEOS;

  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-charcoal py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-charcoal to-sea/20" />
        <div className="absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sun/10 blur-3xl animate-blob-float" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-sun">LASCO Cayman</p>
          <h1 className="mx-auto mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Commercials
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            See LASCO Cayman on screen &mdash; our TV and social commercials in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 sm:grid-cols-2">
          {videos.map((video, i) => (
            <div
              key={video.youtubeId || i}
              className="overflow-hidden rounded-3xl border border-warm-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full bg-charcoal">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title || `LASCO Cayman commercial ${i + 1}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {video.title && (
                <div className="p-4">
                  <p className="text-sm font-bold text-charcoal">{video.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More on Facebook */}
        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-sea via-sea-dark to-palm-dark px-8 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-xl font-extrabold">Want to see more?</h2>
            <p className="mt-1 text-sm text-white/80">
              More commercials and behind-the-scenes clips are posted regularly on our Facebook page.
            </p>
          </div>
          <a
            href="https://www.facebook.com/LascoCaymanDistributors/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-sea-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            Follow on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
