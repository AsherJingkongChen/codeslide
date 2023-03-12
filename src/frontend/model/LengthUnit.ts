export type AbsoluteLegnthUnits =
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pt'
  | 'pc'
  | 'px';

export type FontLengthUnits =
  | 'em'
  | 'rem'
  | 'ex'
  | 'rex'
  | 'cap'
  | 'rcap'
  | 'ch'
  | 'rch'
  | 'ic'
  | 'ric'
  | 'lh'
  | 'rlh';

export type Percentage = '%';

export type ViewportLengthUnits =
  | 'vw'
  | 'svw'
  | 'lvw'
  | 'dvw'
  | 'vh'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'vi'
  | 'svi'
  | 'lvi'
  | 'dvi'
  | 'vb'
  | 'svb'
  | 'lvb'
  | 'dvb'
  | 'vmin'
  | 'svmin'
  | 'lvmin'
  | 'dvmin'
  | 'vmax'
  | 'svmax'
  | 'lvmax'
  | 'dvmax';

export type LengthUnits =
  | AbsoluteLegnthUnits
  | Percentage
  | FontLengthUnits
  | ViewportLengthUnits;
