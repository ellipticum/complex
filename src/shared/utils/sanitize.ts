const sanitize = (string: string) => {
    string = string.replace(/<script>/g, '<p>')
    string = string.replace(/<\/script>/g, '</p>')

    return string
}

export default sanitize
