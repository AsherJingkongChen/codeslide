export namespace Schema {
  export type Client = {
    output?: string | null;
    slide?: {
      path: string;
      title?: string | null;
    }[] | null;
  };
  export type Template = {
    output: string;
    slide: {
      text: string;
      title: string;
    }[];
  }
}

export type Slide = Schema.Template['slide'];
export type Page = Slide[number];
