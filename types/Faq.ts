export interface FaqItem {
  uuid: string,
  question: string,
  answer: string,
  faqType_id: FaqItemType
}

export interface FaqItemType {
  id: string,
  title: string
}