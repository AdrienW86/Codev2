"""Ambiance musicale et micro-effets du film /referencement, synthétisés ici.

Aucun échantillon externe : tout est généré par ce script (droits CODE-V).
Sortie : music.wav, sfx.wav (48 kHz, stéréo, 16 bits) dans le dossier donné.

Musique : électronique légère et aérée à 92 BPM, nappes et motif en cloches douces,
sans grosse caisse ni basse appuyée. Elle part voilée (le site est invisible) et
s'ouvre à mesure que le site se structure. Début et fin en silence : le film boucle.
Les effets suivent lib/timing.ts : exploration, indexation, requête, clic, visite.
"""
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48_000
FPS = 30
DURATION = 20.0
BPM = 92
BEAT = 60 / BPM
N = int(SR * DURATION)
rng = np.random.default_rng(11)  # rendu déterministe


def f(frame):
    """Repère du film (frame à 30 i/s) en secondes."""
    return frame / FPS


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
    if a:
        env[:a] = np.linspace(0, 1, a)
    if r:
        env[-r:] *= np.linspace(1, 0, r)
    return env


def pan_of(x):
    """Position horizontale dans l'image (0–1920 px) → panoramique discret."""
    return (x / 1920 - 0.5) * 0.8


# --- Musique ----------------------------------------------------------------
# Ré majeur 9 → Si mineur 9 → Sol majeur 7 (#11) → La sus4, puis retour sur Ré.
CHORDS = [
    (0.0, [50, 57, 62, 64, 66]),
    (5.2, [47, 54, 61, 62, 66]),
    (10.4, [43, 54, 59, 61, 66]),
    (14.6, [45, 52, 59, 62, 64]),
    (17.8, [50, 57, 61, 64, 66]),
]


def pad_voice(freq, seconds):
    t = t_axis(seconds)
    tone = np.zeros_like(t)
    for detune in (-0.1, 0.0, 0.09):
        fr = freq * 2 ** (detune / 12)
        phase = rng.uniform(0, 2 * np.pi)
        tone += np.sin(2 * np.pi * fr * t + phase) + 0.12 * np.sin(4 * np.pi * fr * t + phase)
    return tone / 3


def bell(note, seconds=0.9):
    """Cloche douce (FM légère) : le motif « index » de la musique."""
    tt = t_axis(seconds)
    mod = np.sin(2 * np.pi * hz(note) * 2.0 * tt) * 1.2 * np.exp(-tt * 8)
    tone = np.sin(2 * np.pi * hz(note) * tt + mod) * np.exp(-tt * 5.5)
    return tone * envelope(len(tt), 0.003, 0.1)


def build_music():
    music = np.zeros((N, 2))
    for idx, (start, notes) in enumerate(CHORDS):
        end = CHORDS[idx + 1][0] if idx + 1 < len(CHORDS) else DURATION
        seconds = end - start + 1.0  # recouvrement : enchaînement sans trou
        for k, note in enumerate(notes):
            voice = pad_voice(hz(note), seconds) * envelope(int(seconds * SR), 1.0, 1.2)
            place(music, voice, start, gain=0.045 if note > 48 else 0.03, pan=(-0.5 + k / (len(notes) - 1)) * 0.8)

    # 0–3 s voilé (le site est invisible), puis le filtre s'ouvre avec la structure.
    t = np.arange(N) / SR
    cutoff = np.interp(t, [0, 2.8, 7, 11, 15, 18, 20], [420, 520, 1500, 2100, 2600, 2300, 1400])
    for ch in range(2):
        music[:, ch] = one_pole_lowpass(music[:, ch], cutoff)

    # Motif en cloches, en croches, dès la structure ; plus présent pendant la recherche.
    eighth = BEAT / 2
    pattern = [0, 3, 2, 4, 1, 4, 3, 2]
    time, step = 3.0, 0
    while time < 18.6:
        notes = [n for s, n in CHORDS if s <= time][-1]
        if step % 8 not in (5,):  # une respiration par mesure
            level = np.interp(time, [3.0, 4.0, 7.3, 11, 15, 17.6, 18.6], [0, 0.035, 0.045, 0.055, 0.05, 0.03, 0])
            note = notes[pattern[step % 8]] + 12
            b = bell(note)
            place(music, b, time, gain=level, pan=0.4 if step % 2 else -0.4)
            place(music, b, time + eighth * 1.5, gain=level * 0.3, pan=-0.4 if step % 2 else 0.4)
        time += eighth
        step += 1

    # Pulsation très douce (souffle filtré, pas de grosse caisse) pendant exploration et recherche.
    beat_time, count = f(222), 0
    while beat_time < f(500):
        if count % 2 == 1:
            n = int(0.1 * SR)
            noise = rng.normal(0, 1, n)
            noise = one_pole_lowpass(one_pole_lowpass(noise, 8000), 8000) - one_pole_lowpass(noise, 4000)
            noise *= np.exp(-np.linspace(0, 8, n)) * envelope(n, 0.006, 0.0)
            place(music, noise, beat_time, gain=0.022, pan=-0.15)
        beat_time += BEAT
        count += 1

    # Fondus d'entrée et de sortie : le raccord de boucle se fait dans le silence.
    fade = np.interp(t, [0, 0.4, 18.9, 19.85], [0, 1, 1, 0])
    return music * fade[:, None]


# --- Micro-effets -------------------------------------------------------------
def whoosh(seconds, low, high, gain=1.0):
    n = int(seconds * SR)
    noise = rng.normal(0, 1, n)
    sweep = np.geomspace(low, high, n)
    # Deux passes de filtre : un souffle doux, sans aigus sifflants.
    low = one_pole_lowpass(one_pole_lowpass(noise, sweep), sweep)
    body = low - one_pole_lowpass(low, sweep * 0.25)
    return body * np.sin(np.linspace(0, np.pi, n)) ** 1.6 * gain * 1.6


def blip(freq, seconds=0.07):
    """Passage d'exploration : impulsion brève et claire."""
    tt = t_axis(seconds)
    return np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 70) * envelope(len(tt), 0.002, 0.01)


def slot(freq=900, seconds=0.09):
    """Entrée dans l'index : petit son boisé, plus mat."""
    tt = t_axis(seconds)
    tone = np.sin(2 * np.pi * freq * tt) + 0.4 * np.sin(2 * np.pi * freq * 2.7 * tt) * np.exp(-tt * 80)
    return tone * np.exp(-tt * 45) * envelope(len(tt), 0.001, 0.01)


def tick(freq=3000, seconds=0.03):
    tt = t_axis(seconds)
    return np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 110) * envelope(len(tt), 0.001, 0.004)


def chime(notes, seconds=1.1, spread=0.06):
    out = np.zeros(int((seconds + spread * len(notes)) * SR))
    for i, note in enumerate(notes):
        tt = t_axis(seconds)
        tone = (np.sin(2 * np.pi * hz(note) * tt) + 0.25 * np.sin(2 * np.pi * hz(note) * 3.01 * tt) * np.exp(-tt * 6)) * np.exp(-tt * 3.4)
        start = int(i * spread * SR)
        out[start:start + len(tone)] += tone * envelope(len(tone), 0.003, 0.2)
    return out / len(notes)


# Positions des pages (lib/layout.ts, arborescence décalée) pour le panoramique.
PAGE_X = {"home": 620, "services": 308, "realisations": 620, "ressources": 932,
          "creation": 214, "seo": 401, "etude": 620, "guide": 838, "archive": 1026}
CRAWL = [("services", 222, 14), ("realisations", 225, 14), ("ressources", 228, 14),
         ("creation", 238, 14), ("seo", 241, 14), ("etude", 243, 14), ("guide", 246, 14), ("archive", 249, 14)]
INDEXED = {"home": 222, **{p: at + dur for p, at, dur in CRAWL if p != "archive"}}


def build_sfx():
    sfx = np.zeros((N, 2))
    place(sfx, whoosh(1.3, 250, 2000, 0.4), f(86), pan=0.0)                 # les pages se rangent
    for i in range(9):                                                      # chaque page se pose
        place(sfx, tick(2200 + i * 90, 0.035), f(128 + i * 5), gain=0.05, pan=-0.3 + i * 0.07)
    place(sfx, whoosh(0.8, 900, 2600, 0.22), f(168), pan=-0.2)              # maillage
    place(sfx, whoosh(1.0, 400, 1800, 0.25), f(208), pan=-0.3)              # l'arborescence se décale
    for i, (page, at, dur) in enumerate(CRAWL):                             # exploration
        place(sfx, blip(2600 + (i % 4) * 180), f(at + dur), gain=0.07, pan=pan_of(PAGE_X[page]))
    place(sfx, blip(2400), f(222), gain=0.07, pan=pan_of(620))
    for k, (page, seen) in enumerate(sorted(INDEXED.items(), key=lambda kv: kv[1])):  # indexation
        place(sfx, slot(820 + k * 35), f(seen + 28), gain=0.09, pan=0.45)
    place(sfx, whoosh(1.0, 300, 2400, 0.3), f(330), pan=0.45)               # la requête apparaît
    for k in range(9):                                                      # saisie
        place(sfx, tick(3300 + (k % 3) * 250, 0.025), f(342) + k * 0.11, gain=0.035, pan=0.5)
    place(sfx, chime([81, 86], 0.9), f(376), gain=0.16, pan=0.4)            # pertinence
    place(sfx, whoosh(0.9, 500, 2800, 0.22), f(410), pan=0.45)              # remontée
    place(sfx, chime([86], 0.7), f(438), gain=0.12, pan=0.45)
    place(sfx, tick(1400, 0.06), f(452), gain=0.16, pan=0.35)               # clic
    place(sfx, whoosh(0.9, 2400, 500, 0.3), f(460), pan=-0.1)               # trajectoire vers la page
    place(sfx, chime([78, 83], 0.9), f(484), gain=0.16, pan=-0.4)           # arrivée sur la bonne page
    place(sfx, whoosh(0.8, 300, 1500, 0.2), f(486), pan=0.0)                # la page s'ouvre
    place(sfx, tick(1600, 0.05), f(528), gain=0.12, pan=-0.2)               # action
    place(sfx, whoosh(0.9, 2200, 350, 0.28), f(532))                        # convergence
    place(sfx, chime([62, 69, 73, 76], 1.8, 0.08), f(546), gain=0.24)       # logo
    fade = np.interp(np.arange(N) / SR, [0, 19.0, 19.85], [1, 1, 0])
    return sfx * 0.5 * fade[:, None]  # les effets restent sous la musique


def write(path, data):
    data = np.clip(data, -1, 1)
    pcm = (data * 32767).astype("<i2")
    with wave.open(str(path), "wb") as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(SR)
        out.writeframes(pcm.tobytes())


if __name__ == "__main__":
    target = Path(sys.argv[1] if len(sys.argv) > 1 else "out/referencement")
    target.mkdir(parents=True, exist_ok=True)
    write(target / "music.wav", build_music())
    write(target / "sfx.wav", build_sfx())
    print(f"music.wav et sfx.wav écrits dans {target}")
