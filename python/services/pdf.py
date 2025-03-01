from fpdf import FPDF


class PDF(FPDF):
    def __init__(self, title="", font_family="Arial"):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.title = title if isinstance(title, str) else ""
        self.font_family = font_family if isinstance(font_family, str) else "Arial"
        self.set_margins(10, 10 if not self.title else 30, 10)

        self.set_font(self.font_family, "")

    def header(self):
        if self.title and isinstance(self.title, str):
            self.set_font(self.font_family, "B", 12)
            self.cell(0, 10, self.title, 0, 0, "C")
            self.ln(20)

    def footer(self):
        self.set_y(-15)
        self.set_font(self.font_family, "I", 8)
        self.cell(0, 10, "Page " + str(self.page_no()) + "/{nb}", 0, 0, "C")


def create_resume(segments, font_family="Times"):
    if not isinstance(segments, dict):
        segments = {}

    font_family = font_family if isinstance(font_family, str) else "Times"

    pdf = PDF(font_family=font_family)
    pdf.alias_nb_pages()
    pdf.add_page()

    pdf.set_font(font_family, "B", 16)
    name = segments.get("name", "")
    name = name.strip() if isinstance(name, str) else ""
    pdf.cell(0, 10, name, 0, 1, "C")

    if "contact" in segments and isinstance(segments["contact"], list):
        pdf.set_font(font_family, "", 10)
        # Filter out empty strings and strip whitespace
        contact = [
            item.strip()
            for item in segments["contact"]
            if item and isinstance(item, str) and item.strip()
        ]
        if contact:  # Only proceed if there are non-empty contact items
            contact_text = " - ".join(contact)
            pdf.cell(0, 5, contact_text, 0, 1, "C")
            pdf.ln(5)

    def add_section(title, content):
        if not title or not isinstance(title, str) or not content:
            return

        pdf.set_font(font_family, "B", 12)
        pdf.cell(0, 10, title.upper(), 0, 1, "")
        pdf.line(10, pdf.get_y(), 200, pdf.get_y())
        pdf.ln(2)

        pdf.set_font(font_family, "", 10)

        if isinstance(content, list):
            for item in content:
                if isinstance(item, dict):
                    title_text = item.get("title", "")
                    if isinstance(title_text, str) and title_text.strip():
                        pdf.set_font(font_family, "B", 11)
                        pdf.cell(0, 6, title_text.strip(), 0, 1)

                    location = item.get("location", "")
                    location = location.strip() if isinstance(location, str) else ""

                    date = item.get("date", "")
                    date = date.strip() if isinstance(date, str) else ""

                    if location or date:
                        pdf.set_font(font_family, "", 10)
                        location_width = (
                            pdf.get_string_width(location) if location else 0
                        )
                        date_width = pdf.get_string_width(date) if date else 0

                        if location:
                            pdf.cell(location_width + 5, 5, location, 0, 0)

                        if date:
                            pdf.set_x(pdf.w - date_width - 10)
                            pdf.cell(date_width, 5, date, 0, 1, "R")
                        elif location:
                            pdf.ln()

                    description = item.get("description", "")
                    if description:
                        pdf.set_font(font_family, "", 10)
                        if isinstance(description, list):
                            # Filter out empty description items
                            descriptions = [
                                d.strip()
                                for d in description
                                if d and isinstance(d, str) and d.strip()
                            ]
                            for bullet in descriptions:
                                pdf.cell(5, 5, "-", 0, 0)
                                pdf.multi_cell(0, 5, f" {bullet}")
                        elif isinstance(description, str) and description.strip():
                            pdf.multi_cell(0, 5, description.strip())
                elif isinstance(item, str) and item.strip():
                    pdf.cell(0, 5, f"- {item.strip()}", 0, 1)

                # Only add spacing if something was actually added
                if (
                    isinstance(item, dict)
                    and any(
                        item.get(k)
                        and (
                            (isinstance(item[k], str) and item[k].strip())
                            or (isinstance(item[k], list) and any(item[k]))
                        )
                        for k in ["title", "location", "date", "description"]
                        if k in item
                    )
                ) or (isinstance(item, str) and item.strip()):
                    pdf.ln(2)
        elif isinstance(content, str) and content.strip():
            pdf.multi_cell(0, 5, content.strip())

        pdf.ln(5)

    sections_order = [
        ("PROFESSIONAL EXPERIENCE", "experience"),
        ("EDUCATION", "education"),
        ("SKILLS", "skills"),
        ("CERTIFICATIONS", "certifications"),
        ("OPEN SOURCE", "open_source"),
    ]

    for section_title, section_key in sections_order:
        if section_key in segments and segments[section_key]:
            add_section(section_title, segments[section_key])

    pdf.output("output.pdf")
    return "output.pdf"


def convert_text_to_pdf(text, title, font_family="Arial"):
    if not isinstance(text, str):
        text = ""

    title = title if isinstance(title, str) else ""
    font_family = font_family if isinstance(font_family, str) else "Arial"

    pdf = PDF(title, font_family=font_family)
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_font(font_family, "", 12)

    lines = text.split("\n")
    for line in lines:
        if isinstance(line, str):
            pdf.multi_cell(0, 5, line)

    pdf.output("output.pdf")
    return "output.pdf"
