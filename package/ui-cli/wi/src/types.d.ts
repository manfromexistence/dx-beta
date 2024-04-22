// DIY type def addons

/**
 * For ink-spinner
 */
declare module "ink-spinner" {
  import { Chalk } from "chalk";
  import * as cliSpinners from "cli-spinners";
  import { Component } from "react";

  type StringifyPartial<T> = { [P in keyof T]?: string };

  type BooleansPartial<T> = { [P in keyof T]?: boolean };

  type TupleOfNumbersPartial<T> = { [P in keyof T]?: [number, number, number] };
  // Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

  type ChalkColorModels = Pick<
    Chalk,
    "rgb" | "hsl" | "hsv" | "hwb" | "bgRgb" | "bgHsl" | "bgHsv" | "bgHwb"
  >;
  type ChalkKeywordsAndHexes = Pick<Chalk, "keyword" | "hex" | "bgKeyword" | "bgHex">;
  type ChalkCommons = Omit<
    Chalk,
    keyof ChalkColorModels | keyof ChalkKeywordsAndHexes | "constructor" | "level" | "enabled"
  >;

  interface SpinnerProps {
    type?: cliSpinners.SpinnerName;
  }

  type ChalkProps = BooleansPartial<ChalkCommons> &
    StringifyPartial<ChalkKeywordsAndHexes> &
    TupleOfNumbersPartial<ChalkColorModels>;

  declare class Spinner extends Component<SpinnerProps & ChalkProps> {}

  export = Spinner;
}

/**
 * For ink-box
 */
declare module "ink-box" {
  import { Component } from "react";
  type borderStyleString =
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";

  type borderStyleObject = {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    horizontal: string;
    vertical: string;
  };

  type whiteSpace = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  interface InkBoxProps {
    borderColor?: string;
    borderStyle?: borderStyleString | borderStyleObject;
    dimBorder?: boolean;
    padding?: number | whiteSpace;
    margin?: number | whiteSpace;
    float?: "right" | "center" | "left";
    backgroundColor?: string;
    align?: "right" | "center" | "left";
  }

  declare class Box extends Component<InkBoxProps> {}

  export = Box;
}

/**
 * For ink-gradient
 */
declare module "ink-gradient" {
  import { Component } from "react";
  type GradientName =
    | "cristal"
    | "teen"
    | "mind"
    | "morning"
    | "vice"
    | "passion"
    | "fruit"
    | "instagram"
    | "atlas"
    | "retro"
    | "summer"
    | "pastel"
    | "rainbow";

  interface InkGradientProps {
    name?: GradientName;
    colors?: string[] | Object[];
  }

  declare class Gradient extends Component<InkGradientProps> {}

  export = Gradient;
}

/**
 * For ink-big-text
 */
declare module "ink-big-text" {
  import { Component } from "react";

  type Color =
    | "system"
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray";

  type BackgroundColor =
    | "transparent"
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white";

  interface InkBigTextProps {
    text: string;
    font?: "block" | "simple" | "simpleBlock" | "3d" | "simple3d" | "chrome" | "huge";
    align?: "left" | "center" | "right";
    colors?: Color[];
    backgroundColor?: BackgroundColor;
    letterSpacing?: number;
    lineHeight?: number;
    space?: boolean;
    maxLength?: number;
  }

  declare class BigText extends Component<InkBigTextProps> {}

  export = BigText;
}

/**
 * Type definitions for wtf_wikipedia 7.3.0
 * Project: https://github.com/spencermountain/wtf_wikipedia#readme
 * Definitions by: Rob Rose <https://github.com/RobRoseKnows>
 *                 Mr. Xyfir <https://github.com/MrXyfir>
 * Modified for temporary use by Xiaoru Li <https://github.com/hexrcs>
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */
declare module "wtf_wikipedia" {
  declare function wtf(wiki: string, options?: any): wtf.Document;

  export const version: string;

  export function category(cat: string, lang: string, options: object, cb: any): Promise<object>;

  export function fetch(
    title: string | number,
    lang?: string,
    options?: any,
    cb?: any
  ): Promise<null | Document>;

  export function fetch(
    titles: string[],
    lang?: string,
    options?: any,
    cb?: any
  ): Promise<Document[]>;

  export function random(lang: string, options: object, cb: any): Promise<Document>;

  class Document {
    private data: object;

    private options: object;

    title(str?: string): string;

    isRedirect(): boolean;

    redirectTo(): Document;

    /** Alias of redirectTo */
    redirectsTo(): Document;

    /** Alias of redirectTo */
    redirect(): Document;

    /** Alias of redirectTo */
    redirects(): Document;

    isDisambiguation(): boolean;

    /** Alias of isDisambiguation */
    isDisambig(): boolean;

    categories(clue: number): string;

    // Singular
    category(clue: number): string;

    categories(): string[];

    sections(clue: number | string): Section;

    // Generated by plurals
    section(clue: number | string): Section;

    sections(): Section[];

    paragraphs(n: number): Paragraph;

    paragraphs(): Paragraph[];

    paragraph(n: number | undefined): Paragraph;

    sentences(n: number): Sentence;

    // Generated by plurals
    sentence(n: number): Sentence;

    sentences(): Sentence[];

    images(clue: number): Image;

    // Singular
    image(clue: number): Image;

    images(): Image[];

    links(clue?: string): object[];

    links(clue: number): object;

    // Singular
    link(clue: number): object;

    interwiki(clue?: string): object[];

    interwiki(clue: number): object;

    lists(clue?: string): List[];

    lists(clue: number): List;

    tables(clue?: string): Table[];

    tables(clue: number): Table;

    // Singular
    table(clue: number): Table;

    templates(clue?: string): object[];

    templates(clue: number): object;

    references(clue?: string): Reference[];

    references(clue: number): Reference;

    // Singular
    reference(clue: number): Reference;

    /** Alias of references */
    citations(clue?: string): Reference[];

    /** Alias of references */
    citations(clue: number): Reference;

    // Alias and singular
    citation(clue: number): Reference;

    coordinates(clue?: string): object[];

    coordinates(clue: number): object;

    // Singular
    coordinate(clue: number): object;

    infoboxes(clue: number): Infobox;

    // generated by plurals
    infobox(clue: number): Infobox;

    infoboxes(): Infobox[];

    text(options?: object): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;

    debug(): Document;
  }

  class Section {
    private doc: Document;
    private _title: string;
    private data: object;
    private depth: number;

    title(): string;

    index(): null | number;

    indentation(): number;

    sentences(n: number): Sentence;

    sentences(): Sentence[];

    paragraphs(n: number): Paragraph;

    paragraphs(): Paragraph[];

    paragraph(n?: number): Paragraph;

    links(n: number): object;

    links(n?: string): object[];

    tables(n: number): Table;

    tables(): Table[];

    templates(clue: number): object;

    templates(clue?: string): object[];

    infoboxes(clue: number): Infobox;

    infoboxes(): Infobox[];

    coordinates(clue: number): object;

    coordinates(): object[];

    lists(clue: number): List;

    lists(): List[];

    interwiki(num: number): object;

    interwiki(): object[];

    images(clue: number): Image;

    images(): Image[];

    references(clue: number): Reference;

    references(): Reference[];

    /** Alias of references() */
    citations(clue: number): Reference;

    /** Alias of references() */
    citations(): Reference[];

    remove(): Document;

    nextSibling(): Section | null;

    /** Alias of nextSibling() */
    next(): Section | null;

    lastSibling(): Section | null;

    /** Alias of lastSibling() */
    last(): Section | null;

    /** Alias of lastSibling() */
    previousSibling(): Section | null;

    /** Alias of lastSibling() */
    previous(): Section | null;

    children(n?: string): Section[];

    children(n: number): Section;

    /** Alias of children */
    sections(n?: string): Section[];

    /** Alias of children */
    sections(n: number): Section;

    parent(): null | Section;

    text(options?: object): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class Infobox {
    private _type: string;

    type(): string;

    /** Alias of type() */
    template(): string;

    links(n: number): object;

    links(n?: string): object[];

    image(): Image | null;

    /** Alias of image() */
    images(): Image | null;

    get(key: string): object | null;

    keyValue(): object;

    /** Alias of keyValue() */
    data(): object;

    text(): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class Table {
    private data: object;

    links(n: number): object;

    links(n?: string): object[];

    keyValue(options: object): object;

    /** Alias of keyValue */
    keyvalue(options: object): object;

    // Alais of keyValue
    keyval(options: object): object;

    text(): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class Reference {
    private data: object;

    title(): string;

    links(n: number): object;

    links(n?: string): object[];

    text(): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class Paragraph {
    private data: object;

    sentences(num: number): Sentence;

    sentences(): Sentence[];

    references(num: number): Reference;

    references(): Reference[];

    /** Alias of references */
    citations(num: number): Reference;

    /** Alias of references */
    citations(): Reference[];

    lists(num: number): List;

    lists(): List[];

    images(num: number): Image;

    images(): Image[];

    links(n: number): object;

    links(n?: string): object;

    interwiki(num: number): object;

    interwiki(): object[];

    text(options?: object): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class Image {
    private data: object;

    file(): string;

    alt(): string;

    caption(): string;

    links(): object[];

    url(): string;

    /** Alias of url() */
    src(): string;

    thumbnail(size: number): string;

    /** Alias of thumbnail() */
    thumb(size: number): string;

    format(): string;

    exists(callback: () => boolean): Promise<boolean>;

    text(): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class List {
    private data: object;

    lines(): object;

    links(n: number): object;

    links(n?: string): object;

    interwiki(num: number): object;

    interwiki(): object[];

    text(options?: object): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  class Sentence {
    private data: object;

    links(n: number): object;

    links(n?: string): object;

    interwiki(num: number): object;

    interwiki(): object[];

    bolds(n: number): string;

    bolds(): string[];

    /** Alias of bolds */
    bold(n: number): string;

    /** Alias of bolds */
    bold(): string[];

    italics(n: number): string;

    italics(): string[];

    /** Alias of italics */
    italic(n: number): string;

    /** Alias of italics */
    italic(): string[];

    dates(n: number): string;

    dates(): string[];

    text(str: string | null | undefined): string;

    /** Alias of text */
    plaintext(str: string | null | undefined): string;

    markdown(options?: object): string;

    latex(options?: object): string;

    html(options?: object): string;

    json(options?: object): object;
  }

  export = wtf;
}
