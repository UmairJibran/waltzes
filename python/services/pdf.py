from fpdf import FPDF


class PDF(FPDF):
    def __init__(self, title="", font_family="Arial"):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.title = title
        self.font_family = font_family
        self.set_margins(10, 10 if not title else 30, 10)

        self.set_font(self.font_family, "")

    def header(self):
        if self.title:
            self.set_font(self.font_family, "B", 12)
            self.cell(0, 10, self.title, 0, 0, "C")
            self.ln(20)

    def footer(self):
        self.set_y(-15)
        self.set_font(self.font_family, "I", 8)
        self.cell(0, 10, "Page " + str(self.page_no()) + "/{nb}", 0, 0, "C")


def create_resume(segments, font_family="Times"):
    pdf = PDF(font_family=font_family)
    pdf.alias_nb_pages()
    pdf.add_page()

    pdf.set_font(font_family, "B", 16)
    pdf.cell(0, 10, segments.get("name", ""), 0, 1, "C")

    if "contact" in segments:
        pdf.set_font(font_family, "", 10)
        contact = segments["contact"]
        contact_text = " - ".join(contact)
        pdf.cell(0, 5, contact_text, 0, 1, "C")
        pdf.ln(5)

    def add_section(title, content):
        if not content:
            return

        pdf.set_font(font_family, "B", 12)
        pdf.cell(0, 10, title.upper(), 0, 1, "")
        pdf.line(10, pdf.get_y(), 200, pdf.get_y())
        pdf.ln(2)

        pdf.set_font(font_family, "", 10)

        if isinstance(content, list):
            for item in content:
                if isinstance(item, dict):
                    if "title" in item:
                        pdf.set_font(font_family, "B", 11)
                        pdf.cell(0, 6, item.get("title", ""), 0, 1)

                    if "location" in item or "date" in item:
                        pdf.set_font(font_family, "", 10)
                        location = item.get("location", "")
                        date = item.get("date", "")

                        location_width = pdf.get_string_width(location)
                        date_width = pdf.get_string_width(date)

                        if location:
                            pdf.cell(location_width + 5, 5, location, 0, 0)

                        if date:
                            pdf.set_x(pdf.w - date_width - 10)
                            pdf.cell(date_width, 5, date, 0, 1, "R")
                        elif location:
                            pdf.ln()

                    if "description" in item:
                        pdf.set_font(font_family, "", 10)
                        if isinstance(item["description"], list):
                            for bullet in item["description"]:
                                pdf.cell(5, 5, "-", 0, 0)
                                pdf.multi_cell(0, 5, f" {bullet}")
                        else:
                            pdf.multi_cell(0, 5, item["description"])
                else:
                    pdf.cell(0, 5, f"- {item}", 0, 1)

                pdf.ln(2)
        else:
            pdf.multi_cell(0, 5, content)

        pdf.ln(5)

    sections_order = [
        ("PROFESSIONAL EXPERIENCE", "experience"),
        ("EDUCATION", "education"),
        ("SKILLS", "skills"),
        ("CERTIFICATIONS", "certifications"),
        ("OPEN SOURCE", "open_source"),
    ]

    for section_title, section_key in sections_order:
        if section_key in segments:
            add_section(section_title, segments[section_key])

    pdf.output("output.pdf")
    return "output.pdf"


def convert_text_to_pdf(text, title, font_family="Arial"):
    pdf = PDF(title, font_family=font_family)
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_font(font_family, "", 12)
    lines = text.split("\n")
    for line in lines:
        pdf.multi_cell(0, 5, line)
    pdf.output("output.pdf")
    return "output.pdf"
