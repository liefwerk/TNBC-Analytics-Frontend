interface FaqItem {
  uuid: string,
  question: string,
  answer: string,
  type: {
    uuid: string,
    title: string
  }
}