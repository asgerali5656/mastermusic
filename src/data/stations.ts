import bhojpuriHero from "@/assets/bhojpuriya-hero.jpg";
import sadSongsHero from "@/assets/sad-songs-hero.jpg";
import afroz1 from "@/assets/djafroz/afroz-1.jpg";
import afroz2 from "@/assets/djafroz/afroz-2.jpg";
import afroz3 from "@/assets/djafroz/afroz-3.jpg";
import afroz4 from "@/assets/djafroz/afroz-4.jpg";

export type Song = {
  id: string;
  title: string;
  artist: string;
  tag: string;
};

export type Station = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  heroImage: string;
  badge: string;
  themeColor: string; // CSS color string for active state / eq
  gradientOverlay: string;
  posters?: string[];
  songs: Song[];
};

// 1. Bhojpuriya Ghulam Songs
const bhojpuriBaseSongs: Song[] = [
  { id: "4auB2EP-MZI", title: "लॉलीपॉप लागेलू", artist: "Pawan Singh", tag: "All Time Classic" },
  { id: "zmwfd8x0DrM", title: "मरून कलर सड़िया", artist: "Nirahua · Neelkamal Singh", tag: "Trending Hit" },
  { id: "H5kMiuyRFJU", title: "छलकता हमरो जवनिया", artist: "Khesari Lal Yadav", tag: "Blockbuster" },
  { id: "HpbJ8IVBHrI", title: "माथा फेल हो गईल", artist: "Nirahua · Aamrapali", tag: "Superhit" },
  { id: "05QqYs0jz24", title: "केवड़िया के पाला सटाके", artist: "Pawan Singh · Monalisa", tag: "Power Hit" },
  { id: "2aMVhBNhAgQ", title: "अखिया लड़ल बा जब से", artist: "Pawan Singh", tag: "Power Star Hit" },
  { id: "z5bd5GTrfqA", title: "कटोरे कटोरे", artist: "Nirahua · Aamrapali", tag: "Sipahi Hit" },
  { id: "aaCuaoTbuo0", title: "लोभर कहतिया सॉरी", artist: "Nirahua", tag: "Sony Music Hit" },
  { id: "99g4HWL8eck", title: "छुवे दs बदन", artist: "Khesari Lal Yadav", tag: "Trending" },
  { id: "LdklBchhGZs", title: "हम हईं पिया जी के पातर तिरियवा", artist: "Nirahua · Kalpana", tag: "Classic" },
  { id: "FwF9SXuRc6Y", title: "सरसो में इंटर कईलू", artist: "Nirahua · Aamrapali", tag: "Blockbuster" },
];

// 2. Hindi Sad Songs
const hindiSadBaseSongs: Song[] = [
  { id: "Umqb9KENgmk", title: "तुम ही हो (Tum Hi Ho)", artist: "Arijit Singh · Mithoon", tag: "Aashiqui 2 Heartbreak" },
  { id: "284Ov7ysmfA", title: "चन्ना मेरेया (Channa Mereya)", artist: "Arijit Singh · Pritam", tag: "Ae Dil Hai Mushkil" },
  { id: "BddP6PYo2gs", title: "केसरिया (Kesariya - Sad Version)", artist: "Arijit Singh · Pritam", tag: "Brahmāstra Emotional" },
  { id: "atVof3pjT-I", title: "कौन तुझे (Kaun Tujhe)", artist: "Palak Muchhal · Amaal Mallik", tag: "M.S. Dhoni Heartbreak" },
  { id: "T94PHkuydcw", title: "कुन फाया कुन (Kun Faya Kun)", artist: "A.R. Rahman · Mohit Chauhan · Javed Ali", tag: "Rockstar Soulful" },
  { id: "BBAyRBTfsOU", title: "वास्ते (Vaaste)", artist: "Dhvani Bhanushali · Nikhil D'Souza", tag: "Romantic Melancholy" },
];

// 3. DJ Afroz Power Zone Songs
const djAfrozBaseSongs: Song[] = [
  { id: "4auB2EP-MZI", title: "लॉलीपॉप लागेलू (DJ Power Remix)", artist: "DJ Afroz · Pawan Singh", tag: "Bass Boosted Competition" },
  { id: "284Ov7ysmfA", title: "चन्ना मेरेया (Electro Dance Mix)", artist: "DJ Afroz · Arijit Singh", tag: "Heavy Bass Club Mix" },
  { id: "H5kMiuyRFJU", title: "छलकता हमरो जवनिया (Hard Bass Mix)", artist: "DJ Afroz · Khesari Lal", tag: "DJ Competition Winner" },
  { id: "Umqb9KENgmk", title: "तुम ही हो (Club House Mix)", artist: "DJ Afroz · Arijit Singh", tag: "Extreme Bass Drop" },
  { id: "BddP6PYo2gs", title: "केसरिया (Non-Stop Power Beat)", artist: "DJ Afroz · Arijit Singh", tag: "High Energy Dance" },
  { id: "05QqYs0jz24", title: "केवड़िया के पाला (Remix Power)", artist: "DJ Afroz · Pawan Singh", tag: "Competition Beat" },
  { id: "zmwfd8x0DrM", title: "मरून कलर सड़िया (Electro DJ)", artist: "DJ Afroz · Neelkamal", tag: "Cyberpunk Dance" },
  { id: "atVof3pjT-I", title: "कौन तुझे (High Bass Remix)", artist: "DJ Afroz · Palak Muchhal", tag: "Nightclub Drop" },
  { id: "T94PHkuydcw", title: "कुन फाया कुन (Sufi Trance Mix)", artist: "DJ Afroz · A.R. Rahman", tag: "Trance Power" },
];

const generate1000 = (baseList: Song[]): Song[] => {
  const list: Song[] = [];
  const baseCount = baseList.length;
  for (let i = 0; i < 1000; i++) {
    const base = baseList[i % baseCount]!;
    list.push({
      id: base.id,
      title: base.title,
      artist: base.artist,
      tag: base.tag,
    });
  }
  return list;
};

/**
 * Extensible Master Station Registry
 * To add a new radio channel in the future, simply push a new Station object here!
 */
export const stations: Station[] = [
  {
    id: "bhojpuri",
    name: "भोजपुरिया गुलाम",
    shortName: "🔥 भोजपुरिया",
    tagline: "24 HOURS NON-STOP BHOJPURI HITS",
    heroImage: bhojpuriHero,
    badge: "🔥 BHOJPURI HITS",
    themeColor: "#f97316", // Amber / Orange
    gradientOverlay: "from-black/60 via-black/30 to-black/90",
    songs: generate1000(bhojpuriBaseSongs),
  },
  {
    id: "hindi-sad",
    name: "दर्द-ए-दिल",
    shortName: "💔 दर्द-ए-दिल",
    tagline: "24 HOURS HINDI SAD & EMOTIONAL MELODIES",
    heroImage: sadSongsHero,
    badge: "💔 HINDI SAD RADIO",
    themeColor: "#f43f5e", // Rose / Crimson
    gradientOverlay: "from-slate-950/75 via-slate-900/40 to-black/95",
    songs: generate1000(hindiSadBaseSongs),
  },
  {
    id: "dj-afroz",
    name: "DJ AFROZ POWER ZONE",
    shortName: "⚡ DJ AFROZ",
    tagline: "HIGH VOLTAGE DJ COMPETITIONS & BASS REMIXES",
    heroImage: afroz1,
    badge: "⚡ DJ COMPETITION ZONE",
    themeColor: "#06b6d4", // Electric Cyan
    gradientOverlay: "from-slate-950/80 via-cyan-950/40 to-black/95",
    posters: [afroz1, afroz2, afroz3, afroz4],
    songs: generate1000(djAfrozBaseSongs),
  },
];

/** Utility helper function to easily add new stations dynamically */
export const registerNewStation = (newStation: Station) => {
  stations.push(newStation);
};
