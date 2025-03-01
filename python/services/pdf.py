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

    # Add name and contact information
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

    # Function to add section header
    def add_section_header(title):
        if not title or not isinstance(title, str):
            return
        pdf.set_font(font_family, "B", 12)
        pdf.cell(0, 10, title.upper(), 0, 1, "")
        pdf.line(10, pdf.get_y(), 200, pdf.get_y())
        pdf.ln(2)

    # Add experience section
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

                # Handle description
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

    # Add education section
    def add_education_section(education_items):
        if not education_items:
            return

        add_section_header("EDUCATION")
        pdf.set_font(font_family, "", 10)

        for item in education_items:
            if isinstance(item, dict):
                title_text = item.get("title", "")
                if isinstance(title_text, str) and title_text.strip():
                    pdf.set_font(font_family, "B", 11)
                    pdf.cell(0, 6, title_text.strip(), 0, 1)

                # Handle institution with URL
                institution = item.get("location", "")
                institution_url = item.get("url", "")

                date = item.get("date", "")
                date = date.strip() if isinstance(date, str) else ""

                if institution or date:
                    pdf.set_font(font_family, "", 10)

                    # Handle institution with URL if available
                    if (
                        institution
                        and isinstance(institution, str)
                        and institution.strip()
                    ):
                        # Save current color
                        text_color = pdf.text_color

                        # Set blue color for hyperlink
                        pdf.set_text_color(0, 0, 255)
                        institution_width = pdf.get_string_width(institution.strip())
                        institution_width = pdf.get_string_width(institution.strip())
                        pdf.cell(
                            institution_width + 5,
                            5,
                            institution.strip(),
                            0,
                            0,
                            link=institution_url.strip(),
                        )

                        # Restore original color
                        pdf.set_text_color(text_color[0], text_color[1], text_color[2])
                    else:
                        pdf.cell(
                            pdf.get_string_width(institution.strip()) + 5,
                            5,
                            institution.strip(),
                            0,
                            0,
                        )

                    # Handle date on the right side
                    if date:
                        pdf.set_x(pdf.w - pdf.get_string_width(date) - 10)
                        pdf.cell(pdf.get_string_width(date), 5, date, 0, 1, "R")
                    elif institution:
                        pdf.ln()

                # Handle description
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
                            pdf.multi_cell(0, 5, f" {bullet}")
                    elif isinstance(description, str) and description.strip():
                        pdf.multi_cell(0, 5, description.strip())

                # Add spacing after each item
                pdf.ln(2)

        pdf.ln(5)

    # Add skills section
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

    # Add certifications section
    def add_certifications_section(cert_items):
        if not cert_items:
            return

        add_section_header("CERTIFICATIONS")
        pdf.set_font(font_family, "", 10)

        if isinstance(cert_items, list):
            for item in cert_items:
                if isinstance(item, dict):
                    title_text = item.get("title", "")
                    if isinstance(title_text, str) and title_text.strip():
                        pdf.set_font(font_family, "B", 11)
                        pdf.cell(0, 6, title_text.strip(), 0, 1)

                    location = item.get("location", "")
                    date = item.get("date", "")

                    if location or date:
                        pdf.set_font(font_family, "", 10)
                        if location and isinstance(location, str) and location.strip():
                            pdf.cell(
                                pdf.get_string_width(location.strip()) + 5,
                                5,
                                location.strip(),
                                0,
                                0,
                            )

                        if date and isinstance(date, str) and date.strip():
                            pdf.set_x(pdf.w - pdf.get_string_width(date) - 10)
                            pdf.cell(pdf.get_string_width(date), 5, date, 0, 1, "R")
                        elif location:
                            pdf.ln()

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

    # Add open source section
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
                            # Save current color
                            text_color = pdf.text_color

                            # Set blue color for hyperlink
                            pdf.set_text_color(0, 0, 255)
                            pdf.cell(0, 6, title_text.strip(), 0, 1, link=url.strip())

                            # Restore original color
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

    # Add sections in order
    if "experience" in segments:
        add_experience_section(segments["experience"])

    # if "education" in segments:
    #     add_education_section(segments["education"])

    if "skills" in segments:
        add_skills_section(segments["skills"])

    if "certifications" in segments:
        add_certifications_section(segments["certifications"])

    if "open_source" in segments:
        add_open_source_section(segments["open_source"])

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
