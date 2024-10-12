# Waltzes

Waltzes is a project designed to generate personalized cover letters based on job details and resume information. It consists of a browser extension and a Flask server.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Extension Setup](#extension-setup)
- [Flask Server Setup](#flask-server-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Python 3.8+
- Flask
- Browser (Chrome or Firefox)

## Usage

### Extension Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/UmairJibran/waltzes.git
   cd waltzes/addon
   ```

2. Load the extension in your browser:
   - **Chrome**:
     1. Open Chrome and navigate to `chrome://extensions/`.
     2. Enable "Developer mode" by clicking the toggle switch in the top right corner.
     3. Click "Load unpacked" and select the `addon` directory.
   - **Firefox**:
     1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
     2. Click "Load Temporary Add-on" and select any file in the `addon` directory.

### Flask Server Setup

1. Navigate to the `python` directory:

   ```sh
   cd ../python
   ```

2. Create a virtual environment:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `python` directory and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Run the Flask server:
   ```sh
   flask run
   ```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
