import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ShowScreen } from '../src/screens/ShowScreen';
import { ViewerProvider } from '../src/context/ViewerContext';
import { NavigationProvider } from '../src/navigation/NavigationContext';

const renderShowScreen = () => {
  return render(
    <NavigationProvider>
      <ViewerProvider>
        <ShowScreen />
      </ViewerProvider>
    </NavigationProvider>
  );
};

describe('ShowScreen', () => {
  it('renders Left section: show title and description', () => {
    const { getByText } = renderShowScreen();

    // Show title
    expect(getByText('The Chrono Key')).toBeTruthy();
    // Show tagline
    expect(getByText('Unlock time. Pay the price.')).toBeTruthy();
    // Short synopsis
    expect(
      getByText(/When archaeologist Maya uncovers an ancient temporal relic/i)
    ).toBeTruthy();
  });

  it('renders Middle section: episode list with title and duration', () => {
    const { getByText } = renderShowScreen();

    // Episode 1
    expect(getByText('The Vault Awakens')).toBeTruthy();
    expect(getByText('40 min')).toBeTruthy();

    // Episode 2
    expect(getByText('Fractured Echoes')).toBeTruthy();
    expect(getByText('43 min')).toBeTruthy();

    // Episode 3
    expect(getByText('Zero Hour')).toBeTruthy();
    expect(getByText('45 min')).toBeTruthy();
  });

  it('renders Right section: Whos watching panel with avatar, name and E{n} · {mm:ss}', () => {
    const { getByText } = renderShowScreen();

    // Viewers
    expect(getByText('Dad')).toBeTruthy();
    expect(getByText('Mom')).toBeTruthy();
    expect(getByText('Kid')).toBeTruthy();

    // Formatted positions E{n} · {mm:ss}
    // Dad: Ep 3, 300s -> E3 · 05:00
    expect(getByText('E3 · 05:00')).toBeTruthy();
    // Mom: Ep 2, 900s -> E2 · 15:00
    expect(getByText('E2 · 15:00')).toBeTruthy();
    // Kid: Ep 1, 600s -> E1 · 10:00
    expect(getByText('E1 · 10:00')).toBeTruthy();
  });

  it('renders Two big buttons at the bottom: Recap for the couch and Watch', () => {
    const { getByText } = renderShowScreen();

    expect(getByText('🛋️ Recap for the couch')).toBeTruthy();
    expect(getByText('▶ Watch Episode 1')).toBeTruthy();
  });

  it('allows selecting a viewer and adjusting episode and minutes via D-pad controls', () => {
    const { getByText, queryByText } = renderShowScreen();

    // Initially not in editing mode
    expect(queryByText('● EDITING')).toBeNull();

    // Press select on Dad
    const dadCard = getByText('Dad');
    act(() => {
      fireEvent.press(dadCard);
    });

    // Now in editing mode for Dad
    expect(getByText('● EDITING')).toBeTruthy();
    expect(getByText('D-PAD REMOTE CONTROLS:')).toBeTruthy();

    // Change episode using Left arrow (Ep 3 -> Ep 2)
    const prevEpBtn = getByText('◀');
    act(() => {
      fireEvent.press(prevEpBtn);
    });
    expect(getByText('Ep 2 / 3')).toBeTruthy();

    // Change minutes using +1m button (5:00 -> 6:00)
    const plus1mBtn = getByText('▲ +1m');
    act(() => {
      fireEvent.press(plus1mBtn);
    });
    expect(getByText('06:00')).toBeTruthy();

    // Press Done
    const doneBtn = getByText('✓ Done (Press SELECT)');
    act(() => {
      fireEvent.press(doneBtn);
    });

    // Verify Dad's progress pill is updated in shared state to E2 · 06:00
    expect(getByText('E2 · 06:00')).toBeTruthy();
  });
});
