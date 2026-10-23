import { Episode, sampleEpisodes } from './episodes';

export interface Show {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  posterBg: string;
  accentColor: string;
  posterUri?: string;
  synopsis: string;
  episodes: Episode[];
}

export const SHOWS: Show[] = [
  {
    id: 'chrono-key',
    title: 'The Chrono Key',
    tagline: 'Unlock time. Pay the price.',
    genre: 'Sci-Fi • Mystery',
    posterBg: '#1B3B6F',
    accentColor: '#FFB703',
    synopsis:
      'When archaeologist Maya uncovers an ancient temporal relic in the Sahara, she triggers an accidental timeline fracture.',
    episodes: sampleEpisodes,
  },
  {
    id: 'shadows-neon',
    title: 'Shadows of Neon',
    tagline: 'In a city of chrome, secrets bleed.',
    genre: 'Cyberpunk • Noir',
    posterBg: '#4A0E4E',
    accentColor: '#00F5D4',
    synopsis:
      'Detective Kovacs navigates high-stakes corporate espionage and synthetic memories in New Kyoto.',
    episodes: [
      {
        episodeNumber: 1,
        title: 'Memory Drift',
        durationSec: 2500,
        synopsis: 'A high-level neuro-tech engineer is murdered with wiped synapses.',
        events: [
          {
            id: 'sn1-1',
            timestampSec: 300,
            title: 'Crime Scene at Sector 4',
            summary: 'Kovacs investigates the victim’s severed cybernetic link.',
            charactersInvolved: ['Kovacs', 'Chief Lin'],
          },
          {
            id: 'sn1-2',
            timestampSec: 850,
            title: 'Ghost Fragment Recovered',
            summary: 'An encrypted memory shard reveals the logo of OmniCorp.',
            charactersInvolved: ['Kovacs'],
            isMajorSpoiler: true,
          },
        ],
        suggestedQuestions: [
          {
            atSec: 600,
            question: 'What is a memory drift?',
            answer: 'A neurological failure caused by unauthorized synthetic memory splicing.',
          },
        ],
      },
      {
        episodeNumber: 2,
        title: 'The Black Market Neural',
        durationSec: 2700,
        synopsis: 'Kovacs infiltrates the underground cyber-dealers of the Lower Sump.',
        events: [
          {
            id: 'sn2-1',
            timestampSec: 400,
            title: 'The Sump Underworld',
            summary: 'Kovacs meets contact Vesper at the subterranean ramen stall.',
            charactersInvolved: ['Kovacs', 'Vesper'],
          },
        ],
        suggestedQuestions: [
          {
            atSec: 500,
            question: 'Who is Vesper?',
            answer: 'A former OmniCorp programmer turned clandestine information broker.',
          },
        ],
      },
    ],
  },
  {
    id: 'deep-horizon',
    title: 'Deep Horizon',
    tagline: 'Alone at the edge of the solar system.',
    genre: 'Sci-Fi • Thriller',
    posterBg: '#1C3144',
    accentColor: '#FB5607',
    synopsis:
      'The crew of the Europa mining station encounters an unexplained geothermal pulse from the oceanic core.',
    episodes: [
      {
        episodeNumber: 1,
        title: 'Sub-Surface Anomaly',
        durationSec: 2800,
        synopsis: 'A drill sensor records anomalous sonar pulses below 20 kilometers of ice.',
        events: [
          {
            id: 'dh1-1',
            timestampSec: 240,
            title: 'Drill Failure Alert',
            summary: 'Main drill bit strikes an indestructible crystalline stratum.',
            charactersInvolved: ['Cmdr. Hayes', 'Engineer Ortiz'],
          },
        ],
        suggestedQuestions: [
          {
            atSec: 400,
            question: 'What is Station Horizon mining?',
            answer: 'Helium-3 and hydrothermal mineral nodules under Europa’s frozen crust.',
          },
        ],
      },
    ],
  },
];
