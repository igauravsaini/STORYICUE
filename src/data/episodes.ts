export interface ViewerPosition {
  episodeNumber: number;
  positionSec: number;
}

export interface Viewer {
  id: string;
  name: string;
  avatarColor: string;
  episodeNumber: number;
  positionSec: number;
}

export interface StoryEvent {
  id: string;
  timestampSec: number;
  title: string;
  summary: string;
  charactersInvolved: string[];
  isMajorSpoiler?: boolean;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  durationSec: number;
  synopsis: string;
  events: StoryEvent[];
  suggestedQuestions: {
    atSec: number;
    question: string;
    answer: string;
  }[];
}

export const sampleEpisodes: Episode[] = [
  {
    episodeNumber: 1,
    title: 'The Vault Awakens',
    durationSec: 2400,
    synopsis: 'Archaeologist Maya uncovers an encrypted subterranean vault beneath the Sahara.',
    events: [
      {
        id: 'e1-1',
        timestampSec: 180,
        title: 'Expedition Arrival',
        summary: 'Maya and her team land in the desert with advanced LIDAR scanners.',
        charactersInvolved: ['Maya', 'Dr. Thorne'],
      },
      {
        id: 'e1-2',
        timestampSec: 540,
        title: 'Chamber Breached',
        summary: 'A secret obsidian door is blown open, revealing ancient bronze relics.',
        charactersInvolved: ['Maya', 'Jax'],
      },
      {
        id: 'e1-3',
        timestampSec: 850,
        title: 'The Chrono Key Discovered',
        summary: 'Maya finds a rotating cylinder emitting cyan luminescence: the Chrono Key.',
        charactersInvolved: ['Maya'],
        isMajorSpoiler: true,
      },
      {
        id: 'e1-4',
        timestampSec: 1600,
        title: 'Shadow Mercenaries Attack',
        summary: 'A private militia attempts to seize the artifact; Jax covers the escape.',
        charactersInvolved: ['Maya', 'Jax', 'Mercenary Leader'],
      },
      {
        id: 'e1-5',
        timestampSec: 2200,
        title: 'First Jump',
        summary: 'Maya accidentally rotates the key cylinder and vanishes 48 hours into the past.',
        charactersInvolved: ['Maya'],
        isMajorSpoiler: true,
      },
    ],
    suggestedQuestions: [
      {
        atSec: 500,
        question: 'Who funded Maya’s desert dig?',
        answer: 'Thorne Industries secretly funded the expedition under the guise of geological survey.',
      },
      {
        atSec: 900,
        question: 'What is the glowing cylinder?',
        answer: 'It is the Chrono Key, an ancient relic capable of manipulating localized time.',
      },
      {
        atSec: 1800,
        question: 'Why did the mercenaries know the vault location?',
        answer: 'Someone in Maya’s inner circle leaked coordinates before takeoff.',
      },
    ],
  },
  {
    episodeNumber: 2,
    title: 'Fractured Echoes',
    durationSec: 2600,
    synopsis: 'Trapped in a previous timeline, Maya must avoid encountering her past self.',
    events: [
      {
        id: 'e2-1',
        timestampSec: 240,
        title: 'Arrival in Cairo',
        summary: 'Maya arrives in Cairo two days earlier, tracking down Dr. Thorne.',
        charactersInvolved: ['Maya', 'Dr. Thorne'],
      },
      {
        id: 'e2-2',
        timestampSec: 720,
        title: 'The Paradox Warning',
        summary: 'Dr. Thorne warns that touching the past version of the key will cause timeline collapse.',
        charactersInvolved: ['Maya', 'Dr. Thorne'],
      },
      {
        id: 'e2-3',
        timestampSec: 1200,
        title: 'The Doppelganger Glitch',
        summary: 'Maya spots her past self entering the university library.',
        charactersInvolved: ['Maya', 'Past Maya'],
      },
      {
        id: 'e2-4',
        timestampSec: 1950,
        title: 'Thorne’s Betrayal',
        summary: 'Thorne calls the syndicate to report Maya’s presence.',
        charactersInvolved: ['Dr. Thorne'],
        isMajorSpoiler: true,
      },
      {
        id: 'e2-5',
        timestampSec: 2450,
        title: 'The Alchemist Appears',
        summary: 'A masked guardian known as the Alchemist rescues Maya from Thorne’s ambush.',
        charactersInvolved: ['Maya', 'The Alchemist'],
        isMajorSpoiler: true,
      },
    ],
    suggestedQuestions: [
      {
        atSec: 600,
        question: 'Why can’t Maya just talk to her past self?',
        answer: 'Direct interaction creates a feedback paradox that collapses memory and matter.',
      },
      {
        atSec: 1500,
        question: 'Is Dr. Thorne trustworthy?',
        answer: 'Thorne knows far more about the Key than he admitted to Maya during the dig.',
      },
    ],
  },
  {
    episodeNumber: 3,
    title: 'Zero Hour',
    durationSec: 2700,
    synopsis: 'The race to the Eclipse Obelisk before the syndicate triggers a permanent rewrite.',
    events: [
      {
        id: 'e3-1',
        timestampSec: 200,
        title: 'Safehouse Alliance',
        summary: 'The Alchemist reveals the origins of the 12 Chrono Keys.',
        charactersInvolved: ['Maya', 'The Alchemist'],
      },
      {
        id: 'e3-2',
        timestampSec: 650,
        title: 'Infiltrating the Obelisk',
        summary: 'Maya enters the temple under cover of the desert solar eclipse.',
        charactersInvolved: ['Maya'],
      },
      {
        id: 'e3-3',
        timestampSec: 1400,
        title: 'Jax Revealed Alive',
        summary: 'Jax survived the episode 1 assault and is holding the outer perimeter.',
        charactersInvolved: ['Jax', 'Maya'],
        isMajorSpoiler: true,
      },
      {
        id: 'e3-4',
        timestampSec: 2100,
        title: 'The Core Alignment',
        summary: 'Maya inserts the Key into the Obelisk dais, freezing time across the valley.',
        charactersInvolved: ['Maya'],
        isMajorSpoiler: true,
      },
    ],
    suggestedQuestions: [
      {
        atSec: 400,
        question: 'Who is the Alchemist?',
        answer: 'A member of an ancient brotherhood pledged to safeguard temporal artifacts.',
      },
      {
        atSec: 1200,
        question: 'What happens during the eclipse?',
        answer: 'The solar alignment amplifies the Key’s field by tenfold.',
      },
    ],
  },
];

export const sampleViewers: Viewer[] = [
  {
    id: 'dad',
    name: 'Dad',
    avatarColor: '#3A86FF',
    episodeNumber: 3,
    positionSec: 300,
  },
  {
    id: 'mom',
    name: 'Mom',
    avatarColor: '#FB5607',
    episodeNumber: 2,
    positionSec: 900,
  },
  {
    id: 'kid',
    name: 'Kid',
    avatarColor: '#06D6A0',
    episodeNumber: 1,
    positionSec: 600,
  },
];

export function getGroupPosition(viewers: Viewer[]): ViewerPosition {
  if (!viewers || viewers.length === 0) {
    return { episodeNumber: 1, positionSec: 0 };
  }

  let earliest = viewers[0];
  for (let i = 1; i < viewers.length; i++) {
    const v = viewers[i];
    if (
      v.episodeNumber < earliest.episodeNumber ||
      (v.episodeNumber === earliest.episodeNumber && v.positionSec < earliest.positionSec)
    ) {
      earliest = v;
    }
  }

  return {
    episodeNumber: earliest.episodeNumber,
    positionSec: earliest.positionSec,
  };
}

export function buildSpoilerSafeContext(
  episodes: Episode[],
  target: ViewerPosition
): {
  recapTitle: string;
  cutoffText: string;
  allowedEvents: StoryEvent[];
  suggestedQuestions: { question: string; answer: string }[];
} {
  const allowedEvents: StoryEvent[] = [];
  const suggestedQuestions: { question: string; answer: string }[] = [];

  for (const ep of episodes) {
    if (ep.episodeNumber < target.episodeNumber) {
      // Full previous episode is safe
      allowedEvents.push(...ep.events);
      for (const q of ep.suggestedQuestions) {
        suggestedQuestions.push({ question: q.question, answer: q.answer });
      }
    } else if (ep.episodeNumber === target.episodeNumber) {
      // Current episode: only up to target.positionSec
      for (const ev of ep.events) {
        if (ev.timestampSec <= target.positionSec) {
          allowedEvents.push(ev);
        }
      }
      for (const q of ep.suggestedQuestions) {
        if (q.atSec <= target.positionSec) {
          suggestedQuestions.push({ question: q.question, answer: q.answer });
        }
      }
    }
  }

  const mins = Math.floor(target.positionSec / 60);
  const secs = target.positionSec % 60;
  const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

  return {
    recapTitle: `Safe Recap up to Ep ${target.episodeNumber} @ ${timeFormatted}`,
    cutoffText: `Episode ${target.episodeNumber}, minute ${mins}:${secs.toString().padStart(2, '0')}`,
    allowedEvents,
    suggestedQuestions,
  };
}
