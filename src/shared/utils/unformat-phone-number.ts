const unformatPhoneNumber = (input: string) => {
    return input.replace(/\D/g, '')
}

export default unformatPhoneNumber
