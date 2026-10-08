# Audio du film /creation-site

## Ce qui est livré

`generate-ambiance.py` synthétise l'ambiance (100 BPM, nappes, arpège doux, sans basse appuyée) et les micro-effets calés sur `src/lib/timing.ts`. Aucun échantillon ni morceau externe : pas de question de droits. Mix sans voix normalisé à −20 LUFS, laissé en retrait.

## Voix off : emplacement prévu

Aucune voix n'est enregistrée : il faut une voix humaine ou un service de synthèse vocale sous licence. Déposer le fichier ici :

```
creation-site/audio/voiceover.wav   (48 kHz, mono ou stéréo, ~17 s, silence au début inclus)
```

puis relancer `npm run creation-site:export`. Le script place la voix au-dessus de l'ambiance, abaisse automatiquement la musique sous la voix (sidechain) et normalise le tout à −16 LUFS, crête −1,5 dBTP.

### Texte

> Un site ne doit pas seulement être beau.
> Il doit expliquer votre offre, être trouvé, rassurer…
> et guider vos visiteurs vers l'action.
> CODE-V construit chaque site autour de ces objectifs.

Ordre ajusté (« être trouvé » avant « rassurer ») pour suivre l'image ; le sens est inchangé.

### Repères de calage (film de 20 s)

| Temps | Image | Voix |
| --- | --- | --- |
| 0,4 – 2,6 s | « Un site ne doit pas seulement exister. » | « Un site ne doit pas seulement être beau. » |
| 3,2 – 5,6 s | CLARIFIER : la grille devient interface | « Il doit expliquer votre offre, » |
| 7,2 – 9,0 s | ÊTRE TROUVÉ : mobile, recherche | « être trouvé, » |
| 11,0 – 12,4 s | CONVAINCRE : preuve | « rassurer… » |
| 12,8 – 15,0 s | CONVERTIR : CTA, formulaire | « et guider vos visiteurs vers l'action. » |
| 15,8 – 18,6 s | Système connecté puis logo | « CODE-V construit chaque site autour de ces objectifs. » |

Ton : calme, confiant, naturel, ni voix de publicité radio ni registre dramatique.
