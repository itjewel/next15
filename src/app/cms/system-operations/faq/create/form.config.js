import * as Yup from "yup";

export const faqLang = {
  id: 0,
  faqId: 0,
  languageId: "",
  question: "",
  answer: "",
};

export const initialValue = {
  userTypeId: "",
  faqTypeId: 0,
  faqLangs: [faqLang],
  deletedFaqLangIds: [],
};

export const FaqCreateSchema = Yup.object().shape({
  userTypeId: Yup.string().required("User type field is required"),
  faqTypeId: Yup.number().required("Faq type field is required"),
  faqLangs: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        faqId: Yup.number(),
        languageId: Yup.number().required("Language is required"),
        question: Yup.string().trim().required("Question is required"),
        answer: Yup.string().trim(),
      }),
    )
    .min(1, "Minimun one language required")
    .required("Minimun one language required"),
  deletedFaqLangIds: Yup.array().of(Yup.number()),
});
