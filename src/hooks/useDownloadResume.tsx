import { jsPDF } from 'jspdf'
import { maxHeight, maxWidth } from '../contants'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { FontStyle } from 'src/types/Font'
import {
  MerriWeatherBoldFont,
  MerriWeatherItalicFont,
  MerriWeatherRegularFont,
  OverpassBoldFont,
  OverpassItalicFont,
  OverpassRegularFont,
  RalewayBoldFont,
  RalewayItalicFont,
  RalewayRegularFont,
  RobotoBoldFont,
  RobotoItalicFont,
  RobotoRegularFont,
  UbuntuBoldFont,
  UbuntuItalicFont,
  UbuntuRegularFont
} from 'src/contants/FontSerialized'

const updateFont = (font: string, pdf: jsPDF) => {
  let regularFont
  let boldFont
  let italicFont
  switch (font) {
    case FontStyle.roboto:
      regularFont = RobotoRegularFont
      boldFont = RobotoBoldFont
      italicFont = RobotoItalicFont
      break
    case FontStyle.ubuntu:
      regularFont = UbuntuRegularFont
      boldFont = UbuntuBoldFont
      italicFont = UbuntuItalicFont
      break
    case FontStyle.raleway:
      regularFont = RalewayRegularFont
      boldFont = RalewayBoldFont
      italicFont = RalewayItalicFont
      break
    case FontStyle.overpass:
      regularFont = OverpassRegularFont
      boldFont = OverpassBoldFont
      italicFont = OverpassItalicFont
      break
    case FontStyle.merriweather:
      regularFont = MerriWeatherRegularFont
      boldFont = MerriWeatherBoldFont
      italicFont = MerriWeatherItalicFont
      break
    default:
      regularFont = OverpassRegularFont
      boldFont = OverpassBoldFont
      italicFont = OverpassItalicFont
      break
  }

  pdf.addFileToVFS(`${font}-Regular.ttf`, regularFont)
  pdf.addFileToVFS(`${font}-Bold.ttf`, boldFont)
  pdf.addFileToVFS(`${font}-Italic.ttf`, italicFont)
  pdf.addFont(`${font}-Regular.ttf`, `${font}`, 'normal')
  pdf.addFont(`${font}-Bold.ttf`, `${font}`, 'bold')
  pdf.addFont(`${font}-Italic.ttf`, `${font}`, 'italic')
  pdf.setFont(`${font}`)
}

export const useDownloadResume = () => {
  const font = useSelector((state: RootState) => state.font)

  async function generatePDF() {
    const data = document.querySelectorAll('div.panel')
    if (!data || (data && data.length === 0)) return

    const pagesLength = data.length
    let i = 0

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [maxWidth, maxHeight],
      compress: true
    })

    updateFont(font.currentFontFamily, pdf)

    for await (const panel of data) {
      await pdf.html(panel as HTMLElement, {
        callback: function (pdf) {
          if (i === pagesLength - 1) {
            const pageCount = pdf.getNumberOfPages()
            //we delete the last blank page
            if (pageCount > pagesLength) {
              pdf.deletePage(pageCount)
            }
            pdf.save('download.pdf')
          }
          i++
        },
        y: i === 0 ? 0 : maxHeight * i
      })
    }
  }

  return { generatePDF }
}
