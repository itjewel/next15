import * as Yup from "yup";

export const initialValue = {
    name : "",
    reviewBy : "",
    type : "",
}

export const ReviewreasonSchema = Yup.object().shape({
    name : Yup.string().trim().min(1,"Minimum ine letter is required in name").required("Name is required field"),
    reviewBy : Yup.number().required("Review by is required field"),
    type : Yup.number().required("Type is required field"),
})