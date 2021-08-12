export interface FaqItem {
  uuid: string,
  question: string,
  answer: string,
  type: FaqItemType
}

export interface FaqItemType {
  uuid: string,
  title: string
}