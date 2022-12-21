import { jsPDF } from 'jspdf'
import { maxHeight, maxWidth } from '../contants'

export const useDownloadResume = () => {
  async function generatePDF() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [maxWidth, maxHeight],
      compress: true
    })
    const data = document.querySelectorAll('div.panel.two-column')
    const pagesLength = data.length
    let i = 0
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
