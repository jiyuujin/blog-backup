import * as fs from 'fs'
import dayjs from 'dayjs'

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Japan')

const dateFormat = (date: string, option: string) => {
    return dayjs.utc(date).format(option)
}

(async function () {
    const lang = 'en-US'

    const jsonObject = JSON.parse(await fs.readFileSync('./webneko-blog-export.json', 'utf8'))

    Object(jsonObject?.entries).forEach((obj: unknown | any) => {
        const field = obj.fields
        if (field.slug !== undefined) {
            const publishDate = field.publishDate[lang]
            const year = dateFormat(publishDate, 'YYYY')
            const month = dateFormat(publishDate, 'MM')
            const date = dateFormat(publishDate, 'DD')
            const dateText = `${year}-${month}-${date}`

            const titleText = field.title[lang]

            const descriptionText = field.description[lang].replace(/^\s\n+|\s\n+$/g,'')

            const slugText = field.slug[lang]

            let categoryText = ''
            if (field.category !== undefined) {
                categoryText += field.category[lang]
            }

            let tagsText = ''
            if (field.tags !== undefined) {
                field.tags[lang].map((tag: string) => {
                    tagsText += ` - ${tag}\n`
                })
            }

            const bodyText = field.body[lang]

            let content = ''
            content += `---\n`
            content += `date: ${dateText}\n`
            content += `title: ${titleText}\n`
            content += `description: ${descriptionText}\n`
            content += `slug: ${slugText}\n`
            content += `category: ${categoryText}\n`
            content += `tags: \n${tagsText}`
            content += `---\n\n`
            content += bodyText

            fs.writeFile(
                `./posts/${dateText}-${slugText}.md`,
                content,
                (err) => {
                    if (err) console.log(`Error: ${err}`)
                })
        }
    })
}())
