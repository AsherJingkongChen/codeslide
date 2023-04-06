export namespace Schema {
  export type Client = {
    slide?: {
      path: string;
      title?: string | null;
    }[] | null;
  };
  export type Template = {
    slide: {
      text: string;
      title: string;
    }[];
  }
}

export type Slide = Schema.Template['slide'];
export type Page = Slide[number];
