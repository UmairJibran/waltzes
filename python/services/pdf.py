from fpdf import FPDF

class PDF(FPDF):
    # receive name in the constructor
    def __init__(self, name):
        self.name = name;
        print(self);

    def header(self):
        self.set_font('Arial', 'BI', 12)
        self.cell(0, 10, 'Umair Jibran', 0, 0, 'C')
        self.ln(20)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')


def convert_text_to_pdf(text):
    pdf = PDF("Umair Jibran")
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_font('Times', '', 12)
    lines = text.split('\n')
    for line in lines:
        pdf.multi_cell(0, 5, line)
    pdf.output("output.pdf")
    return "output.pdf"
