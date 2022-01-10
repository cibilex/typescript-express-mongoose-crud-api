import * as yup from "yup"

yup.setLocale({
    string:{
        max:({path,max})=>`${path} length must be lesser than ${max}`,
        min:({path,min})=>`${path} length must be greater than ${min}`
    }
})

const email=yup.string().required().trim().lowercase().email("please enter a valid email")
export const createUserSchema=yup.object().shape({
    email,
    password:yup.string().required().max(30).min(6)
})

export const updateUserSchema=yup.object().shape({
    email
})
