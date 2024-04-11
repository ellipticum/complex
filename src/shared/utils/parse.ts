import React from 'react'

import sanitize from '@/shared/utils/sanitize'

const parse = (string: string): React.ReactElement[] => {
    const sanitizedString = sanitize(string)

    const parser = new DOMParser()
    const doc = parser.parseFromString(sanitizedString, 'text/html')
    const elements: React.ReactElement[] = []

    const childNodes = Array.from(doc.body.childNodes)

    for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i]
        if (node instanceof HTMLElement) {
            elements.push(
                React.createElement(node.tagName.toLowerCase(), {
                    key: i,
                    dangerouslySetInnerHTML: {
                        __html: node.innerHTML
                    }
                })
            )
        }
    }

    return elements
}

export default parse
