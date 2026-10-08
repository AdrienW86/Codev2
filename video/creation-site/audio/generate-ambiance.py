"""Ambiance musicale et micro-effets du film /creation-site, synthétisés ici.

Aucun échantillon externe : tout est généré par ce script (droits CODE-V).
Sortie : music.wav, sfx.wav (48 kHz, stéréo, 16 bits) dans le dossier donné.

Musique : électronique légère à 100 BPM, nappes et arpège doux, sans basse
agressive, laissée en retrait pour la future voix off.
"""
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48_000
DURATION = 20.0
BPM = 100
BEAT = 60 / BPM
N = int(SR * DURATION)
rng = np.random.default_rng(7)  # rendu déterministe


def t_axis(seconds):
    return np.arange(int(SR * seconds)) / SR


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def one_pole_lowpass(x, cutoff):
    """Passe-bas simple ; `cutoff` peut varier dans le temps (tableau)."""
    cutoff = np.broadcast_to(np.asarray(cutoff, dtype=float), x.shape)
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        y[i] = acc
    return y


def place(track, sound, at, gain=1.0, pan=0.0):
    start = int(at * SR)
    end = min(len(track), start + len(sound))
    if start >= len(track):
        return
    left, right = np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)
    track[start:end, 0] += sound[: end - start] * gain * left * 1.414
    track[start:end, 1] += sound[: end - start] * gain * right * 1.414


def envelope(n, attack, release):
    env = np.ones(n)
    a, r = int(attack * SR), int(release * SR)
    env[:a] = np.linspace(0, 1, a) if a else 1
    if r:
        env[-r:] *= np.linspace(1, 0, r)
    return env


# --- Musique ----------------------------------------------------------------
# Fa majeur 9 → La mineur 7 → Ré mineur 9 → Si♭ majeur 7, puis résolution en Fa.
CHORDS = [
    (0.0, [53, 57, 60, 64, 67]),
    (4.8, [57, 60, 64, 67, 72]),
    (9.6, [50, 57, 60, 65, 69]),
    (14.4, [46, 53, 57, 62, 65]),
    (18.0, [53, 60, 64, 67, 72]),
]


def pad_voice(freq, seconds):
    t = t_axis(seconds)
    tone = np.zeros_like(t)
    for detune in (-0.12, 0.0, 0.11):  # léger chorus, en cents ×100
        f = freq * 2 ** (detune / 12)
        phase = rng.uniform(0, 2 * np.pi)
        tone += np.sin(2 * np.pi * f * t + phase) + 0.18 * np.sin(4 * np.pi * f * t + phase)
    return tone / 3


def build_music():
    music = np.zeros((N, 2))
    for idx, (start, notes) in enumerate(CHORDS):
        end = CHORDS[idx + 1][0] if idx + 1 < len(CHORDS) else DURATION
        seconds = end - start + 0.9  # recouvrement : enchaînement sans trou
        for k, note in enumerate(notes):
            voice = pad_voice(hz(note), seconds) * envelope(int(seconds * SR), 0.9, 1.1)
            place(music, voice, start, gain=0.05 if note > 50 else 0.035, pan=(-0.5 + k / (len(notes) - 1)) * 0.7)

    # Le problème (0–3 s) reste voilé, puis le filtre s'ouvre avec la structure.
    t = np.arange(N) / SR
    cutoff = np.interp(t, [0, 2.6, 7, 15, 18, 20], [500, 650, 1800, 2400, 2800, 2000])
    for ch in range(2):
        music[:, ch] = one_pole_lowpass(music[:, ch], cutoff)

    # Arpège en croches dès 3 s, plus présent à partir de 7 s.
    eighth = BEAT / 2
    step = 0
    time = 2.4
    while time < 19.2:
        notes = [n for s, n in CHORDS if s <= time][-1]
        pattern = [0, 2, 4, 3, 1, 3, 4, 2]
        note = notes[pattern[step % 8]] + 12
        length = 0.42
        tt = t_axis(length)
        pluck = (np.sin(2 * np.pi * hz(note) * tt) + 0.25 * np.sin(4 * np.pi * hz(note) * tt)) * np.exp(-tt * 9)
        pluck *= envelope(len(tt), 0.004, 0.05)
        level = np.interp(time, [2.4, 3.4, 7, 15, 18, 19.2], [0, 0.05, 0.065, 0.075, 0.05, 0])
        place(music, pluck, time, gain=level, pan=0.35 if step % 2 else -0.35)
        # écho discret (croche pointée)
        place(music, pluck, time + eighth * 1.5, gain=level * 0.35, pan=-0.35 if step % 2 else 0.35)
        time += eighth
        step += 1

    # Pulsation douce (pas de grosse caisse) : un souffle filtré sur les temps 2 et 4 dès 7 s.
    beat_time = 7.0
    count = 0
    while beat_time < 17.6:
        if count % 2 == 1:
            n = int(0.12 * SR)
            noise = rng.normal(0, 1, n)
            noise = one_pole_lowpass(one_pole_lowpass(noise, 7000), 7000) - one_pole_lowpass(noise, 3500)
            noise *= envelope(n, 0.008, 0.0) * np.exp(-np.linspace(0, 7, n))
            place(music, noise, beat_time, gain=0.03, pan=0.15)
        beat_time += BEAT
        count += 1

    # Fondu de sortie sur le logo.
    fade = np.interp(t, [0, 0.35, 18.9, 20], [0, 1, 1, 0])
    return music * fade[:, None]


# --- Micro-effets -------------------------------------------------------------
def whoosh(seconds, low, high, gain=1.0):
    n = int(seconds * SR)
    noise = rng.normal(0, 1, n)
    sweep = np.geomspace(low, high, n)
    body = one_pole_lowpass(noise, sweep) - one_pole_lowpass(noise, sweep * 0.25)
    return body * np.sin(np.linspace(0, np.pi, n)) ** 1.6 * gain


def tick(freq=2400, seconds=0.05):
    tt = t_axis(seconds)
    return np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 90) * envelope(len(tt), 0.002, 0.005)


def chime(notes, seconds=1.2, spread=0.06):
    out = np.zeros(int((seconds + spread * len(notes)) * SR))
    for i, note in enumerate(notes):
        tt = t_axis(seconds)
        tone = (np.sin(2 * np.pi * hz(note) * tt) + 0.3 * np.sin(2 * np.pi * hz(note) * 3.01 * tt) * np.exp(-tt * 6)) * np.exp(-tt * 3.2)
        start = int(i * spread * SR)
        out[start:start + len(tone)] += tone * envelope(len(tone), 0.003, 0.2)
    return out / len(notes)


def build_sfx():
    sfx = np.zeros((N, 2))
    fps = 30
    f = lambda frame: frame / fps  # noqa: E731 - les repères suivent lib/timing.ts

    place(sfx, whoosh(1.1, 300, 2600, 0.5), f(64), pan=0.3)              # la grille se pose
    for i, frame in enumerate([118, 124, 130, 136, 142, 150, 158]):     # les blocs s'alignent
        place(sfx, tick(1900 + i * 120), f(frame), gain=0.10, pan=-0.2 + i * 0.07)
    place(sfx, whoosh(0.9, 600, 3400, 0.45), f(200), pan=0.2)             # desktop → mobile
    for k in range(10):                                                   # saisie de la recherche
        place(sfx, tick(3200 + (k % 3) * 300, 0.03), f(268) + k * 0.075, gain=0.05, pan=0.5)
    place(sfx, chime([84, 88], 0.9), f(310), gain=0.22, pan=0.4)          # le site remonte
    place(sfx, chime([81], 0.7), f(358), gain=0.18, pan=0.1)              # preuve
    for frame in (388, 404, 416, 436):                                   # touchers
        place(sfx, tick(1500, 0.06), f(frame), gain=0.16, pan=0.1)
    place(sfx, chime([77, 81, 84], 1.2), f(442), gain=0.28)               # demande envoyée
    place(sfx, whoosh(1.2, 200, 1800, 0.55), f(446), pan=-0.1)            # bascule vers le système
    for i in range(1, 5):                                                # passage par chaque nœud
        place(sfx, chime([72 + [0, 4, 7, 12][i - 1]], 0.6), f(482 + i * 12.5), gain=0.14, pan=-0.6 + i * 0.3)
    place(sfx, whoosh(1.0, 2600, 400, 0.4), f(540))                       # convergence
    place(sfx, chime([65, 72, 76, 79], 2.0, 0.09), f(552), gain=0.30)     # logo
    return sfx * 0.5  # les effets restent sous la musique


def write(path, data):
    data = np.clip(data, -1, 1)
    pcm = (data * 32767).astype("<i2")
    with wave.open(str(path), "wb") as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(SR)
        out.writeframes(pcm.tobytes())


if __name__ == "__main__":
    target = Path(sys.argv[1] if len(sys.argv) > 1 else "out/creation-site")
    target.mkdir(parents=True, exist_ok=True)
    write(target / "music.wav", build_music())
    write(target / "sfx.wav", build_sfx())
    print(f"music.wav et sfx.wav écrits dans {target}")
