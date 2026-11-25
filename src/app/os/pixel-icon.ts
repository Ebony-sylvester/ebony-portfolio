import { Component, computed, input } from '@angular/core';

// Pixel art as strings: one character per pixel, '.' is transparent.
// Drawn by hand so the site carries no borrowed OS artwork.
const COLORS: Record<string, string> = {
  k: '#26232D',
  w: '#FFFFFF',
  g: '#C9C6D1',
  d: '#8C8896',
  y: '#F6C945',
  Y: '#C9952A',
  p: '#FF9CC8',
  P: '#C2367A',
  B: '#3A2C9C',
  t: '#2F7F7C',
  m: '#9CF2C0',
  r: '#9A6233',
};

const ART = {
  notepad: [
    '.kkkkkkkkkk.', '.kBkBkBkBkk.', '.kwwwwwwwwk.', '.kwkkkkkkwk.', '.kwwwwwwwwk.', '.kwkkkkwwwk.',
    '.kwwwwwwwwk.', '.kwkkkkkkwk.', '.kwwwwwwwwk.', '.kwkkkwwwwk.', '.kwwwwwwwwk.', '.kkkkkkkkkk.',
  ],
  folder: [
    '............', '.kkkk.......', 'kyyyyk......', 'kyyyyykkkkkk', 'kYYYYYYYYYYk', 'kyyyyyyyyyyk',
    'kyyyyyyyyyyk', 'kyyyyyyyyyyk', 'kyyyyyyyyyyk', 'kyyyyyyyyyyk', 'kkkkkkkkkkkk', '............',
  ],
  briefcase: [
    '............', '....kkkk....', '....k..k....', 'kkkkkkkkkkkk', 'krrrrrrrrrrk', 'krrrrrrrrrrk',
    'kkkkkyykkkkk', 'krrrrkkrrrrk', 'krrrrrrrrrrk', 'krrrrrrrrrrk', 'kkkkkkkkkkkk', '............',
  ],
  computer: [
    '.kkkkkkkkkk.', '.kggggggggk.', '.kgkkkkkkgk.', '.kgkttttkgk.', '.kgktmttkgk.', '.kgkkkkkkgk.',
    '.kggggggggk.', '.kkkkkkkkkk.', '....kggk....', '..kkkkkkkk..', '..kggggPgk..', '..kkkkkkkk..',
  ],
  terminal: [
    'dddddddddddd', 'dBBBBBBBBBwd', 'dddddddddddd', 'dkkkkkkkkkkd', 'dkmkkkkkkkkd', 'dkkmkkkkkkkd',
    'dkmkkkkkkkkd', 'dkkkkkkkkkkd', 'dkkkkmmmkkkd', 'dkkkkkkkkkkd', 'dkkkkkkkkkkd', 'dddddddddddd',
  ],
  mail: [
    '............', '............', 'kkkkkkkkkkkk', 'kwkwwwwwwkPk', 'kwwkwwwwkwwk', 'kwwwkwwkwwwk',
    'kwwwwkkwwwwk', 'kwwwwwwwwwwk', 'kwwwwwwwwwwk', 'kkkkkkkkkkkk', '............', '............',
  ],
  bin: [
    '....kkkk....', '.kkkkkkkkkk.', '.kggggggggk.', '.kkkkkkkkkk.', '..kgdgdgdk..', '..kgdgdgdk..',
    '..kgdgdgdk..', '..kgdgdgdk..', '..kgdgdgdk..', '..kgdgdgdk..', '..kkkkkkkk..', '............',
  ],
  doc: [
    '.kkkkkkk....', '.kwwwwwkk...', '.kwwwwwkwk..', '.kwwwwwkkkk.', '.kwPPPPwwwk.', '.kwwwwwwwwk.',
    '.kwkkkkkkwk.', '.kwwwwwwwwk.', '.kwkkkkkkwk.', '.kwwwwwwwwk.', '.kwkkkkwwwk.', '.kkkkkkkkkk.',
  ],
  notes: [
    '..kkkkkkkk..', '.kPpppppppk.', 'kkPpwwwwwpk.', '.kPpppppppk.', 'kkPpwwwwppk.', '.kPpppppppk.',
    'kkPpwwwwwpk.', '.kPpppppppk.', 'kkPpppppppk.', '.kPpppppppk.', '..kkkkkkkk..', '............',
  ],
  heart: [
    '............', '..PPP..PPP..', '.PppPPPPPPP.', '.PppPPPPPPP.', '.PpPPPPPPPP.', '.PPPPPPPPPP.',
    '..PPPPPPPP..', '...PPPPPP...', '....PPPP....', '.....PP.....', '............', '............',
  ],
  floppy: [
    '.kkkkkkkkkkkkkk.', 'kpppkggggggkpppk', 'kpppkggkkggkpppk', 'kpppkggkkggkpppk', 'kpppkggggggkpppk', 'kppppkkkkkkppppk',
    'kppppppppppppppk', 'kppwwwwwwwwwwppk', 'kppwwkwwwwkwwppk', 'kppwwkwwwwkwwppk', 'kppwPwwwwwwPwppk', 'kppwwwwkkwwwwppk',
    'kppwwwwwwwwwwppk', 'kppwwwwwwwwwwppk', 'kppppppppppppppk', '.kkkkkkkkkkkkkk.',
  ],
} as const;

export type IconName = keyof typeof ART;

@Component({
  selector: 'app-pixel-icon',
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      [attr.width]="size()"
      [attr.height]="size()"
      shape-rendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      @for (px of pixels(); track $index) {
        <rect [attr.x]="px.x" [attr.y]="px.y" width="1" height="1" [attr.fill]="px.fill" />
      }
    </svg>
  `,
  host: { style: 'display:inline-flex;line-height:0' },
})
export class PixelIcon {
  readonly name = input.required<IconName>();
  readonly size = input(32);

  protected readonly viewBox = computed(() => {
    const rows = ART[this.name()];
    return `0 0 ${rows[0].length} ${rows.length}`;
  });

  protected readonly pixels = computed(() => {
    const out: { x: number; y: number; fill: string }[] = [];
    ART[this.name()].forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const fill = COLORS[row[x]];
        if (fill) out.push({ x, y, fill });
      }
    });
    return out;
  });
}
