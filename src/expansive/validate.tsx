export const maxLength = (max: number, value: string) => {
    return value && value.length > max
}
export const minLength = (min: number, value: string) => {
    return value.length < min
}


export const validate = (value: any, min: number, max: number, name: string) => {
    // debugger
    if (!value) {
        return 'Required'
    }

    if (minLength(min, value)) {
        return `Must be ${min} characters or more`
    }
    if (maxLength(max, value)) {
        return `Must be ${max} characters or less`
    }
    if (name === 'price') {
        if (!isFinite(value)) {
            return 'ok, try to enter the number'
        }
        if (value < 0) {
            return 'price cannot be negative'
        }
    }
    if (name === 'description') {
        if (value.trim().length < 30) {
            return 'not enough to describe'
        }
    }
    return ''
}
