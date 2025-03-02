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

        contact = [
            item.strip()
            for item in segments["contact"]
            if item and isinstance(item, str) and item.strip()
        ]
        if contact:
            contact_text = " - ".join(contact)
            pdf.cell(0, 5, contact_text, 0, 1, "C")
            pdf.ln(5)

    def add_section_header(title):
        if not title or not isinstance(title, str):
            return
        pdf.set_font(font_family, "B", 12)
        pdf.cell(0, 10, title.upper(), 0, 1, "")
        pdf.line(10, pdf.get_y(), 200, pdf.get_y())
        pdf.ln(2)

    def add_experience_section(experience_items):
        if not experience_items:
            return

        add_section_header("PROFESSIONAL EXPERIENCE")
        pdf.set_font(font_family, "", 10)

        for item in experience_items:
            if isinstance(item, dict):
                company = item.get("company", "")
                title_text = item.get("title", "")
                pdf.set_font(font_family, "B", 11)
                first_line = ""
                if isinstance(title_text, str) and title_text.strip():
                    first_line = title_text.strip()
                if company and isinstance(company, str) and company.strip():
                    if first_line:
                        first_line = first_line + " at " + company.strip()
                    else:
                        first_line = company.strip()

                pdf.cell(0, 6, first_line.strip(), 0, 1)

                workplace = item.get("location", "")

                date = item.get("date", "")
                date = date.strip() if isinstance(date, str) else ""

                if workplace:
                    pdf.set_font(font_family, "", 10)
                    if workplace and isinstance(workplace, str) and workplace.strip():
                        pdf.cell(
                            pdf.get_string_width(workplace.strip()) + 5,
                            5,
                            workplace.strip(),
                            0,
                            0,
                        )
                if date:
                    pdf.set_x(pdf.w - pdf.get_string_width(date) - 10)
                    pdf.cell(pdf.get_string_width(date), 5, date, 0, 1, "R")
                elif workplace:
                    pdf.ln()

                description = item.get("description", "")
                if description:
                    pdf.set_font(font_family, "", 10)
                    if isinstance(description, list):
                        descriptions = [
                            d.strip()
                            for d in description
                            if d and isinstance(d, str) and d.strip()
                        ]
                        for bullet in descriptions:
                            pdf.cell(5, 5, "-", 0, 0)
                            if bullet and len(bullet) > 0:
                                available_width = (
                                    pdf.w - pdf.l_margin - pdf.r_margin - 5
                                )
                                if available_width > pdf.get_string_width("W"):
                                    pdf.multi_cell(available_width, 5, f" {bullet}")
                                    pdf.set_x(pdf.l_margin)
                                else:
                                    pdf.ln()
                            else:
                                pdf.ln()
                pdf.ln(2)

        pdf.ln(5)

    def add_education_section(education_items):
        if not education_items:
            return

        add_section_header("EDUCATION")
        pdf.set_font(font_family, "", 10)

        for item in education_items:
            if isinstance(item, dict):
                degree = item.get("title", "")
                institute = item.get("institute", "")
                location = item.get("location", "")
                date = item.get("date", "")
                date = date.strip() if isinstance(date, str) else ""

                pdf.set_font(font_family, "B", 11)
                if isinstance(degree, str) and degree.strip():
                    date_width = pdf.get_string_width(date) + 10 if date else 0
                    degree_width = pdf.w - pdf.l_margin - pdf.r_margin - date_width
                    pdf.cell(degree_width, 6, degree.strip(), 0, 0)

                if date:
                    pdf.set_font(font_family, "", 10)
                    pdf.set_x(pdf.w - pdf.r_margin - pdf.get_string_width(date))
                    pdf.cell(pdf.get_string_width(date), 6, date, 0, 1, "R")
                else:
                    pdf.ln()

                pdf.set_font(font_family, "", 10)
                if institute and isinstance(institute, str) and institute.strip():
                    institute_width = pdf.w - pdf.l_margin - pdf.r_margin
                    if location and isinstance(location, str) and location.strip():
                        institute_width -= pdf.get_string_width(location.strip()) + 10
                    pdf.cell(institute_width, 5, institute.strip(), 0, 0)

                if location and isinstance(location, str) and location.strip():
                    pdf.cell(
                        pdf.get_string_width(location.strip()) + 10,
                        5,
                        location.strip(),
                        0,
                        1,
                        "R",
                    )
                elif institute:
                    pdf.ln()

                description = item.get("description", "")
                if description:
                    pdf.set_font(font_family, "", 10)
                    if isinstance(description, list):
                        descriptions = [
                            d.strip()
                            for d in description
                            if d and isinstance(d, str) and d.strip()
                        ]
                        for bullet in descriptions:
                            pdf.cell(5, 5, "-", 0, 0)
                            if bullet and len(bullet) > 0:
                                available_width = (
                                    pdf.w - pdf.l_margin - pdf.r_margin - 5
                                )
                                if available_width > pdf.get_string_width("W"):
                                    pdf.multi_cell(available_width, 5, f" {bullet}")
                                    pdf.set_x(pdf.l_margin)
                                else:
                                    pdf.ln()
                            else:
                                pdf.ln()
                pdf.ln(2)
        pdf.ln(5)

    def add_skills_section(skills_items):
        if not skills_items:
            return

        add_section_header("SKILLS")
        pdf.set_font(font_family, "", 10)

        if isinstance(skills_items, list):
            string_skills = []

            for item in skills_items:
                string_skills.append(item)

            if string_skills:
                skills_text = " - ".join(string_skills)
                pdf.multi_cell(0, 5, skills_text)
                pdf.ln(2)

        pdf.ln(5)

    def add_certifications_section(cert_items):
        if not cert_items:
            return

        add_section_header("CERTIFICATIONS")
        if isinstance(cert_items, list):
            for item in cert_items:
                if isinstance(item, dict):
                    title_text = item.get("title", "")
                    issuer = item.get("issuer", "")
                    date = item.get("date", "")

                    pdf.set_font(font_family, "B", 11)

                    date_width = pdf.get_string_width(date) + 10 if date else 0
                    title_width = pdf.w - pdf.l_margin - pdf.r_margin - date_width

                    if isinstance(title_text, str) and title_text.strip():
                        if issuer and isinstance(issuer, str) and issuer.strip():
                            title_text = f"{title_text.strip()} by {issuer.strip()}"
                        pdf.cell(title_width, 5, title_text.strip(), 0, 0)

                    if date:
                        pdf.set_font(font_family, "", 10)
                        pdf.cell(date_width, 5, date, 0, 1, "R")
                    else:
                        pdf.ln()

                    description = item.get("description", "")
                    if description:
                        if isinstance(description, list):
                            for bullet in description:
                                if isinstance(bullet, str) and bullet.strip():
                                    pdf.cell(5, 5, "-", 0, 0)
                                    pdf.multi_cell(0, 5, f" {bullet.strip()}")
                        elif isinstance(description, str) and description.strip():
                            pdf.multi_cell(0, 5, description.strip())
                    credentialId = item.get("credentialId", "")
                    if credentialId:
                        pdf.set_x(pdf.l_margin)
                        pdf.multi_cell(0, 5, credentialId.strip())
                    pdf.ln(3)

                elif isinstance(item, str) and item.strip():
                    pdf.cell(0, 5, f"- {item.strip()}", 0, 1)

        pdf.ln(5)

    def add_open_source_section(open_source_items):
        if not open_source_items:
            return

        add_section_header("OPEN SOURCE")
        pdf.set_font(font_family, "", 10)

        if isinstance(open_source_items, list):
            for item in open_source_items:
                if isinstance(item, dict):
                    title_text = item.get("title", "")
                    url = item.get("url", "")

                    if isinstance(title_text, str) and title_text.strip():
                        pdf.set_font(font_family, "B", 11)
                        if url and isinstance(url, str) and url.strip():
                            text_color = pdf.text_color

                            pdf.set_text_color(0, 0, 255)
                            pdf.cell(0, 6, title_text.strip(), 0, 1, link=url.strip())

                            pdf.set_text_color(
                                text_color[0], text_color[1], text_color[2]
                            )
                        else:
                            pdf.cell(0, 6, title_text.strip(), 0, 1)

                    description = item.get("description", "")
                    if description:
                        pdf.set_font(font_family, "", 10)
                        if isinstance(description, list):
                            for bullet in description:
                                if isinstance(bullet, str) and bullet.strip():
                                    pdf.cell(5, 5, "-", 0, 0)
                                    pdf.multi_cell(0, 5, f" {bullet.strip()}")
                        elif isinstance(description, str) and description.strip():
                            pdf.multi_cell(0, 5, description.strip())

                    pdf.ln(2)
                elif isinstance(item, str) and item.strip():
                    pdf.cell(0, 5, f"- {item.strip()}", 0, 1)

        pdf.ln(5)

    if "experience" in segments:
        add_experience_section(segments["experience"])

    if "skills" in segments:
        add_skills_section(segments["skills"])

    if "certifications" in segments:
        add_certifications_section(segments["certifications"])

    if "open_source" in segments:
        add_open_source_section(segments["open_source"])

    if "education" in segments:
        add_education_section(segments["education"])

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
