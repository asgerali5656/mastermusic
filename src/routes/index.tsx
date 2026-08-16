import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { stations, Station } from "@/data/stations";
import { JukeboxPlayer } from "@/components/JukeboxPlayer";
import { ChevronLeft, ChevronRight, Sparkles, X, Image as ImageIcon, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Master Music · Multi-Channel Radio Hub" },
      {
        name: "description",
        content:
          "24/7 Master Music Multi-Channel Radio Hub — Bhojpuriya Ghulam Hits, Hindi Sad Songs, and DJ Afroz Power Zone Competition Mixes.",
      },
      { property: "og:title", content: "Master Music · Multi-Channel Radio Hub" },
      {
        property: "og:description",
        content: "Master Music Multi-Channel Radio Station Hub.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [showPosterGallery, setShowPosterGallery] = useState(false);
  const [activePoster, setActivePoster] = useState<string | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeStation: Station = stations[activeStationIndex] || stations[0]!;

  const goToNextStation = () => {
    setActiveStationIndex((prev) => (prev + 1) % stations.length);
  };

  const goToPrevStation = () => {
    setActiveStationIndex((prev) => (prev - 1 + stations.length) % stations.length);
  };

  // Keyboard navigation (Left / Right Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextStation();
      } else if (e.key === "ArrowLeft") {
        goToPrevStation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // min 50px swipe distance

    if (diff > swipeThreshold) {
      // Swiped Left -> Next Station
      goToNextStation();
    } else if (diff < -swipeThreshold) {
      // Swiped Right -> Prev Station
      goToPrevStation();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <main
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden bg-black select-none"
    >
      {/* Full-screen Background Image with Smooth Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={activeStation.id}
          src={activeStation.heroImage}
          alt={`${activeStation.name} background`}
          className="h-full w-full object-cover object-center transition-all duration-700 ease-in-out scale-105 filter contrast-110"
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${activeStation.gradientOverlay}`}
        />
        <div className="pointer-events-none absolute inset-0 grain-overlay opacity-35" />
      </div>

      {/* Header Bar & Equalizer */}
      <header className="relative z-10 flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
        {/* Equalizer Indicator */}
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/90 drop-shadow-md">
          <span className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] origin-bottom rounded-full"
                style={{
                  backgroundColor: activeStation.themeColor,
                  height: "100%",
                  animation: `eq-bounce 850ms ${i * 130}ms ease-in-out infinite`,
                }}
              />
            ))}
          </span>
          <span className="font-bold text-[11px] sm:text-xs tracking-widest" style={{ color: activeStation.themeColor }}>
            MASTER MUSIC HUB
          </span>
        </span>

        {/* Station Switcher Navigation Pills (Extensible for future stations) */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-full border border-white/20 bg-black/60 p-1 backdrop-blur-xl shadow-2xl max-w-full">
          {stations.map((st, idx) => {
            const isActive = idx === activeStationIndex;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStationIndex(idx)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1 text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black shadow-lg scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {st.shortName || st.name}
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Independent Site Domain Link & Afroz Poster Gallery */}
        <div className="flex items-center gap-2">
          {activeStation.domainUrl && (
            <a
              href={activeStation.domainUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${activeStation.name} Standalone Site`}
              className="flex items-center gap-1.5 rounded-full border border-white/30 bg-black/60 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 shadow-md"
            >
              <span>DOMAIN</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {activeStation.id === "dj-afroz" && (
            <button
              onClick={() => setShowPosterGallery(true)}
              className="flex items-center gap-1.5 rounded-full border border-cyan-500/50 bg-cyan-950/70 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">AFROZ POSTERS</span>
            </button>
          )}
        </div>
      </header>

      {/* Center Hero Title Section with Left/Right Swipe Arrow Buttons */}
      <section className="relative z-10 my-auto flex w-full max-w-6xl items-center justify-between px-2 sm:px-6">
        {/* Left Arrow Button */}
        <button
          onClick={goToPrevStation}
          title="Previous Station (पिछला स्टेशन)"
          className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 active:scale-95 shadow-xl"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Main Title Banner */}
        <div className="flex flex-col items-center text-center px-2">
          {/* Station Badge */}
          <div
            className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg"
            style={{ color: activeStation.themeColor }}
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>{activeStation.badge}</span>
          </div>

          {/* Hero Main Name */}
          <h1 className="text-display text-4xl font-black text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] sm:text-6xl md:text-7xl lg:text-[8.5rem] leading-none tracking-tight transition-all duration-500">
            {activeStation.name === "भोजपुरिया गुलाम" && (
              <>
                भोजपुरिया
                <br />
                गुलाम
              </>
            )}
            {activeStation.name === "दर्द-ए-दिल" && "दर्द-ए-दिल"}
            {activeStation.name === "DJ AFROZ POWER ZONE" && (
              <>
                DJ AFROZ
                <br />
                <span className="text-cyan-400">POWER ZONE</span>
              </>
            )}
            {activeStation.name !== "भोजपुरिया गुलाम" &&
              activeStation.name !== "दर्द-ए-दिल" &&
              activeStation.name !== "DJ AFROZ POWER ZONE" &&
              activeStation.name}
          </h1>

          {/* Swipe Indicator Tip */}
          <p className="mt-3 text-[11px] sm:text-xs font-semibold tracking-widest text-white/70 uppercase">
            👉 Swipe Left/Right to Change Radio Stations 👈
          </p>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={goToNextStation}
          title="Next Station (अगला स्टेशन)"
          className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 active:scale-95 shadow-xl"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </section>

      {/* Bottom Controls & Centered Credit */}
      <div className="relative z-10 mb-[3vh] sm:mb-[5vh] flex w-full flex-col items-center justify-center px-3">
        <JukeboxPlayer key={activeStation.id} stationSongs={activeStation.songs} stationId={activeStation.id} />
      </div>

      {/* DJ Afroz Poster Gallery Modal */}
      {showPosterGallery && activeStation.posters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-4xl rounded-2xl border border-cyan-500/40 bg-slate-900/95 p-5 shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                DJ AFROZ OFFICIAL POSTERS
              </h2>
              <button
                onClick={() => setShowPosterGallery(false)}
                className="rounded-full bg-cyan-950 p-1.5 text-cyan-300 hover:bg-cyan-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {activeStation.posters.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePoster(img)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30 transition-all hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                  <img
                    src={img}
                    alt={`DJ Afroz poster ${idx + 1}`}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-2">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase">View Full Poster</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Single Poster View */}
      {activePoster && (
        <div
          onClick={() => setActivePoster(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 backdrop-blur-xl cursor-pointer"
        >
          <div className="relative max-h-[95vh] max-w-[95vw]">
            <img
              src={activePoster}
              alt="DJ Afroz Full Poster"
              className="max-h-[90vh] rounded-lg border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.8)] object-contain"
            />
            <button
              onClick={() => setActivePoster(null)}
              className="absolute -top-4 -right-4 rounded-full bg-cyan-500 p-2 text-black font-bold shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
