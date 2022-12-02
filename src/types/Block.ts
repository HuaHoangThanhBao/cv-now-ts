export interface Common extends Year, GlobalIterator {
  id: string;
  uid?: string;
  header?: {
    text: string;
    placeHolder: string;
  };
  title?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
  desc?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface Year {
  month_start?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
  month_end?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
  year_start?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
  year_end?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface DetailDashed extends GlobalIterator {
  optional_dashed?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface DetailDashed2 extends GlobalIterator {
  optional_dashed2: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface DetailDashed3 extends GlobalIterator {
  optional_dashed3?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface DetailDashed4 extends GlobalIterator {
  optional_dashed4?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface DetailDashed5 extends GlobalIterator {
  optional_dashed5?: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface Contact extends GlobalIterator {
  contact: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
  contact_person: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
  contact_info: {
    text: string;
    placeHolder: string;
    status: boolean;
    height: number;
  };
}

export interface Education extends Common, Detail, DetailDashed, IObjectKeys { }
export interface WorkExperience
  extends Common,
  Detail,
  DetailDashed,
  DetailDashed2,
  DetailDashed3,
  IObjectKeys { }

export interface Publication
  extends Common,
  DetailDashed2,
  DetailDashed3,
  DetailDashed4,
  DetailDashed5,
  IObjectKeys { }

export interface DetailDetail extends Common {
  id: string;
  uid?: string;
  text: string;
  placeHolder: string;
  status: boolean;
  height: number;
}

export interface Detail extends GlobalIterator {
  content_bullet: {
    child: DetailDetail[];
    placeHolder: string;
    status: boolean;
    height: number;
    text?: string;
  };
}

interface IObjectKeys {
  [key: string]: any;
}

export interface GlobalIterator extends IObjectKeys { }
