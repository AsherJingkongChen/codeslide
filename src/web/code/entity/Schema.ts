export type ClientSchema = {
  slide?: Array<
    {
      path: string;
      title?: string | null;
    }
    | string
  >
  | null;
};

export type TemplateSchema = {
  slide: Array<{
    text: string;
    title: string;
  }>;
};

export type Slide = TemplateSchema['slide'];
export type Page = Slide[number];
