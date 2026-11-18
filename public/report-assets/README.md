# Report fonts

Noto Sans Regular and Bold, from the official Noto font repository:

- https://github.com/notofonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf
- https://github.com/notofonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Bold.ttf

License: SIL Open Font License 1.1, included as `OFL.txt`.

These are static, unhinted subsets for Latin and European report text:
`U+0000-024F,U+1E00-1EFF,U+2000-206F,U+20AC,U+2190-2199`.
They reduce the two export-only downloads from about 1.1 MB to 143 KB.
Characters outside the font remain in the report as reversible `[U+XXXX]`
labels instead of being silently discarded or replaced by question marks.

Reproduce from the upstream TTF with FontTools (build-time download is not needed):

```
pyftsubset NotoSans-Regular.ttf --unicodes=U+0000-024F,U+1E00-1EFF,U+2000-206F,U+20AC,U+2190-2199 --no-hinting --output-file=NotoSans-Regular-subset.ttf
```

Repeat for Bold. The committed files are already prepared for PDF export.
