import {
  sampleEpisodes,
  sampleViewers,
  getGroupPosition,
  buildSpoilerSafeContext,
} from '../src/data/episodes';

console.log('=== STORYCUE SPOILER-SAFE VERIFICATION TEST ===\n');

// 1. Check each viewer
for (const viewer of sampleViewers) {
  const context = buildSpoilerSafeContext(sampleEpisodes, {
    episodeNumber: viewer.episodeNumber,
    positionSec: viewer.positionSec,
  });

  console.log(`-----------------------------------------------`);
  console.log(`VIEWER: ${viewer.name} (Ep ${viewer.episodeNumber} @ ${viewer.positionSec}s)`);
  console.log(`Recap Title: ${context.recapTitle}`);
  console.log(`Allowed Events (${context.allowedEvents.length}):`);
  context.allowedEvents.forEach((ev) => {
    console.log(`  - [${ev.id}] ${ev.title} (at ${ev.timestampSec}s): ${ev.summary}`);
  });

  // Verification check: ensure no event exceeds viewer position
  for (const ev of context.allowedEvents) {
    if (ev.id.startsWith(`e${viewer.episodeNumber}-`) && ev.timestampSec > viewer.positionSec) {
      throw new Error(`SPOILER LEAK: Event ${ev.title} (${ev.timestampSec}s) is past ${viewer.positionSec}s!`);
    }
  }
}

// 2. Check group position
const groupPos = getGroupPosition(sampleViewers);
console.log(`\n===============================================`);
console.log(`GROUP EARLIEST POSITION: Ep ${groupPos.episodeNumber} @ ${groupPos.positionSec}s`);
const groupContext = buildSpoilerSafeContext(sampleEpisodes, groupPos);
console.log(`Group Allowed Events (${groupContext.allowedEvents.length}):`);
groupContext.allowedEvents.forEach((ev) => {
  console.log(`  - [${ev.id}] ${ev.title} (at ${ev.timestampSec}s): ${ev.summary}`);
});

// Verification check for group: must match earliest viewer (Kid: Ep 1 @ 600s)
if (groupPos.episodeNumber !== 1 || groupPos.positionSec !== 600) {
  throw new Error(`Expected group position to be Ep 1 @ 600s, got Ep ${groupPos.episodeNumber} @ ${groupPos.positionSec}s`);
}

// Events in Ep 1 after 600s (e.g. Chrono Key at 850s, Attack at 1600s, First Jump at 2200s) MUST NOT BE PRESENT
const spoiledEvent = groupContext.allowedEvents.find((e) => e.timestampSec > 600 && e.id.startsWith('e1-'));
if (spoiledEvent) {
  throw new Error(`SPOILER LEAK IN GROUP: ${spoiledEvent.title} is beyond 600s!`);
}

console.log('\n✅ ALL SPOILER TESTS PASSED! No future events leaked for any viewer or group.');
