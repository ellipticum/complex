const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, '')
    const limitedDigits = digits.substring(0, 11)

    const match = limitedDigits.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)

    if (!match) {
        return ''
    }

    const special = ['7', '8']
    const condition = special.includes(match[1])

    if (match) {
        input = [
            match[1] && '+',
            match[1] && '7',
            (condition ? match[2] : match[1]) && ' (',
            condition ? match[2] : `${match[1]}`,
            match[3] && ') ',
            match[3],
            match[4] && '-',
            match[4],
            match[5] && '-',
            match[5]
        ].join('')
    }

    return input
}

export default formatPhoneNumber
